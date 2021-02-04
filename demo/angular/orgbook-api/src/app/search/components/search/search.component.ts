import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SearchService } from '@app/search/services/search.service';
import { UrlService } from '@app/shared/services/url.service';

import { combineLatest, BehaviorSubject, of } from 'rxjs';
import { map, startWith, switchMap, tap } from 'rxjs/operators';

import { TopicFacetsResponse } from '@app/search/interfaces/topic-facets-response';
import { TopicFacets } from '@app/search/interfaces/topic-facets';
import { TopicFacetFields } from '@app/search/interfaces/topic-facet-fields';
import { TopicFacetField } from '@app/search/interfaces/topic-facet-field';
import { ProcessedTopicFacetFields } from '@app/search/interfaces/processed-topic-facet-fields';

@Component({
  selector: 'ob-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  private skipCategories = [ 'reason_description' ];
  private searchLoadingSubject$ = new BehaviorSubject<boolean>(false);
  private searchTerm$ = this.route.queryParams
    .pipe(
      map(params => params.name || '')
    );
  private search$ = this.route.queryParams
    .pipe(
      tap(() => this.searchLoadingSubject$.next(true)),
      switchMap(params => {
        if (!params.name) {
          return of({} as TopicFacetsResponse);
        }
        return this.searchService.getTopicFacetsPage(`/search/topic/facets?${this.urlService.formatUrlQuery(params)}`);
      }),
      map((topicFacetsResponse) => {
        if (!topicFacetsResponse.facets) {
          return topicFacetsResponse;
        }
        return {
          ...topicFacetsResponse,
          facets: {
            ...topicFacetsResponse.facets,
            ...this.processFacets(topicFacetsResponse.facets)
          }
        };
      }),
      tap(() => this.searchLoadingSubject$.next(false))
    );

  vm$ = combineLatest([
    this.searchLoadingSubject$,
    this.searchTerm$.pipe(startWith('')),
    this.search$.pipe(startWith({} as TopicFacetsResponse)),
  ])
    .pipe(
      map(([loading, term, topicFacetsResponse]) => ({ loading, term, ...topicFacetsResponse }))
    );

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
    private urlService: UrlService
  ) { }

  private processFacets(facets: TopicFacets): { fields: ProcessedTopicFacetFields } {
    return { fields: this.processFacetFields(facets.fields) };
  }

  private processFacetFields(fields: TopicFacetFields): ProcessedTopicFacetFields {
    return {
      ...this.processFieldCategories(fields.category),
      ...this.processFieldCredentialTypes(fields.credential_type_id),
      ...this.processFieldIssuers(fields.issuer_id)
    };
  }

  private processFieldCategories(categories: TopicFacetField[]): ProcessedTopicFacetFields {
    const formatQueryParam = (categoryName: string, categoryValue: string) => {
      if (categoryName === 'entity_status') {
        return { inactive: String(categoryValue === 'HIS') };
      }
      return { [`category:${categoryName}`]: categoryValue };
    };

    return categories.reduce((categoryGroup, facetCategory) => {
      const category = facetCategory.value.split('::');
      const [categoryName, categoryValue] = category;
      if (!(categoryName && categoryValue) || this.skipCategories.includes(categoryName)) {
        return categoryGroup;
      }
      const name = `attribute.${categoryName}`;
      const categoryEntry = categoryGroup[name] || [];
      categoryEntry.push({
        ...facetCategory,
        tag: `category.${categoryName}.${categoryValue}`,
        queryParam: formatQueryParam(categoryName, categoryValue)
      });
      return { ...categoryGroup, [name]: categoryEntry };
    }, {});
  }

  private processFieldCredentialTypes(credentialTypes: TopicFacetField[]): ProcessedTopicFacetFields {
    return credentialTypes.reduce((typeGroup, facetType) => {
      const typeName = facetType.text;
      if (!typeName) {
        return typeGroup;
      }
      const name = 'attribute.credential_type';
      const typeEntry = typeGroup[name] || [];
      typeEntry.push({
        ...facetType,
        tag: `credential.type.${typeName}`,
        queryParam: { credential_type_id: facetType.value }
      });
      return { ...typeGroup, [name]: typeEntry };
    }, {});
  }

  private processFieldIssuers(issuers: TopicFacetField[]): ProcessedTopicFacetFields {
    return issuers.reduce((issuerGroup, facetIssuer) => {
      const typeName = facetIssuer.text;
      if (!typeName) {
        return issuerGroup;
      }
      const name = 'attribute.issuer';
      const issuerEntry = issuerGroup[name] || [];
      issuerEntry.push({
        ...facetIssuer,
        tag: `issuer.${typeName}`,
        queryParam: { issuer_id: facetIssuer.value }
      });
      return { ...issuerGroup, [name]: issuerEntry };
    }, {});
  }

  onSearch(query: any = {}): void {
    const searchQuery = this.urlService.formatUrlQuery(this.searchService.extendDefault(query));
    this.urlService.setUrlState(`/search?${searchQuery}`);
  }

  onPage(url: string): void {
    const searchQuery = this.urlService.extractUrlQuery(url);
    this.urlService.setUrlState(`/search?${searchQuery}`);
  }

  onClear(): void {
    this.urlService.setUrlState(`/search`);
  }

  onFacet(query): void {
    const queryParams = this.route.snapshot.queryParams;
    this.onSearch({ ...queryParams, ...query });
  }
}

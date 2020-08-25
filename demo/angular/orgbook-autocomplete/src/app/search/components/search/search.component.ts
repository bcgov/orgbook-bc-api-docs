import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SearchService } from '@app/search/services/search.service';
import { UrlService } from '@app/shared/services/url.service';

import { combineLatest, merge, BehaviorSubject, of } from 'rxjs';
import { map, filter, startWith, switchMap, tap } from 'rxjs/operators';

import { TopicResponse } from '@app/search/interfaces/topic-response';

@Component({
  selector: 'ob-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  private searchResponseSubject$ = new BehaviorSubject<TopicResponse>({} as TopicResponse);
  private searchLoadingSubject$ = new BehaviorSubject<boolean>(false);
  private searchQueryParams$ = this.route.queryParams;
  private search$ = this.searchQueryParams$
    .pipe(
      tap(() => this.searchLoadingSubject$.next(true)),
      switchMap(params => {
        if (!params.name) {
          return of({} as TopicResponse);
        }
        return this.searchService.getTopicPage(`/search/topic?${this.urlService.formatUrlQuery(params)}`)
      }),
      map(topicResponse => this.searchResponseSubject$.next(topicResponse)),
      tap(() => this.searchLoadingSubject$.next(false)),
    );
  private searchTerm$ = merge(
    this.searchQueryParams$
      .pipe(
        map(params => params.name)
      )
  );
  private searchResponse$ = this.searchResponseSubject$.asObservable();
  private searchLoading$ = this.searchLoadingSubject$.asObservable();

  vm$ = combineLatest([
    this.searchTerm$.pipe(startWith('')),
    this.searchResponse$.pipe(startWith({})),
    this.searchLoading$,
    this.search$.pipe(startWith({}))
  ])
    .pipe(
      map(([term, topicResponse, loading]) => ({ term, topicResponse, loading }))
    );

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
    private urlService: UrlService
  ) { }

  onSearch(name: string): void {
    const searchQuery = this.urlService.formatUrlQuery({ name, inactive: 'false', latest: 'true', revoked: 'false' });
    this.urlService.setUrlState(`/search?${searchQuery}`);
  }

  onPage(url: string): void {
    const searchQuery = this.urlService.extractUrlQuery(url);
    this.urlService.setUrlState(`/search?${searchQuery}`);
  }

  onClear(): void {
    this.searchResponseSubject$.next({} as TopicResponse);
    this.urlService.setUrlState(`/search`);
  }
}

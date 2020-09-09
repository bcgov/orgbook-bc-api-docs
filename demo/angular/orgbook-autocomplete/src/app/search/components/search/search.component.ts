import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SearchService } from '@app/search/services/search.service';
import { UrlService } from '@app/shared/services/url.service';

import { combineLatest, BehaviorSubject, of } from 'rxjs';
import { map, startWith, switchMap, tap } from 'rxjs/operators';

import { TopicResponse } from '@app/search/interfaces/topic-response';

@Component({
  selector: 'ob-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {
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
          return of({} as TopicResponse);
        }
        return this.searchService.getTopicPage(`/search/topic?${this.urlService.formatUrlQuery(params)}`);
      }),
      tap(() => this.searchLoadingSubject$.next(false)),
    );

  vm$ = combineLatest([
    this.searchLoadingSubject$,
    this.searchTerm$.pipe(startWith('')),
    this.search$.pipe(startWith({} as TopicResponse)),
  ])
    .pipe(
      tap(console.log),
      map(([loading, term, topicResponse]) => ({ loading, term, topicResponse }))
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
    this.urlService.setUrlState(`/search`);
  }
}

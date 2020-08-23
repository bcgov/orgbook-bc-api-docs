import { Component } from '@angular/core';

import { of, merge, combineLatest, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, map } from 'rxjs/operators';

import { TopicResponse } from '@app/search/interfaces/topic-response';

import { SearchService } from '@app/search/services/search.service';

@Component({
  selector: 'ob-search-topic-list',
  templateUrl: './search-topic-list.component.html',
  styleUrls: ['./search-topic-list.component.scss']
})
export class SearchTopicListComponent {
  private topicPending$ = new BehaviorSubject<boolean>(false);

  topicLoading$ = this.topicPending$.asObservable();

  topicSearch$ = this.searchService.topicTerm$
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.topicPending$.next(true)),
      switchMap(name => {
        if (!name) {
          return of({} as TopicResponse);
        }
        return this.searchService.getTopic(name);
      }),
      tap(() => this.topicPending$.next(false)),
    );

  topicPage$ = this.searchService.topicPageUrl$
    .pipe(
      tap(() => this.topicPending$.next(true)),
      switchMap(url => {
        if (!url) {
          return of({} as TopicResponse);
        }
        return this.searchService.getTopicPage(url);
      }),
      tap(() => this.topicPending$.next(false)),
    );

  vm$ = combineLatest([ this.topicLoading$, merge(this.topicSearch$, this.topicPage$) ])
    .pipe(
      map(([ loading, topicResponse ]) => ({ loading, topicResponse }))
    );

  constructor(private searchService: SearchService) { }

}

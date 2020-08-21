import { Component } from '@angular/core';

import { of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';

import { TopicResponse } from '@app/search/interfaces/topic-response';

import { SearchService } from '@app/search/services/search.service';

@Component({
  selector: 'ob-search-topic-list',
  templateUrl: './search-topic-list.component.html',
  styleUrls: ['./search-topic-list.component.scss']
})
export class SearchTopicListComponent {
  private topicPending$ = new Subject<boolean>();

  topic$ = this.searchService.topicSearch$
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

  topicLoading$ = this.topicPending$.asObservable();

  constructor(private searchService: SearchService) { }

}

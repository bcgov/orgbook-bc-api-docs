import { Component } from '@angular/core';

import { Subject, of } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { SearchService } from '@app/search/services/search.service';

import { AggregateAutocompleteResponse } from '@app/search/interfaces/aggregate-autocomplete-response';
import { TopicResponse } from '@app/search/interfaces/topic-response';

@Component({
  selector: 'ob-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  private autocompleteSearch$ = new Subject<string>();
  private topicSearch$ = new Subject<string>();

  label = 'Registered BC Corporation Search';
  placeholder = 'Start typing to search the OrgBook database';

  search: any = { };

  autocomplete$ = this.autocompleteSearch$
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(q => {
        if (!q) {
          return of({ } as AggregateAutocompleteResponse);
        }
        return this.searchService.getAggregateAutocomplete(q);
      })
    );

  topic$ = this.topicSearch$
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(name => {
        if (!name) {
          return of({ } as TopicResponse);
        }
        return this.searchService.getTopic(name);
      })
    );

  constructor(private searchService: SearchService) { }

  onAutocomplete(q: string): void {
    this.autocompleteSearch$.next(q.trim());
  }

  onSearch(name: string): void {
    this.topicSearch$.next(name.trim());
  }

  onClearSearch(): void {
    this.search.value = '';
    this.autocompleteSearch$.next('');
    this.topicSearch$.next('');
  }
}

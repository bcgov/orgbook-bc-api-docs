import { Component } from '@angular/core';

import { Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';

import { AggregateAutocompleteResponse } from '@app/search/interfaces/aggregate-autocomplete-response';

import { SearchService } from '@app/search/services/search.service';

@Component({
  selector: 'ob-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent {
  private autocompletePending$ = new Subject<boolean>();

  label = 'Registered BC Corporation Search';
  placeholder = 'Start typing to search the OrgBook database';

  autocomplete$ = this.searchService.autocompleteSearch$
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.autocompletePending$.next(true)),
      switchMap(q => {
        if (!q) {
          return of({} as AggregateAutocompleteResponse);
        }
        return this.searchService.getAggregateAutocomplete(q);
      }),
      tap(() => this.autocompletePending$.next(false)),
    );

  autocompleteLoading$ = this.autocompletePending$.asObservable();

  search: any = {};

  constructor(private searchService: SearchService) { }

  onAutocomplete(q: string): void {
    this.searchService.autocomplete(q);
  }

  onSearch(name: string): void {
    this.searchService.search(name);
  }

  onClearSearch(): void {
    this.search.value = '';
    this.searchService.clearSearch();
  }

}

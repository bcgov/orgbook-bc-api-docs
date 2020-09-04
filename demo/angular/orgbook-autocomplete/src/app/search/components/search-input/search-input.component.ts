import { Component, EventEmitter, Output, Input } from '@angular/core';

import { combineLatest, BehaviorSubject, merge, of } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, tap, switchMap, filter, startWith } from 'rxjs/operators';

import { SearchService } from '@app/search/services/search.service';

import { AggregateAutocompleteResponse } from '@app/search/interfaces/aggregate-autocomplete-response';

@Component({
  selector: 'ob-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent {
  @Input() set term(q: string) {
    this.onAutocomplete(q);
  }

  @Output() search = new EventEmitter<string>();
  @Output() clear = new EventEmitter<void>();

  private autocompleteLoadingSubject$ = new BehaviorSubject<boolean>(false);
  private autocompleteTermSubject$ = new BehaviorSubject<string>('');
  private autocompleteSearchSubject$ = new BehaviorSubject<string>('');

  private autocompleteLoading$ = this.autocompleteLoadingSubject$.asObservable();
  private autocompleteTerm$ = this.autocompleteTermSubject$.asObservable();
  private autocompleteResponse$ = merge(
    this.autocompleteTermSubject$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => this.autocompleteLoadingSubject$.next(true)),
        switchMap(q => {
          if (!q) {
            return of({} as AggregateAutocompleteResponse);
          }
          return this.searchService.getAggregateAutocomplete(q);
        }),
        tap(() => this.autocompleteLoadingSubject$.next(false))
      )
  );
  private autocompleteSearch$ = this.autocompleteSearchSubject$
    .pipe(
      filter(q => !!q),
      tap(term => this.search.emit(term))
    );

  label = 'Registered BC Corporation Search';
  placeholder = 'Start typing to search the OrgBook database';

  vm$ = combineLatest([
    this.autocompleteLoading$,
    this.autocompleteTerm$.pipe(startWith('')),
    this.autocompleteResponse$.pipe(startWith({} as AggregateAutocompleteResponse)),
    this.autocompleteSearch$.pipe(startWith(''))
  ])
    .pipe(
      map(([loading, autocompleteTerm, autocompleteResponse]) => ({ loading, autocompleteTerm, autocompleteResponse }))
    );

  constructor(private searchService: SearchService) { }

  onAutocomplete(q: string): void {
    this.autocompleteTermSubject$.next(q);
  }

  onSearch(term: string): void {
    this.autocompleteSearchSubject$.next(term);
  }

  onClear(): void {
    this.term = '';
    this.clear.emit();
  }
}

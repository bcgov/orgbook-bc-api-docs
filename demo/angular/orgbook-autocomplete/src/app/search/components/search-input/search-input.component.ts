import { Component, EventEmitter, Output } from '@angular/core';

import { combineLatest, BehaviorSubject, merge, of, EMPTY } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, tap, switchMap, filter } from 'rxjs/operators';

import { SearchService } from '@app/search/services/search.service';

import { AggregateAutocompleteResponse } from '@app/search/interfaces/aggregate-autocomplete-response';

@Component({
  selector: 'ob-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent {
  @Output() search = new EventEmitter<string>();
  @Output() clear = new EventEmitter<void>();

  private autocompleteLoadingSubject$ = new BehaviorSubject<boolean>(false);
  private autocompleteTermSubject$ = new BehaviorSubject<string>('');
  private autocompleteResponseSubject$ = new BehaviorSubject<AggregateAutocompleteResponse>(null);

  private autocompleteLoading$ = this.autocompleteLoadingSubject$.asObservable();
  private autocompleteTerm$ = this.autocompleteTermSubject$.asObservable();
  private autocompleteResponse$ = merge(
    this.autocompleteResponseSubject$.asObservable(),
    this.autocompleteTermSubject$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter(q => !!q),
        tap(() => this.autocompleteLoadingSubject$.next(true)),
        switchMap(q => this.searchService.getAggregateAutocomplete(q)),
        tap(autocompleteResponse => this.autocompleteResponseSubject$.next(autocompleteResponse)),
        tap(() => this.autocompleteLoadingSubject$.next(false))
      )
  );

  label = 'Registered BC Corporation Search';
  placeholder = 'Start typing to search the OrgBook database';

  vm$ = combineLatest([
    this.autocompleteLoading$,
    this.autocompleteTerm$,
    this.autocompleteResponse$
  ])
    .pipe(
      map(([loading, autocompleteTerm, autocompleteResponse]) => ({ loading, autocompleteTerm, autocompleteResponse }))
    );

  constructor(private searchService: SearchService) { }

  onAutocomplete(q: string): void {
    this.autocompleteTermSubject$.next(q);
  }

  onSearch(term: string): void {
    this.search.emit(term);
  }

  onClear(): void {
    this.autocompleteTermSubject$.next('');
    this.autocompleteResponseSubject$.next(null);
    this.clear.emit();
  }
}

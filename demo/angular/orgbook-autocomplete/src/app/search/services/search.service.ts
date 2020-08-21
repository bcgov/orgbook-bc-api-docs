import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';

import { AggregateAutocompleteResponse } from '../interfaces/aggregate-autocomplete-response';
import { TopicResponse } from '../interfaces/topic-response';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private autocompleteSearchTerm$ = new Subject<string>();
  private topicSearchTerm$ = new Subject<string>();

  autocompleteSearch$ = this.autocompleteSearchTerm$.asObservable();
  topicSearch$ = this.topicSearchTerm$.asObservable();

  constructor(private http: HttpClient) { }

  /**
   * autocomplete
   */
  public autocomplete(term: string) {
    this.autocompleteSearchTerm$.next(term.trim());
  }

  /**
   * search
   */
  public search(term: string) {
    this.topicSearchTerm$.next(term.trim());
  }

  /**
   * clearSearch
   */
  public clearSearch() {
    this.autocompleteSearchTerm$.next('');
    this.topicSearchTerm$.next('');
  }

  /**
   * getAggregateAutocomplete
   */
  public getAggregateAutocomplete(q: string): Observable<AggregateAutocompleteResponse> {
    const queryParams = new HttpParams({
      fromObject: { q, inactive: 'false', revoked: 'false' }
    });

    const options = { params: queryParams };

    return this.http.get<AggregateAutocompleteResponse>('/search/autocomplete', options);
  }

  /**
   * getTopics
   */
  public getTopic(name: string): Observable<TopicResponse> {
    const queryParams = new HttpParams({
      fromObject: { name, inactive: 'false', latest: 'true', revoked: 'false' }
    });

    const options = { params: queryParams };

    return this.http.get<TopicResponse>('/search/topic', options);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';

import { AggregateAutocompleteResponse } from '../interfaces/aggregate-autocomplete-response';
import { TopicResponse } from '../interfaces/topic-response';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private autocompleteSearchTerm$ = new BehaviorSubject<string>('');
  private topicSearchTerm$ = new BehaviorSubject<string>('');
  private topicPageUrl$ = new BehaviorSubject<string>('');

  autocompleteSearchAction$ = this.autocompleteSearchTerm$.asObservable();
  topicSearchAction$ = this.topicSearchTerm$.asObservable();
  topicPageAction$ = this.topicPageUrl$.asObservable();

  constructor(private http: HttpClient) { }

  /**
   * autocomplete
   */
  public autocomplete(term: string): void {
    this.autocompleteSearchTerm$.next(term.trim());
  }

  /**
   * search
   */
  public search(term: string): void {
    this.topicSearchTerm$.next(term.trim());
  }

  /**
   * page
   */
  public page(url: string): void {
    this.topicPageUrl$.next(url);
  }

  /**
   * clearSearch
   */
  public clearSearch(): void{
    this.autocompleteSearchTerm$.next('');
    this.topicSearchTerm$.next('');
    this.topicPageUrl$.next('');
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
   * getTopic
   */
  public getTopic(name: string): Observable<TopicResponse> {
    const queryParams = new HttpParams({
      fromObject: { name, inactive: 'false', latest: 'true', revoked: 'false' }
    });

    const options = { params: queryParams };

    return this.http.get<TopicResponse>('/search/topic', options);
  }

  /**
   * getTopicPage
   */
  public getTopicPage(url: string): Observable<TopicResponse> {
    return this.http.get<TopicResponse>(url);
  }
}

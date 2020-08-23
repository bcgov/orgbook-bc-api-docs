import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, BehaviorSubject, merge, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, filter } from 'rxjs/operators';

import { AggregateAutocompleteResponse } from '../interfaces/aggregate-autocomplete-response';
import { TopicResponse } from '../interfaces/topic-response';

@Injectable({
  providedIn: 'root'
})
export class SearchService {  
  private topicTermSubject$ = new BehaviorSubject<string>('');
  private topicPageUrlSubject$ = new BehaviorSubject<string>('');

  topicTerm$ = this.topicTermSubject$.asObservable();
  topicPageUrl$ = this.topicPageUrlSubject$.asObservable();

  constructor(private http: HttpClient) { }

  /**
   * search
   */
  public search(term: string): void {
    this.topicTermSubject$.next(term.trim());
  }

  /**
   * page
   */
  public page(url: string): void {
    this.topicPageUrlSubject$.next(url);
  }

  /**
   * clearSearch
   */
  public clearSearch(): void {
    this.topicTermSubject$.next('');
    this.topicPageUrlSubject$.next('');
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

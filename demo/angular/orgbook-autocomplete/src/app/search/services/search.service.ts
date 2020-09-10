import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { BaseService } from '@app/shared/services/base.service';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AggregateAutocompleteResponse } from '../interfaces/aggregate-autocomplete-response';
import { CredentialResponse } from '../interfaces/credential-response';
import { TopicResponse } from '../interfaces/topic-response';

@Injectable({
  providedIn: 'root'
})
export class SearchService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  /**
   * getAggregateAutocomplete
   */
  public getAggregateAutocomplete(q: string): Observable<AggregateAutocompleteResponse> {
    const queryParams = new HttpParams({
      fromObject: { q, inactive: 'false', revoked: 'false' }
    });

    const options = { params: queryParams };

    return this.http.get<AggregateAutocompleteResponse>('/search/autocomplete', options)
      .pipe(
        catchError(this.handleError<AggregateAutocompleteResponse>('getAggregateAutocomplete', {} as AggregateAutocompleteResponse))
      );
  }

  /**
   * getTopic
   */
  public getTopic(name: string): Observable<TopicResponse> {
    const queryParams = new HttpParams({
      fromObject: { name, inactive: 'false', latest: 'true', revoked: 'false' }
    });

    const options = { params: queryParams };

    return this.http.get<TopicResponse>('/search/topic', options)
      .pipe(
        catchError(this.handleError<TopicResponse>('getTopic', { total: 0 } as TopicResponse))
      );
  }

  /**
   * getTopicPage
   */
  public getTopicPage(url: string): Observable<TopicResponse> {
    return this.http.get<TopicResponse>(url)
      .pipe(
        catchError(this.handleError<TopicResponse>('getTopicPage', { total: 0 } as TopicResponse))
      );
  }

  /**
   * getCredential
   */
  public getCredential(name: string): Observable<CredentialResponse> {
    const queryParams = new HttpParams({
      fromObject: { name, inactive: 'false', latest: 'true', revoked: 'false' }
    });

    const options = { params: queryParams };

    return this.http.get<CredentialResponse>('/search/credential', options)
      .pipe(
        catchError(this.handleError<CredentialResponse>('getCredential', {} as CredentialResponse))
      );
  }

  /**
   * getTopicById
   */
  public getTopicById(id: number, params: any = {}): Observable<TopicResponse> {
    const queryParams = new HttpParams({
      fromObject: {
        topic_id: id.toString(),
        inactive: 'false',
        latest: 'true',
        revoked: 'false',
        ...params
      }
    });

    const options = { params: queryParams };

    return this.http.get<TopicResponse>('/search/topic', options)
      .pipe(
        catchError(this.handleError<TopicResponse>('getTopicById', { total: 0 } as TopicResponse))
      );
  }
}

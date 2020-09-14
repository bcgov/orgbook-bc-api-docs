import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { BaseService } from '@app/shared/services/base.service';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AggregateAutocompleteResponse } from '../interfaces/aggregate-autocomplete-response';
import { CredentialResponse } from '../interfaces/credential-response';
import { TopicResponse } from '../interfaces/topic-response';
import { TopicFacetsResponse } from '../interfaces/topic-facets-response';

@Injectable({
  providedIn: 'root'
})
export class SearchService extends BaseService {
  public defaultQueryParameters = {
    inactive: '',
    latest: 'true',
    revoked: 'false',
    issuer_id: '',
    credential_type_id: ''
  };

  constructor(private http: HttpClient) {
    super();
  }

  /**
   * 
   */
  public extendDefault(options: any = {}): any {
    return { ...this.defaultQueryParameters, ...options }
  }

  /**
   * getAggregateAutocomplete
   */
  public getAggregateAutocomplete(q: string): Observable<AggregateAutocompleteResponse> {
    const queryParams = new HttpParams({
      fromObject: this.extendDefault({ q })
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
      fromObject: this.extendDefault({ name })
    });

    const options = { params: queryParams };

    return this.http.get<TopicResponse>('/search/topic', options)
      .pipe(
        catchError(this.handleError<TopicResponse>('getTopic', { total: 0 } as TopicResponse))
      );
  }

  /**
   * getTopicFacets
   */
  public getTopicFacets(name: string): Observable<TopicFacetsResponse> {
    const queryParams = new HttpParams({
      fromObject: this.extendDefault({ name })
    });

    const options = { params: queryParams };

    return this.http.get<TopicFacetsResponse>('/search/topic/facets', options)
      .pipe(
        catchError(this.handleError<TopicFacetsResponse>('getTopicFacets', {} as TopicFacetsResponse))
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
   * getTopicFacetsPage
   */
  public getTopicFacetsPage(url: string): Observable<TopicFacetsResponse> {
    return this.http.get<TopicFacetsResponse>(url)
      .pipe(
        catchError(this.handleError<TopicFacetsResponse>('getTopicFacetsPage', {} as TopicFacetsResponse))
      );
  }

  /**
   * getCredential
   */
  public getCredential(name: string): Observable<CredentialResponse> {
    const queryParams = new HttpParams({
      fromObject: this.extendDefault({ name })
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
      fromObject: { topic_id: id.toString(), ...this.extendDefault(params) }
    });

    const options = { params: queryParams };

    return this.http.get<TopicResponse>('/search/topic', options)
      .pipe(
        catchError(this.handleError<TopicResponse>('getTopicById', { total: 0 } as TopicResponse))
      );
  }
}

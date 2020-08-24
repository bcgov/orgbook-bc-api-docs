import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { AggregateAutocompleteResponse } from '../interfaces/aggregate-autocomplete-response';
import { CredentialResponse } from '../interfaces/credential-response';
import { TopicResponse } from '../interfaces/topic-response';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient) { }

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

  /**
   * getCredential
   */
  public getCredential(name: string): Observable<CredentialResponse> {
    const queryParams = new HttpParams({
      fromObject: { name, inactive: 'false', latest: 'true', revoked: 'false' }
    });

    const options = { params: queryParams };

    return this.http.get<CredentialResponse>('/search/topic', options);
  }



}

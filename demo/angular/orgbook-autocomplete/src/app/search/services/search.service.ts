import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AggregateAutocompleteResponse } from '../interfaces/aggregate-autocomplete-response';
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

  // [{
  //   name: "ordering",
  //   in: "query",
  //   description: "Which field to use when ordering the results.",
  //   required: false,
  //   type: "string"
  // }, {
  //   name: "name",
  //   in: "query",
  //   description: "Filter credentials by related name or topic source ID",
  //   type: "string"
  // }, {
  //   name: "category",
  //   in: "query",
  //   description: "Filter by credential category. The category name and value should be joined by '::'",
  //   type: "string"
  // },
  // {
  //   name: "credential_type_id",
  //   in: "query",
  //   description: "Filter by Credential Type ID",
  //   type: "string"
  // }, {
  //   name: "topic_credential_type_id",
  //   in: "query",
  //   description: "Filter by any Credential Type ID owned by the Topic",
  //   type: "string"
  // }, {
  //   name: "issuer_id",
  //   in: "query",
  //   description: "Filter by Issuer ID",
  //   type: "string"
  // }, {
  //   name: "topic_id",
  //   in: "query",
  //   description: "Filter by Topic ID",
  //   type: "string"
  // }]

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

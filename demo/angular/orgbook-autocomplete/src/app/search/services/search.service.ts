import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AggregateAutocompleteResponse } from '../interfaces/aggregate-autocomplete-response';
import { AggregateAutocomplete } from '../interfaces/aggregate-autocomplete';

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
      fromObject: { q, revoked: 'false' }
    });

    const options = { params: queryParams };

    return this.http.get<AggregateAutocompleteResponse>('/search/autocomplete', options);
  }

  /**
   * getFacetList
   */
  public getFacetList() {
    throw new Error('Method is not yet implemented.');
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { CredentialTopicExt } from '@app/credential/interfaces/credential-topic-ext';
import { Topic } from '@app/topic/interfaces/topic';

import { SearchService } from '@app/search/services/search.service';
import { BaseService } from '@app/shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class TopicService extends BaseService {
  constructor(private http: HttpClient, private searchService: SearchService) {
    super();
  }

  /**
   * getSearchTopic
   */
  public getSearchTopic(sourceId: string): Observable<CredentialTopicExt> {
    return this.searchService.getTopic(sourceId)
      .pipe(
        map(topicResponse => {
          const result = topicResponse.results.find(response => response.topic.source_id = sourceId);
          return result && result.topic;
        }),
        catchError(this.handleError<CredentialTopicExt>('getSearchTopic', { names: [] } as CredentialTopicExt))
      );
  }

  /**
   * getTopicById
   */
  public getTopicById(topicId: number, params: any = {}): Observable<CredentialTopicExt> {
    return this.searchService.getTopicById(topicId, params)
      .pipe(
        map(topicResponse => {
          const result = topicResponse.results.find(response => response.topic.id = topicId);
          return result && result.topic;
        }),
        catchError(this.handleError<CredentialTopicExt>('getTopicById', { names: [] } as CredentialTopicExt))
      );
  }

  /**
   * getTopic
   */
  public getTopic(sourceId: string, type: string): Observable<Topic> {
    return this.http.get<Topic>(`/topic/${type}/${sourceId}`)
      .pipe(
        catchError(this.handleError<Topic>('getTopic', {} as Topic))
      );
  }
}

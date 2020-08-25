import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CredentialTopicExt } from '@app/credential/interfaces/credential-topic-ext';
import { Topic } from '@app/topic/interfaces/topic';

import { SearchService } from '@app/search/services/search.service';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  constructor(private http: HttpClient, private searchService: SearchService) { }

  /**
   * getSearchTopic
   */
  public getSearchTopic(sourceId: string): Observable<CredentialTopicExt> {
    return this.searchService.getTopic(sourceId)
      .pipe(
        map(topicResponse => {
          const result = topicResponse.results.find(response => response.topic.source_id = sourceId);
          return result && result.topic;
        })
      );
  }

  /**
   * getTopicById
   */
  public getTopicById(topicId: number): Observable<CredentialTopicExt> {
    return this.searchService.getTopicById(topicId)
      .pipe(
        map(topicResponse => {
          const result = topicResponse.results.find(response => response.topic.id = topicId);
          return result && result.topic;
        })
      );
  }

  /**
   * getTopic
   */
  public getTopic(sourceId: string, type: string): Observable<Topic> {
    return this.http.get<Topic>(`/topic/${type}/${sourceId}`);
  }
}

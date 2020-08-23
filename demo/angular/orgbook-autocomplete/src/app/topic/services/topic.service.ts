import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CredentialTopicExt } from '@app/credential/interfaces/credential-topic-ext';
import { CredentialTopicSearch } from '@app/credential/interfaces/credential-topic-search';
import { SearchService } from '@app/search/services/search.service';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  constructor(private searchService: SearchService) { }

  /**
   * getTopic
   */
  public getTopic(sourceId: string): Observable<CredentialTopicExt> {
    return this.searchService.getTopic(sourceId)
      .pipe(
        map(topicResponse => {
          const result = topicResponse.results.find(response => response.topic.source_id = sourceId);
          return result && result.topic;
        })
      );
  }
}

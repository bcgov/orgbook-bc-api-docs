import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { combineLatest, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { TopicService } from '@app/topic/services/topic.service';
import { SearchService } from '@app/search/services/search.service';

import { CredentialTopicExt } from '@app/credential/interfaces/credential-topic-ext';
import { CredentialResponse } from '@app/search/interfaces/credential-response';
import { Topic } from '@app/topic/interfaces/topic';

@Component({
  selector: 'ob-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent {
  private topicSourceId$ = this.route.paramMap
    .pipe(
      map((params: ParamMap) => params.get('sourceId')),
    );

  topicSearch$ = this.topicSourceId$
    .pipe(
      switchMap(sourceId => {
        if (!sourceId) {
          return of({} as CredentialTopicExt);
        }
        return this.topicService.getSearchTopic(sourceId)
      }),
    );

  topicRelationships$ = this.topicSearch$
    .pipe(
      switchMap(topic => {
        if (!(topic && topic.source_id && topic.type)) {
          return of({} as Topic)
        }
        return this.topicService.getTopic(topic.source_id, topic.type);
      }),
    );

  credentialSearch$ = this.topicSourceId$
    .pipe(
      switchMap(sourceId => {
        if (!sourceId) {
          return of({} as CredentialResponse);
        }
        return this.searchService.getCredential(sourceId)
      }),
    );

  vm$ = combineLatest([this.topicSearch$, this.credentialSearch$, this.topicRelationships$])
    .pipe(
      map(([topic, credentialResponse, relationships]) => ({ topic, credentialResponse, relationships }))
    );

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
    private topicService: TopicService
  ) { }

}

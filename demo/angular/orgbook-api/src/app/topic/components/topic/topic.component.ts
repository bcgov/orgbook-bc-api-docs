import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { combineLatest, of, BehaviorSubject } from 'rxjs';
import { map, switchMap, tap, startWith } from 'rxjs/operators';

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
  private topicLoadingSubject$ = new BehaviorSubject<boolean>(false);
  private topicByIdSubject$ = new BehaviorSubject<CredentialTopicExt>(null);
  private topicSourceId$ = this.route.paramMap
    .pipe(
      map((params: ParamMap) => params.get('sourceId'))
    );
  private topicById$ = this.topicSourceId$
    .pipe(
      tap(() => this.topicLoadingSubject$.next(true)),
      tap(() => this.topicByIdSubject$.next(null)),
      switchMap((sourceId) => {
        if (!sourceId) {
          return of({} as CredentialTopicExt);
        }
        return this.topicService.getSearchTopic(sourceId);
      }),
      switchMap(topic => {
        if (!(topic && topic.source_id && topic.type)) {
          return of({ names: [] } as CredentialTopicExt);
        }
        return this.topicService.getTopicById(topic.id);
      }),
      tap(topic => this.topicByIdSubject$.next(topic)),
      tap(() => this.topicLoadingSubject$.next(false))
    );
  private topicRelationships$ = this.topicByIdSubject$
    .pipe(
      switchMap(topic => {
        if (!(topic && topic.source_id && topic.type)) {
          return of({} as Topic);
        }
        return this.topicService.getTopic(topic.source_id, topic.type);
      })
    );
  private credentialSearch$ = this.topicByIdSubject$
    .pipe(
      switchMap(topic => {
        if (!(topic && topic.source_id && topic.type)) {
          return of({} as CredentialResponse);
        }
        return this.searchService.getCredential(topic.source_id);
      })
    );

  vm$ = combineLatest([
    this.topicLoadingSubject$,
    this.topicSourceId$,
    this.topicById$.pipe(startWith({} as CredentialTopicExt)),
    this.credentialSearch$.pipe(startWith({} as CredentialResponse)),
    this.topicRelationships$.pipe(startWith({} as Topic))
  ])
    .pipe(
      map(([loading, sourceId, topic, credentialResponse, relationships]) => ({
        loading, sourceId, topic, credentialResponse, relationships
      })),
    );

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
    private topicService: TopicService
  ) { }
}

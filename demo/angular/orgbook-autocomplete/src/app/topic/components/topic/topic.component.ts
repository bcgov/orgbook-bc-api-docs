import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { combineLatest, BehaviorSubject } from 'rxjs';
import { map, startWith, filter, tap, switchMap } from 'rxjs/operators';

import { TopicService } from '@app/topic/services/topic.service';
import { SearchService } from '@app/search/services/search.service';

@Component({
  selector: 'ob-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent {
  private topicSourceIdSubject$ = new BehaviorSubject<string>('');
  private topicSourceTypeSubject$ = new BehaviorSubject<string>('');
  private topicLoadingSubject$ = new BehaviorSubject<boolean>(false);

  private topicSourceId$ = this.route.paramMap
    .pipe(
      map((params: ParamMap) => params.get('sourceId')),
    );

  topicSearch$ = this.topicSourceId$
    .pipe(
      filter(sourceId => !!sourceId),
      tap(() => this.topicLoadingSubject$.next(true)),
      switchMap(sourceId => this.topicService.getSearchTopic(sourceId)),
      tap(topic => {
        this.topicSourceIdSubject$.next(topic.source_id || '');
        this.topicSourceTypeSubject$.next(topic.type || '');
      }),
      tap(() => this.topicLoadingSubject$.next(false)),
    );

  topicRelationship$ = combineLatest([
    this.topicSourceIdSubject$,
    this.topicSourceTypeSubject$
  ])
    .pipe(
      filter(([sourceId, type]) => !!sourceId && !!type),
      tap(() => this.topicLoadingSubject$.next(true)),
      switchMap(([sourceId, type]) => this.topicService.getTopic(sourceId, type)),
      tap(() => this.topicLoadingSubject$.next(false)),
    );

  credentialSearch$ = this.topicSourceId$
    .pipe(
      filter(sourceId => !!sourceId),
      tap(() => this.topicLoadingSubject$.next(true)),
      switchMap(sourceId => this.searchService.getCredential(sourceId)),
      tap(() => this.topicLoadingSubject$.next(false)),
    );

  topicLoading$ = this.topicLoadingSubject$.asObservable();

  vm$ = combineLatest([
    this.topicLoading$,
    // tslint:disable-next-line:deprecation
    this.topicSearch$.pipe(startWith(null)),
    // tslint:disable-next-line:deprecation
    this.credentialSearch$.pipe(startWith(null)),
    // tslint:disable-next-line:deprecation
    this.topicRelationship$.pipe(startWith(null)),
  ])
    .pipe(
      map(([loading, topic, credential, relationships]) => ({ loading, topic, credential, relationships}))
    );

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
    private topicService: TopicService
  ) { }

}

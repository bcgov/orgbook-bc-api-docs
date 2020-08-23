import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { map, filter, tap, switchMap } from 'rxjs/operators';

import { TopicService } from '@app/topic/services/topic.service';
import { combineLatest, BehaviorSubject, merge, of } from 'rxjs';
import { SearchService } from '@app/search/services/search.service';
import { CredentialTopicExt } from '@app/credential/interfaces/credential-topic-ext';

@Component({
  selector: 'ob-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent {
  private topicPending$ = new BehaviorSubject<boolean>(false);

  private topicSourceId$ = this.route.paramMap
    .pipe(
      map((params: ParamMap) => params.get('sourceId')),
    );

  topicSearch$ = this.topicSourceId$
    .pipe(
      tap(() => this.topicPending$.next(true)),
      switchMap(sourceId => {
        if (!sourceId) {
          return of({} as CredentialTopicExt);
        }
        return this.topicService.getTopic(sourceId);
      }),
      tap(() => this.topicPending$.next(false)),
    );

  topicLoading$ = this.topicPending$.asObservable();

  vm$ = combineLatest([this.topicLoading$, this.topicSearch$])
    .pipe(
      map(([loading, topic]) => ({ loading, topic }))
    );

  constructor(private route: ActivatedRoute, private topicService: TopicService) { }

}

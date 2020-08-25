import { Component, Input } from '@angular/core';

import { BehaviorSubject, combineLatest } from 'rxjs';

import { TopicService } from '@app/topic/services/topic.service';
import { filter, tap, switchMap, startWith, map } from 'rxjs/operators';

@Component({
  selector: 'ob-related-topic-card',
  templateUrl: './related-topic-card.component.html',
  styleUrls: ['./related-topic-card.component.scss']
})
export class RelatedTopicCardComponent {
  private topicIdSubject$ = new BehaviorSubject<number>(0);
  private topicLoadingSubject$ = new BehaviorSubject<boolean>(false);

  @Input() set topicId(id: number) {
    this.topicIdSubject$.next(id);
  }

  private topicResponse$ = this.topicIdSubject$
    .pipe(
      filter(id => !!id),
      tap(() => this.topicLoadingSubject$.next(true)),
      switchMap(id => this.topicService.getTopicById(id)),
      tap(() => this.topicLoadingSubject$.next(false)),
    )

  vm$ = combineLatest([
    this.topicLoadingSubject$,
    // tslint:disable-next-line:deprecation
    this.topicResponse$.pipe(startWith(null))
  ])
  .pipe(
    map(([loading, topicResponse]) => ({ loading, topicResponse }))
  )

  constructor(private topicService: TopicService) { }
}

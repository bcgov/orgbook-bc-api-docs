import { Component, Input } from '@angular/core';

import { Topic } from '@app/topic/interfaces/topic';

import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'ob-topic-panel-relationships',
  templateUrl: './topic-panel-relationships.component.html',
  styleUrls: ['./topic-panel-relationships.component.scss']
})
export class TopicPanelRelationshipsComponent {
  @Input() relatedTopicIds: number[];

  private relatedTopicIdsSubject$ = new BehaviorSubject<number[]>([]);

  @Input() set relationships(r: Topic) {
    this.relatedTopicIdsSubject$.next(r ? r.related_to : []);
  }

  vm$ = combineLatest([
    this.relatedTopicIdsSubject$
  ]).
    pipe(
      map(([relatedTopicIds]) => ({ relatedTopicIds }))
    );
}

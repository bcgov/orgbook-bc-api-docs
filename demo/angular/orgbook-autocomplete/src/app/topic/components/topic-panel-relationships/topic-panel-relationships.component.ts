import { Component, Input } from '@angular/core';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';

import { CredentialTopicExt } from '@app/credential/interfaces/credential-topic-ext';
import { Observable, Subscription, BehaviorSubject, forkJoin } from 'rxjs';
import { TopicService } from '@app/topic/services/topic.service';

@Component({
  selector: 'ob-topic-panel-relationships',
  templateUrl: './topic-panel-relationships.component.html',
  styleUrls: ['./topic-panel-relationships.component.scss']
})
export class TopicPanelRelationshipsComponent {
  @Input() set relatedTopicIds(ids: number[]) {
    this.relatedTopicDataSource = new RelatedTopicDataSource(ids, this.topicService);
  }

  relatedTopicDataSource: RelatedTopicDataSource;

  constructor(private topicService: TopicService) { }
}

export class RelatedTopicDataSource extends DataSource<CredentialTopicExt> {
  private topicService: TopicService;
  private pageSize = 5;
  private cachedIds = [] as number[];
  private cachedData = [] as CredentialTopicExt[];
  private cachedPages = new Set<number>();
  private subscription = new Subscription();
  private data$: BehaviorSubject<CredentialTopicExt[]>;

  constructor(topicIds: number[] = [], topicService: TopicService) {
    super();
    this.topicService = topicService;
    this.cachedIds = topicIds;
    this.cachedData = Array.from({ length: topicIds.length });
    this.data$ = new BehaviorSubject<CredentialTopicExt[]>(this.cachedData);
  }
  private getPageForIndex(index: number): number {
    return Math.floor(index / this.pageSize);
  }

  private getPage(page: number): void {
    if (this.cachedPages.has(page)) {
      return;
    }
    this.cachedPages.add(page);
    const topicIds = this.cachedIds.slice(page * this.pageSize, (page + 1) * this.pageSize);
    forkJoin(topicIds.map(id => this.topicService.getTopicById(id, { inactive: 'any' })))
      .subscribe(topics => {
        this.cachedData.splice(page * this.pageSize, this.pageSize, ...topics);
        this.data$.next(this.cachedData);
      });
  }

  /**
   * connect
   */
  connect(collectionViewer: CollectionViewer): Observable<CredentialTopicExt[] | readonly CredentialTopicExt[]> {
    this.subscription.add(collectionViewer.viewChange.subscribe(range => {
      const start = this.getPageForIndex(range.start);
      const end = this.getPageForIndex(range.end - 1);
      for (let i = start; i <= end; i++) {
        this.getPage(i);
      }
    }));
    return this.data$;
  }

  /**
   * disconnect
   */
  disconnect(): void {
    this.subscription.unsubscribe();
  }
}

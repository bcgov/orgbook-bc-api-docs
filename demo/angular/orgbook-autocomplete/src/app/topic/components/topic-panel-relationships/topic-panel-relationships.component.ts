import { Component, Input, ViewChild, NgZone, AfterViewInit, OnDestroy } from '@angular/core';
import { CdkScrollable } from '@angular/cdk/scrolling';

import { Subscription, BehaviorSubject, forkJoin, combineLatest } from 'rxjs';
import { tap, map, filter, withLatestFrom, switchMap, first, startWith } from 'rxjs/operators';

import { CredentialTopicExt } from '@app/credential/interfaces/credential-topic-ext';

import { TopicService } from '@app/topic/services/topic.service';

@Component({
  selector: 'ob-topic-panel-relationships',
  templateUrl: './topic-panel-relationships.component.html',
  styleUrls: ['./topic-panel-relationships.component.scss']
})
export class TopicPanelRelationshipsComponent implements AfterViewInit, OnDestroy {
  private pageSize = 5;
  private subscription = new Subscription();
  private relatedTopicsLoadingSubject$ = new BehaviorSubject<boolean>(false);
  private relatedTopicsIdsSubject$ = new BehaviorSubject<number[]>(null);
  private data$ = new BehaviorSubject<CredentialTopicExt[]>(null);

  @Input() set relatedTopicIds(ids: number[]) {
    this.relatedTopicsIdsSubject$.next(Array.from(ids));
  }

  @ViewChild(CdkScrollable) private list: CdkScrollable;

  private first$ = this.relatedTopicsIdsSubject$
    .pipe(
      tap(() => this.relatedTopicsLoadingSubject$.next(true)),
      switchMap(() => forkJoin(this.next(this.pageSize)
        .map(id => this.topicService.getTopicById(id, { inactive: 'any' })))),
      tap(credentials => this.cacheNext(credentials)),
      tap(() => this.relatedTopicsLoadingSubject$.next(false))
    );

  vm$ = combineLatest([
    this.relatedTopicsLoadingSubject$,
    this.first$.pipe(startWith([] as CredentialTopicExt[])),
    this.data$.pipe(startWith([] as CredentialTopicExt[])),
  ])
    .pipe(
      map(([loading, first, data]) => ({ loading, data }))
    );

  constructor(private ngZone: NgZone, private topicService: TopicService) { }

  ngAfterViewInit() {
    this.subscription.add(this.list.elementScrolled()
      .pipe(
        withLatestFrom(this.relatedTopicsLoadingSubject$),
        filter(([e, loading]) => !loading),
        filter(() => !!this.relatedTopicsIdsSubject$.getValue().length),
        filter(() => this.list.measureScrollOffset('bottom') === 0),
        tap(() => this.ngZone.run(() => this.relatedTopicsLoadingSubject$.next(true))),
        switchMap(() => forkJoin(this.next(this.pageSize)
          .map(id => this.topicService.getTopicById(id, { inactive: 'any' })))),
        tap(credentials => this.ngZone.run(() => this.cacheNext(credentials))),
        tap(() => this.ngZone.run(() => this.relatedTopicsLoadingSubject$.next(false))),
      )
      .subscribe());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private next(n: number = 0): number[] {
    const ids = this.relatedTopicsIdsSubject$.getValue() || [];
    return ids.splice(0, n);
  }

  private cacheNext(next: CredentialTopicExt[]) {
    const cached = this.data$.getValue() || [];
    this.data$.next(cached.concat(next));
  }

}

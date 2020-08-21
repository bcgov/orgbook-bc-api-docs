import { Component, Input } from '@angular/core';

import { TopicResponse } from '@app/search/interfaces/topic-response';

import { SearchService } from '@app/search/services/search.service';

@Component({
  selector: 'ob-search-topic-list-nav',
  templateUrl: './search-topic-list-nav.component.html',
  styleUrls: ['./search-topic-list-nav.component.scss']
})
export class SearchTopicListNavComponent {
  @Input() topicResponse: TopicResponse;
  @Input() loading: boolean;

  constructor(private searchService: SearchService) { }

  private get firstIndex(): number {
    return this.topicResponse && this.topicResponse.first_index || 0;
  }

  private get lastIndex(): number {
    return this.topicResponse && this.topicResponse.last_index || 0;
  }

  public get total(): number {
    return this.topicResponse && this.topicResponse.total || 0;
  }

  public get first(): number {
    return this.firstIndex;
  }

  public get last(): number {
    return this.lastIndex;
  }

  /**
   * onPreviousPage
   */
  public onPreviousPage(url: string): void {
    if (!url) {
      return;
    }
    this.searchService.page(url);
  }

  /**
   * onNextPage
   */
  public onNextPage(url: string): void {
    if (!url) {
      return;
    }
    this.searchService.page(url);
  }

}

import { Component, Input } from '@angular/core';

import { TopicResponse } from '@app/search/interfaces/topic-response';

@Component({
  selector: 'ob-search-topic-list-nav',
  templateUrl: './search-topic-list-nav.component.html',
  styleUrls: ['./search-topic-list-nav.component.scss']
})
export class SearchTopicListNavComponent {
  @Input() topicResponse: TopicResponse

  constructor() { }

  private get page(): number {
    return this.topicResponse && this.topicResponse.page || 0;
  }

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
    return this.page * this.firstIndex;
  }

  public get last(): number {
    return this.page * this.lastIndex;
  }

}

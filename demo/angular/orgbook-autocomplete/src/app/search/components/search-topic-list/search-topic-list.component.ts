import { Component, Input, Output, EventEmitter } from '@angular/core';

import { TopicResponse } from '@app/search/interfaces/topic-response';

@Component({
  selector: 'ob-search-topic-list',
  templateUrl: './search-topic-list.component.html',
  styleUrls: ['./search-topic-list.component.scss']
})
export class SearchTopicListComponent {
  @Input() loading = false;
  @Input() topicResponse: TopicResponse;

  @Output() page = new EventEmitter<string>();

  onPage(url: string): void {
    this.page.emit(url);
  }
}

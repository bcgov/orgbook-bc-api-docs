import { Component } from '@angular/core';

import { SearchService } from '@app/search/services/search.service';

import { AggregateAutocompleteResponse } from '@app/search/interfaces/aggregate-autocomplete-response';
import { TopicResponse } from '@app/search/interfaces/topic-response';

@Component({
  selector: 'ob-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  label = 'Registered BC Corporation Search';
  placeholder = 'Start typing to search the OrgBook database';
  autocompleteResponse: AggregateAutocompleteResponse;
  topicResponse: TopicResponse;
  search: any = {};

  constructor(private searchService: SearchService) { }

  onAutocomplete(q: string) {
    if (!q) return;

    q = q.trim();
    this.resetAutocomplete();

    this.searchService.getAggregateAutocomplete(q)
      .subscribe((res: AggregateAutocompleteResponse) => this.autocompleteResponse = res);
  }

  onSearch(name: string) {
    if (!name) return;

    name = name.trim();
    this.resetTopic();

    this.searchService.getTopic(name)
      .subscribe((res: TopicResponse) => this.topicResponse = res);
  }

  onClearSearch() {
    this.search.value = '';
    this.resetAutocomplete();
    this.resetTopic();
  }

  private resetAutocomplete() {
    this.autocompleteResponse = {} as AggregateAutocompleteResponse;
  }

  private resetTopic() {
    this.topicResponse = {} as TopicResponse;
  }
}

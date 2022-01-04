import { Component, Input, Output, EventEmitter } from '@angular/core';

import { TopicFacets } from '@app/search/interfaces/topic-facets';

@Component({
  selector: 'ob-search-topic-facet-list',
  templateUrl: './search-topic-facet-list.component.html',
  styleUrls: ['./search-topic-facet-list.component.scss']
})
export class SearchTopicFacetListComponent {
  @Input() facets: TopicFacets;

  @Output() facet = new EventEmitter<any>();

  /**
   * onFacetSelected
   */
  public onFacet(query): void {
    this.facet.emit(query);
  }
}

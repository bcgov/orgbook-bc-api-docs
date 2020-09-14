import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ProcessedTopicFacetField } from '@app/search/interfaces/processed-topic-facet-field';

@Component({
  selector: 'ob-search-topic-facet',
  templateUrl: './search-topic-facet.component.html',
  styleUrls: ['./search-topic-facet.component.scss']
})
export class SearchTopicFacetComponent {
  @Input() facetField: ProcessedTopicFacetField;

  @Output() facetSelected = new EventEmitter<any>();

  /**
   * onFacetSelected
   */
  public onFacetSelected(): void {
    const query = this.facetField.queryParam;
    this.facetSelected.emit(query);
  }
}

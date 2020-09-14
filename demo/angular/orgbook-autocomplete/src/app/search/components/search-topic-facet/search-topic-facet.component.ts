import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProcessedTopicFacetField } from '@app/search/interfaces/processed-topic-facet-field';

@Component({
  selector: 'ob-search-topic-facet',
  templateUrl: './search-topic-facet.component.html',
  styleUrls: ['./search-topic-facet.component.scss']
})
export class SearchTopicFacetComponent {
  @Input() facetField: ProcessedTopicFacetField;

  @Output() facet = new EventEmitter<any>();

  constructor(private route: ActivatedRoute) { }

  public get query(): any {
    return this.facetField.queryParam;
  }

  public get isSelected(): boolean {
    const queryParams = this.route.snapshot.queryParams;
    for (const key in this.query) {
      if (Object.prototype.hasOwnProperty.call(queryParams, key) && queryParams[key] === this.query[key]) {
        return true;
      }
    }
    return false;
  }

  /**
   * onFacetSelected
   */
  public onFacetClicked(): void {
    if (this.isSelected) {
      for (const key in this.query) {
        if (Object.prototype.hasOwnProperty.call(this.query, key)) {
          this.facetField.queryParam = { ...this.query, [key]: '' };
        }
      }
    }
    this.facet.emit(this.query);
  }
}

import { Component, Input } from '@angular/core';

import { TopicFacetField } from '@app/search/interfaces/topic-facet-field';

@Component({
  selector: 'ob-search-topic-facet',
  templateUrl: './search-topic-facet.component.html',
  styleUrls: ['./search-topic-facet.component.scss']
})
export class SearchTopicFacetComponent {
  @Input() facetFieldType: string;
  @Input() facetField: TopicFacetField;
}

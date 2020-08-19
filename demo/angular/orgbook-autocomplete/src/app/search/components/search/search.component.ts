import { Component } from '@angular/core';

import { SearchService } from '@app/search/services/search.service';

import { AggregateAutocompleteResponse } from '@app/search/interfaces/aggregate-autocomplete-response';
import { AggregateAutocomplete } from '@app/search/interfaces/aggregate-autocomplete';

@Component({
  selector: 'ob-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  label = 'Registered BC Corporation Search';
  placeholder = 'Start typing to search the OrgBook database';
  autocompleteList: AggregateAutocomplete[];

  constructor(private searchService: SearchService) { }

  autocomplete(q: string) {
    if (!q) return;
    
    q = q.trim();
    this.autocompleteList = [];

    this.searchService.getAggregateAutocomplete(q)
      .subscribe((res: AggregateAutocompleteResponse) => this.autocompleteList = res.results);
  }

}

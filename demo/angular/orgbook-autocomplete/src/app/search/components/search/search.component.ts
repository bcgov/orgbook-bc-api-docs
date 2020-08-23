import { Component } from '@angular/core';

import { SearchService } from '@app/search/services/search.service';

@Component({
  selector: 'ob-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  constructor(private searchService: SearchService) { }

  onSearch(name: string): void {
    this.searchService.search(name);
  }

  onClear(): void {
    this.searchService.clearSearch();
  }
}

import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { CredentialTopicSearch } from '@app/search/interfaces/credential-topic-search';

@Component({
  selector: 'ob-search-topic',
  templateUrl: './search-topic.component.html',
  styleUrls: ['./search-topic.component.scss']
})
export class SearchTopicComponent {
  @Input() topic: CredentialTopicSearch;

  constructor(private router: Router) { }

  detail(selected: CredentialTopicSearch): void {
    this.router.navigate(['/topics', selected.topic.source_id]);
  }
}

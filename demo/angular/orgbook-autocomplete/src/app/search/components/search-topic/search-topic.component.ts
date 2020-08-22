import { Component, Input } from '@angular/core';

import { CredentialTopicSearch } from '@app/credential/interfaces/credential-topic-search';

@Component({
  selector: 'ob-search-topic',
  templateUrl: './search-topic.component.html',
  styleUrls: ['./search-topic.component.scss']
})
export class SearchTopicComponent {
  @Input() topic: CredentialTopicSearch;

  /**
   * detail
   */
  public detail(topic: CredentialTopicSearch): void {
    console.log(topic);
    throw new Error('Method has not been implemented yet!');

  }
}

import { Component, Input } from '@angular/core';

import { CredentialTopicExt } from '@app/credential/interfaces/credential-topic-ext';

@Component({
  selector: 'ob-search-topic',
  templateUrl: './search-topic.component.html',
  styleUrls: ['./search-topic.component.scss']
})
export class SearchTopicComponent {
  @Input() topic: CredentialTopicExt;  
}

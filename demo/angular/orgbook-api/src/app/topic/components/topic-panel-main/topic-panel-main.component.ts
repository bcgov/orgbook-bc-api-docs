import { Component, Input } from '@angular/core';

import { CredentialTopicExt } from '@app/credential/interfaces/credential-topic-ext';

@Component({
  selector: 'ob-topic-panel-main',
  templateUrl: './topic-panel-main.component.html',
  styleUrls: ['./topic-panel-main.component.scss']
})
export class TopicPanelMainComponent {
  @Input() topic: CredentialTopicExt;
}

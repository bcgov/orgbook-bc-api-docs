import { Component, Input } from '@angular/core';
import { CredentialTopicExt } from '@app/credential/interfaces/credential-topic-ext';

@Component({
  selector: 'ob-topic-panel-credentials',
  templateUrl: './topic-panel-credentials.component.html',
  styleUrls: ['./topic-panel-credentials.component.scss']
})
export class TopicPanelCredentialsComponent {
  @Input() credential: any;
}

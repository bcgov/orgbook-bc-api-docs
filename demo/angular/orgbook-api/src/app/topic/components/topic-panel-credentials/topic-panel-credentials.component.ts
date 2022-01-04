import { Component, Input } from '@angular/core';

import { CredentialResponse } from '@app/search/interfaces/credential-response';

@Component({
  selector: 'ob-topic-panel-credentials',
  templateUrl: './topic-panel-credentials.component.html',
  styleUrls: ['./topic-panel-credentials.component.scss']
})
export class TopicPanelCredentialsComponent {
  @Input() credentialResponse: CredentialResponse;
}

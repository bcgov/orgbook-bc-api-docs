import { NgModule } from '@angular/core';

import { TopicRoutingModule } from '@app/topic/topic-routing/topic-routing.module';
import { SharedModule } from '@app/shared/shared.module';

import { TopicComponent } from './components/topic/topic.component';
import { TopicHelpCardComponent } from './components/topic-help-card/topic-help-card.component';
import { TopicPanelMainComponent } from './components/topic-panel-main/topic-panel-main.component';
import { TopicPanelCredentialsComponent } from './components/topic-panel-credentials/topic-panel-credentials.component';
import { TopicPanelRelationshipsComponent } from './components/topic-panel-relationships/topic-panel-relationships.component';
import { CredentialCardComponent } from './components/credential-card/credential-card.component';
import { CredentialProofDialogComponent } from './components/credential-proof-dialog/credential-proof-dialog.component';



@NgModule({
  declarations: [
    TopicComponent,
    TopicHelpCardComponent,
    TopicPanelMainComponent,
    TopicPanelCredentialsComponent,
    TopicPanelRelationshipsComponent,
    CredentialCardComponent,
    CredentialProofDialogComponent
  ],
  imports: [
    TopicRoutingModule,
    SharedModule
  ]
})
export class TopicModule { }

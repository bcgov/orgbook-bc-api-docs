import { NgModule } from '@angular/core';

import { TopicRoutingModule } from '@app/topic/topic-routing/topic-routing.module';
import { SharedModule } from '@app/shared/shared.module';

import { TopicComponent } from './components/topic/topic.component';



@NgModule({
  declarations: [
    TopicComponent
  ],
  imports: [
    TopicRoutingModule,
    SharedModule
  ]
})
export class TopicModule { }

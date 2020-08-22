import { NgModule } from '@angular/core';

import { TopicRoutingModule } from '@app/topic/topic-routing/topic-routing.module';

import { TopicComponent } from './components/topic/topic.component';



@NgModule({
  declarations: [
    TopicComponent
  ],
  imports: [
    TopicRoutingModule
  ]
})
export class TopicModule { }

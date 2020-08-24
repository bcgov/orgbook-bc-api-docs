import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TopicComponent } from '../components/topic/topic.component';

const routes: Routes = [
  { path: ':sourceId', component: TopicComponent },
  { path: '', redirectTo: '/search', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopicRoutingModule { }

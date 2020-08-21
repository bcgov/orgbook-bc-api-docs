import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';

import { SearchComponent } from './components/search/search.component';
import { SearchHelpCardComponent } from './components/search-help-card/search-help-card.component';
import { SearchTopicListComponent } from './components/search-topic-list/search-topic-list.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { SearchTopicComponent } from './components/search-topic/search-topic.component';



@NgModule({
  declarations: [
    SearchComponent,
    SearchHelpCardComponent,
    SearchTopicListComponent,
    SearchInputComponent,
    SearchTopicComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    SearchComponent
  ]
})
export class SearchModule { }

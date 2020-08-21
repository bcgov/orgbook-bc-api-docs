import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';

import { SearchComponent } from './components/search/search.component';
import { SearchHelpCardComponent } from './components/search-help-card/search-help-card.component';
import { SearchTopicListComponent } from './components/search-topic-list/search-topic-list.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { SearchTopicComponent } from './components/search-topic/search-topic.component';
import { SearchTopicListNavComponent } from './components/search-topic-list-nav/search-topic-list-nav.component';



@NgModule({
  declarations: [
    SearchComponent,
    SearchHelpCardComponent,
    SearchTopicListComponent,
    SearchInputComponent,
    SearchTopicComponent,
    SearchTopicListNavComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    SearchComponent
  ]
})
export class SearchModule { }

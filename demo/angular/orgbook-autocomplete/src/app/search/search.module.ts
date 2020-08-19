import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';

import { SearchComponent } from './components/search/search.component';
import { SearchHelpCardComponent } from './components/search-help-card/search-help-card.component';



@NgModule({
  declarations: [
    SearchComponent,
    SearchHelpCardComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    SearchComponent
  ]
})
export class SearchModule { }

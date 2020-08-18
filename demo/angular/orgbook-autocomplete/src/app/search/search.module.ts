import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';

import { SearchComponent } from './components/search/search.component';



@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    SearchComponent
  ]
})
export class SearchModule { }

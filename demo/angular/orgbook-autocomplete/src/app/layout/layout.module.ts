import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';

import { HeaderComponent } from './components/header/header.component';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class LayoutModule { }

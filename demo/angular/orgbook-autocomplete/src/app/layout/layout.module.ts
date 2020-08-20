import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';

import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';



@NgModule({
  declarations: [
    HeaderComponent,
    MainComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    HeaderComponent,
    MainComponent
  ]
})
export class LayoutModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SearchModule } from './search/search.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SearchModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

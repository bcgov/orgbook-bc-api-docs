import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { SearchModule } from './search/search.module';
import { LayoutModule } from './layout/layout.module';
import { CredentialModule } from './credential/credential.module';
import { CredentialTypeModule } from './credential-type/credential-type.module';
import { IssuerModule } from './issuer/issuer.module';
import { SchemaModule } from './schema/schema.module';
import { TopicModule } from './topic/topic.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SearchModule,
    LayoutModule,
    CredentialModule,
    CredentialTypeModule,
    IssuerModule,
    SchemaModule,
    TopicModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

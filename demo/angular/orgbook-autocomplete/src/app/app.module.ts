import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { SearchModule } from './search/search.module';
import { LayoutModule } from './layout/layout.module';
import { CredentialModule } from './credential/credential.module';
import { CredentialTypeModule } from './credential-type/credential-type.module';
import { IssuerModule } from './issuer/issuer.module';
import { SchemaModule } from './schema/schema.module';
import { TopicModule } from './topic/topic.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

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
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

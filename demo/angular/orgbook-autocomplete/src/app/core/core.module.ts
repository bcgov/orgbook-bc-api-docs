import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '@app/shared/shared.module';

import { httpInterceptorProviders } from './http-interceptors';



@NgModule({
  imports: [
    HttpClientModule,
    SharedModule
  ],
  providers: [
    httpInterceptorProviders
  ]
})
export class CoreModule { }

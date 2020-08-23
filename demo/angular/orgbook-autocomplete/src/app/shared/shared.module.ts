import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { CredentialAttributeTagPipe } from './pipes/credential-attribute-tag.pipe';
import { CredentialAttributeValuePipe } from './pipes/credential-attribute-value.pipe';



@NgModule({
  declarations: [
    CredentialAttributeTagPipe,
    CredentialAttributeValuePipe
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    TranslateModule
  ],
  exports: [
    CommonModule,
    AngularMaterialModule,
    TranslateModule,
    CredentialAttributeTagPipe,
    CredentialAttributeValuePipe  ]
})
export class SharedModule { }

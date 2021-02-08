import { Pipe, PipeTransform } from '@angular/core';

import { CredentialAttribute } from '@app/credential/interfaces/credential-attribute';

@Pipe({
  name: 'credentialAttributeTag'
})
export class CredentialAttributeTagPipe implements PipeTransform {
  transform(attributes: CredentialAttribute[], type: string): string {
    const attribute = attributes.find(attr => attr.type === type);
    if (!attribute) {
      return;
    }
    return `category.${attribute.type}.${attribute.value}`;
  }

}

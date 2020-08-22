import { Pipe, PipeTransform } from '@angular/core';
import { CredentialAttribute } from '@app/credential/interfaces/credential-attribute';

@Pipe({
  name: 'credentialAttributeValue'
})
export class CredentialAttributeValuePipe implements PipeTransform {
  transform(attributes: CredentialAttribute[], type: string): any {
    const attribute = attributes.find(attr => attr.type === type);
    if (!attribute) {
      return;
    }
    return attribute.value;
  }
}

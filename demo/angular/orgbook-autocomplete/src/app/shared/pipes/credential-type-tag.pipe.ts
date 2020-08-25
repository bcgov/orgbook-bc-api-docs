import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'credentialTypeTag'
})
export class CredentialTypeTagPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return;
    }
    return `credential.type.${value}`;
  }

}

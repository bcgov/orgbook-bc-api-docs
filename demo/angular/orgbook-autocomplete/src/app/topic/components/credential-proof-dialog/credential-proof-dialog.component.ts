import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ob-credential-proof-dialog',
  templateUrl: './credential-proof-dialog.component.html',
  styleUrls: ['./credential-proof-dialog.component.scss']
})
export class CredentialProofDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) { }
}
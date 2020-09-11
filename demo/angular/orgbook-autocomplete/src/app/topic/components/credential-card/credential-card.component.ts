import { Component, Input } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { CredentialSearch } from '@app/search/interfaces/credential-search';

import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, filter, startWith, tap, switchMap } from 'rxjs/operators';

import { environment as env } from '@env/environment';

import { CredentialService } from '@app/credential/services/credential.service';

import { CredentialProofDialogComponent } from '../credential-proof-dialog/credential-proof-dialog.component';

@Component({
  selector: 'ob-credential-card',
  templateUrl: './credential-card.component.html',
  styleUrls: ['./credential-card.component.scss']
})
export class CredentialCardComponent {
  private verifyLoadingSubject$ = new BehaviorSubject<boolean>(false);
  private credentialSubject$ = new BehaviorSubject<CredentialSearch>(null);

  @Input() set credential(c: CredentialSearch) {
    this.credentialSubject$.next(c);
  }

  private verified$ = this.credentialSubject$
    .pipe(
      filter(credential => !!credential.credential_id),
      tap(() => this.verifyLoadingSubject$.next(true)),
      switchMap(credential => this.credentialService.getCredentialVerification(credential.credential_id)),
      tap(() => this.verifyLoadingSubject$.next(false))
    );

  vm$ = combineLatest([
    this.verifyLoadingSubject$,
    this.verified$.pipe(startWith({} as Credential)),
    this.credentialSubject$.pipe(startWith({} as CredentialSearch)),
  ])
    .pipe(
      map(([verifying, verified, credential]) => ({ verifying, verified, credential }))
    );

  constructor(private credentialService: CredentialService, private dialog: MatDialog) { }

  getLogoUrl(id: number): string {
    return `${env.apiUrl}/issuer/${id}/logo`;
  }

  openDialog(proof: string): void {
    this.dialog.open(CredentialProofDialogComponent, {
      data: JSON.stringify(proof, null, 2)
    });
  }
}

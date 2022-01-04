import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Credential } from '../interfaces/credential';

@Injectable({
  providedIn: 'root'
})
export class CredentialService {
  constructor(private http: HttpClient) { }

  /**
   * getCredentialVerification
   */
  public getCredentialVerification(credentialId: string): Observable<Credential> {
    return this.http.get<Credential>(`/credential/${credentialId}/verify`);
  }
}

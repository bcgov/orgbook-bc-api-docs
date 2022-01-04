import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialProofDialogComponent } from './credential-proof-dialog.component';

describe('CredentialProofDialogComponent', () => {
  let component: CredentialProofDialogComponent;
  let fixture: ComponentFixture<CredentialProofDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CredentialProofDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredentialProofDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

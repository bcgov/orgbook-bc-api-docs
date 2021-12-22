import { TestBed } from '@angular/core/testing';

import { OrgbookApiInterceptorService } from './orgbook-api-interceptor.service';

describe('OrgbookApiInterceptorService', () => {
  let service: OrgbookApiInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrgbookApiInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

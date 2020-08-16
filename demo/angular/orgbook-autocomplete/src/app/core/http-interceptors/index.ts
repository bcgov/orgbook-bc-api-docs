import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { OrgbookApiInterceptorService } from './orgbook-api-interceptor.service';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: OrgbookApiInterceptorService, multi: true },
];
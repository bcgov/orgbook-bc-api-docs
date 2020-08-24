import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

import { environment as env } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor(private location: Location, private router: Router) { }

  /**
   * extractUrlQuery
   */
  public extractUrlQuery(url: any): string {
    const urlTree = this.router.parseUrl(url.replace(env.apiUrl, ''));
    return this.formatUrlQuery(urlTree.queryParams);
  }

  /**
   * formatUrlQuery
   */
  formatUrlQuery(options: any): string {
    const queryParams = new HttpParams({
      fromObject: options
    });
    return queryParams.toString();
  }

  /**
   * setUrlState
   */
  public setUrlState(url: string): void {
    this.location.replaceState(url);
    this.router.navigateByUrl(this.location.path());
  }
}

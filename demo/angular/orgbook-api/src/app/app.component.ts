import { Component } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ob-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'orgbook-api';
  constructor(translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }
}

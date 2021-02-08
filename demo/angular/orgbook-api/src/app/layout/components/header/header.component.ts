import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ob-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  title = 'OrgBook BC Autocomplete';

  constructor() { }
}

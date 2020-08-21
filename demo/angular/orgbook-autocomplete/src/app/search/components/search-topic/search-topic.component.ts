import { Component, Input } from '@angular/core';

@Component({
  selector: 'ob-search-topic',
  templateUrl: './search-topic.component.html',
  styleUrls: ['./search-topic.component.scss']
})
export class SearchTopicComponent {
  // TODO: Need to change this to a type
  @Input() topic: any;
  
  // constructor() { }
}

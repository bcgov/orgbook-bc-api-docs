import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ob-search-topic-result',
  templateUrl: './search-topic-result.component.html',
  styleUrls: ['./search-topic-result.component.scss']
})
export class SearchTopicResultComponent {
  @Input() loading = false;
}
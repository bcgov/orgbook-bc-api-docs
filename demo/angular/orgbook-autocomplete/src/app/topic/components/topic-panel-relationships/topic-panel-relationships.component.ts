import { Component, Input } from '@angular/core';

@Component({
  selector: 'ob-topic-panel-relationships',
  templateUrl: './topic-panel-relationships.component.html',
  styleUrls: ['./topic-panel-relationships.component.scss']
})
export class TopicPanelRelationshipsComponent {
  @Input() relationships: any;
}

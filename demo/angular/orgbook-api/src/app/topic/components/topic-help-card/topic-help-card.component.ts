import { Component, Input } from '@angular/core';

@Component({
  selector: 'ob-topic-help-card',
  templateUrl: './topic-help-card.component.html',
  styleUrls: ['./topic-help-card.component.scss']
})
export class TopicHelpCardComponent {
  @Input() sourceId: string;
}

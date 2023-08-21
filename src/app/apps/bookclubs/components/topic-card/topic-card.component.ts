import { Component, Input } from '@angular/core';
import { Topic } from 'src/app/core/interface/bookclub/topic';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'bh-topic-card',
  templateUrl: './topic-card.component.html',
  styleUrls: ['./topic-card.component.scss'],
})
export class TopicCardComponent {
  @Input() topic?: Topic;
}

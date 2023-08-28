import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Topic } from 'src/app/core/interface/bookclub/topic';
import { MatDialog } from '@angular/material/dialog';
import { TopicDialog } from '../dialogues/topic-dialog/topic-dialog.component';

@Component({
  selector: 'bh-topic-card',
  templateUrl: './topic-card.component.html',
  styleUrls: ['./topic-card.component.scss'],
})
export class TopicCardComponent {
  @Input() topic?: Topic;
  @Output() refetchTopicsEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  openTopicDialog() {
    const dialog = this.dialog.open(TopicDialog, {
      data: {
        topicId: this.topic?.id,
        bookclubId: this.topic?.bookclubId,
      },
      height: '600px',
      width: '600px',
      autoFocus: false,
    });
    dialog.afterClosed().subscribe((_) => {
      this.refetchTopicsEvent.emit(true);
    });
  }
}

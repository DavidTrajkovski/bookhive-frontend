import { Component, Input } from '@angular/core';
import { BookClub } from 'src/app/core/interface/bookclub/bookclub';

@Component({
  selector: 'bh-bookclub-card',
  templateUrl: './bookclub-card.component.html',
  styleUrls: ['./bookclub-card.component.scss'],
})
export class BookclubCardComponent {
  @Input() bookclub?: BookClub;
}

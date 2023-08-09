import { Component, Input } from '@angular/core';
import { Bookshop } from 'src/app/core/interface/bookshop';

@Component({
  selector: 'bh-bookshop-card',
  templateUrl: './bookshop-card.component.html',
  styleUrls: ['./bookshop-card.component.scss'],
})
export class BookshopCardComponent {
  @Input() bookshop?: Bookshop;
}

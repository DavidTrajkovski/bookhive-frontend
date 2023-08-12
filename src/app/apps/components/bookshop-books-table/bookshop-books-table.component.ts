import { Component, Input } from '@angular/core';
import { BookshopBook } from 'src/app/core/interface/bookshop-book';

@Component({
  selector: 'bh-bookshop-books-table',
  templateUrl: './bookshop-books-table.component.html',
  styleUrls: ['./bookshop-books-table.component.scss'],
})
export class BookshopBooksTableComponent {
  @Input() books: BookshopBook[] = [];
  @Input() filteredBooks: BookshopBook[] = [];

  queryBooksByName(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue === '') {
      this.filteredBooks = this.books;
    } else {
      this.filteredBooks = this.books.filter((item) =>
        item.name.toLowerCase().includes(filterValue.trim().toLowerCase())
      );
    }
  }
}

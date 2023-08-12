import {Component, OnInit} from '@angular/core';
import {BookService} from "../../core/service/book/book.service";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit{

  genres: string[]

  constructor(private _bookService: BookService) {
    this.genres = []
  }

  ngOnInit(): void {
    this.loadGenres()
  }

  loadGenres() {
    this._bookService.getAllGenres().subscribe({
        next: data => this.genres = data,
        error: err => console.log(err)
      }
    )
  }

}

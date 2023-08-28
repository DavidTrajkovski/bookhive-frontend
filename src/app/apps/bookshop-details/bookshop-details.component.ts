import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Bookshop } from 'src/app/core/interface/bookshop';
import { BookshopBook } from 'src/app/core/interface/bookshop-book';
import { BookshopService } from 'src/app/core/service/bookshop.service';
import { RouteConstants } from 'src/app/shared/RouteConstants';

@Component({
  selector: 'bh-bookshop-details',
  templateUrl: './bookshop-details.component.html',
  styleUrls: ['./bookshop-details.component.scss'],
})
export class BookshopDetailsComponent {
  bookshopId: string = '';
  bookshop?: Bookshop;
  bookshopIsLoading: boolean = true;

  books: BookshopBook[] = [];
  booksAreLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private bookshopService: BookshopService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.getBookshopIdFromPath();
    this.getBookshopById();
    this.getBooksForBookshop();
  }

  getBookshopIdFromPath() {
    this.route.params.subscribe((params) => {
      this.bookshopId = params[RouteConstants.BOOKSHOPS_ID];
    });
  }

  getBookshopById() {
    this.bookshopService.getBookshopById(this.bookshopId).subscribe({
      next: (data) => {
        this.bookshop = data;
        this.bookshopIsLoading = false;
      },
      error: (err) => {
        console.error(err)
        this._router.navigate([RouteConstants.NOT_FOUND])
      },
    });
  }

  getBooksForBookshop() {
    this.bookshopService.getBooksForBookshop(this.bookshopId).subscribe({
      next: (data) => {
        this.books = data;
        this.booksAreLoading = false;
      },
      error: (err) => console.error(err),
    });
  }
}

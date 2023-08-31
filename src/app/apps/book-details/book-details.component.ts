import {Component, OnInit} from '@angular/core';
import {BookDto} from "../../core/interface/book/book-dto";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthorService} from "../../core/service/author/author.service";
import {BookService} from "../../core/service/book/book.service";
import {RouteConstants} from "../../shared/RouteConstants";
import {BookshopService} from "../../core/service/bookshop.service";
import {Bookshop} from "../../core/interface/bookshop";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit{
  bookId: string = '';
  book?: BookDto;
  bookshops: Bookshop[] = [];
  bookIsLoading: boolean = true;
  bookshopsAreLoading: boolean = true;

  constructor(
    private _route: ActivatedRoute,
    private _authorService: AuthorService,
    private _bookService: BookService,
    private bookshopService: BookshopService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.getBookIdFromPath();
    this.getBookById();
    this.getBookshopsForBook();
  }

  getBookIdFromPath() {
    this._route.params.subscribe((params) => {
      this.bookId = params[RouteConstants.BOOKS_ID];
    });
  }

  getBookById() {
    this._bookService.getBookById(this.bookId).subscribe({
      next: (data) => {
        this.book = data;
        this.bookIsLoading = false;
      },
      error: (err) => {
        this._router.navigate([RouteConstants.NOT_FOUND])
        console.error(err)
      },
    });
  }

  getBookUrl(): string {
    if (this.book != null) {
      if (this.book.coverImageUrl != null && this.book.coverImageUrl != "" && this.book.coverImageUrl.length > 1) {
        return this.book.coverImageUrl
      } else {

        return "/assets/no_image_available.png"
      }
    } else {
      return "/assets/no_image_available.png"
    }
  }

  toDateFormat(param: any){
    const result = param.split("T")[0]
    return result;
  }


  openAddToCartDialog(id: string) {

  }

  addToFavourites(id: string) {

  }

  private getBookshopsForBook() {
      this.bookshopService.getBookshopsForBook(this.bookId).subscribe({
        next: (data) => {
          this.bookshops = data;
          this.bookshopsAreLoading = false;
          console.log(this.bookshops + "     TESTTEST")
        },
        error: (err) => console.error(err),
      });
  }
}

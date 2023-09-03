import {Component, OnInit} from "@angular/core";
import {RouteConstants} from "../../shared/RouteConstants";
import {ActivatedRoute} from "@angular/router";
import {BookService} from "../../core/service/book/book.service";

@Component({
  selector: 'book-preview',
  templateUrl: 'book-preview.page.html',
  styleUrls: ['book-preview.page.scss'],
})
export class BookPreviewPage implements OnInit {

  bookId: string = '';
  bookPdfUrl: string = '';
  loading: boolean = false;
  page: number = 1;
  totalPages: number = 0;
  zoom: number = 0.5

  constructor(private route: ActivatedRoute,
              private _bookService: BookService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.getBookIdFromPath()
  }

  getBookIdFromPath() {
    this.route.params.subscribe((params) => {
      this.bookId = params[RouteConstants.BOOK_ID];
      debugger
      this.getBookPdfUrl(this.bookId)
    });
  }

  getBookPdfUrl(bookId: string) {
    this._bookService.getBookPdfUrl(bookId).subscribe({
      next: (data) => {
        console.log(data)
        debugger
        this.bookPdfUrl = data.pdfUrl;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.log(err)
      }
    })
  }

  nextPage() {
    this.page++;
  }

  prevPage() {
    this.page--;
  }

  setPage(event: any) {
    this.page = +event.target.value
  }

  decreaseZoom() {
    if (this.zoom > 0.0) {
      this.zoom -= 0.05;
      this.zoom = +this.zoom.toFixed(3)
    }
  }

  increaseZoom() {
    if (this.zoom < 2.0) {
      this.zoom += 0.05;
      this.zoom = +this.zoom.toFixed(3)
    }
  }

  setZoom(event: any) {
    this.zoom = +event.target.value
  }

  afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
    this.loading = false;
  }

}

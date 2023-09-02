import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormGroup} from "@angular/forms";
import {debounceTime, distinctUntilChanged, filter, map, pairwise, throttleTime,} from 'rxjs/operators';
import {Subscription} from "rxjs";
import {BookService} from "../../core/service/book/book.service";
import {BookDto} from "../../core/interface/book/book-dto";
import { AuthService } from 'src/app/core/service/authentication/auth.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements  OnInit, OnDestroy {
  searchAndFilterForm: FormGroup = this.initializeForm();
  searchAndFilterFormSubscription = new Subscription();
  genres: string[] = [];
  loading: boolean = false;
  books: BookDto[] = [];
  page: number = 1;
  total: number = 0

  constructor(
    private _formBuilder: FormBuilder,
    private _bookService: BookService,
    public authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.loadGenres()
    this.initializeForm()
    this.subscribeToFormChanges()
    this.callGetBooks()
  }

  pageChangeEvent(event: number){
    this.page = event;
    this.callGetBooks();
  }

  callGetBooks() {
    this.loading = true
    const searchValue = this.searchAndFilterForm.get('searchAndFilter.searchValue')!.value;
    const genre = this.searchAndFilterForm.get('searchAndFilter.sortValue')!.value;
    this._bookService.getPageableBooks(this.page, searchValue, genre).subscribe((data) => {
      this.books = data
      this.total = data.length
      this.loading = false
    });
  }


  loadGenres() {
    this._bookService.getAllGenres().subscribe({
        next: data => this.genres = data,
        error: err => console.log(err)
      }
    )
  }

  initializeForm() {
    return this._formBuilder.group({
      searchAndFilter: this._formBuilder.group({
        sortValue: [''],
        searchValue: ['']
      })
    });
  }

  subscribeToFormChanges() {
    this.loading = true
    this.searchAndFilterFormSubscription = this.searchAndFilterForm.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter((value) => value)
      )
      .subscribe(() => {
        this.callGetBooks()
      });
  }

  ngOnDestroy(): void {
    this.searchAndFilterFormSubscription.unsubscribe();
  }

}

import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LibraryBook } from 'src/app/core/interface/my-library/library-book';
import { LibraryService } from 'src/app/core/service/library.service';
import { AsyncPipe, Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/service/authentication/auth.service';
import { NotifierService } from 'angular-notifier';
import { Book } from 'src/app/core/interface/book';

@Component({
  selector: 'app-my-library',
  templateUrl: './my-library.component.html',
  styleUrls: ['./my-library.component.scss'],
})
export class MyLibraryComponent {
  books: LibraryBook[] = [];
  isLoading: boolean = false;

  constructor(
    private _libraryService: LibraryService,
    private _authService: AuthService,
    private _notifierService: NotifierService
  ) {}

  ngOnInit(): void {
    this.getLibraryBooks();
  }

  getLibraryBooks() {
    this.isLoading = true;
    this._libraryService.getLibraryBooks().subscribe({
      next: (data) => {
        this.books = data;
        console.log(this.books);
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err)
        this.isLoading = false;
      },
    });
  }

  editLastPageRead(libBook: LibraryBook) {
    const id = `lastPageReadId${libBook.book.id}`;
    const lastPage = <HTMLInputElement>document.getElementById(id);
    if (+lastPage.value > libBook.book.totalPages) {
      this._notifierService.notify(
        'error',
        'Invalid entry: Page number cannot be greater than total number of pages.'
      );
      return;
    }

    this._libraryService
      .editLastPageRead(
        this._authService.getUserId()!,
        libBook.book.id,
        +lastPage.value
      )
      .subscribe((_) => location.reload());

    this._notifierService.notify('success', 'Changes saved.');
  }
}

import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LibraryBook } from 'src/app/core/interface/my-library/library-book';
import { LibraryService } from 'src/app/core/service/library.service';
import { AsyncPipe, Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/service/authentication/auth.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-my-library',
  templateUrl: './my-library.component.html',
  styleUrls: ['./my-library.component.scss'],
})
export class MyLibraryComponent {
  books: LibraryBook[] = [];

  constructor(
    private _libraryService: LibraryService,
    private _authService: AuthService,
    private _notifierService: NotifierService
  ) {}

  ngOnInit(): void {
    this.getLibraryBooks();
  }

  getLibraryBooks() {
    this._libraryService.getLibraryBooks().subscribe({
      next: (data) => {
        this.books = data;
        console.log(this.books);
      },
      error: (err) => console.log(err),
    });
  }

  editLastPageRead(bookId: string) {
    const id = `lastPageReadId${bookId}`;
    const lastPage = <HTMLInputElement>document.getElementById(id);

    this._libraryService.editLastPageRead(
      this._authService.getUserId()!,
      bookId,
      +lastPage.value
    );

    this._notifierService.notify('success', 'Changes saved.');
  }
}

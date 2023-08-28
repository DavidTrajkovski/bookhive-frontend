import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { BookclubDetails } from 'src/app/core/interface/bookclub/bookclub-details';
import { CreateBookclubRequest } from 'src/app/core/interface/bookclub/create-bookclub-request';
import { AuthService } from 'src/app/core/service/authentication/auth.service';
import { BookclubService } from 'src/app/core/service/bookclub.service';

@Component({
  selector: 'bh-bookclub-dialog',
  templateUrl: './bookclub-dialog.component.html',
  styleUrls: ['./bookclub-dialog.component.scss'],
})
export class BookclubDialog {
  bookclub: BookclubDetails | null = null;
  bookclubForm: FormGroup = this.initializeForm();
  bookclubSubscription = new Subscription();
  isLoading: boolean = true;

  constructor(
    private _dialogRef: MatDialogRef<BookclubDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { bookclubId: string | null },
    private _bookclubService: BookclubService,
    private _formBuilder: FormBuilder,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initLogic();
  }

  initLogic() {
    if (this.data.bookclubId != null) {
      this._bookclubService.getBookClubById(this.data.bookclubId).subscribe({
        next: (data) => {
          this.isLoading = false;
          this.bookclub = {
            bookclubId: data.id,
            ownerId: this._authService.getUserId()!,
            name: data.name,
            description: data.description,
          };
          this.prepopulateBookclubForm(this.bookclub);
        },
        error: (err) => console.error(err),
      });
    } else {
      this.isLoading = false;
      this.initializeForm();
    }
  }

  initializeForm() {
    return (this.bookclubForm = this._formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    }));
  }

  prepopulateBookclubForm(bookclub: BookclubDetails) {
    this.bookclubForm.setValue({
      name: bookclub.name,
      description: bookclub.description,
    });
  }

  onSubmit() {
    if (this.bookclubForm.invalid) return;

    const bookclubRequest = this.createBookclubRequestObj();
    if (this.data.bookclubId == null) {
      this.createBookclub(bookclubRequest);
    } else {
      this.editBookclub(bookclubRequest);
    }
  }

  createBookclub(bookclubRequest: CreateBookclubRequest) {
    this.bookclubSubscription = this._bookclubService
      .createBookClub(bookclubRequest)
      .subscribe({
        next: (_) => this._dialogRef.close(),
        error: (err) => console.error(err),
      });
  }

  editBookclub(bookclubRequest: CreateBookclubRequest) {
    this.bookclubSubscription = this._bookclubService
      .editBookClub(this.bookclub?.bookclubId!, bookclubRequest)
      .subscribe({
        next: (_) => this._dialogRef.close(),
        error: (err) => console.error(err),
      });
  }

  createBookclubRequestObj(): CreateBookclubRequest {
    return {
      ownerId: this._authService.getUserId()!,
      name: this.bookclubForm.value.name,
      description: this.bookclubForm.value.description,
    };
  }

  onCancel() {
    this._dialogRef.close();
  }

  getSubmitButtonText() {
    if (this.data.bookclubId != null) {
      return 'Save';
    } else {
      return 'Create';
    }
  }
}

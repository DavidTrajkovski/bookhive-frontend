import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AuthorDetails} from "../../../../core/interface/author/author-details";
import {AuthorService} from "../../../../core/service/author/author.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {CreateAuthorRequest} from "../../../../core/interface/author/create-author-request";
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'AuthorDialog',
  templateUrl: 'author.dialog.html',
  styleUrls: ['author.dialog.scss']
})
export class AuthorDialog implements OnInit {

  author: AuthorDetails | null  = null;
  authorForm: FormGroup = this.initializeForm();
  authorSubscription = new Subscription();
  isLoading: boolean = false;
  private readonly notifier: NotifierService;

  constructor(
    private _dialogRef: MatDialogRef<AuthorDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {authorId: string | null},
    private _authorService: AuthorService,
    private _formBuilder: FormBuilder,
    private notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.isLoading = true
    this.initLogic()
  }

  initLogic() {
    if (this.data.authorId != null) {
      this._authorService.getAuthorById(this.data.authorId).subscribe({
        next: value => {
          this.isLoading = false
          this.author = value
          this.prepopulateAuthorForm(this.author);
        },
        error: err => {
          //this.isLoading = false
          console.log(err)
        }
      })
    } else {
      this.isLoading = false
      this.initializeForm()
    }
  }

  prepopulateAuthorForm(author: AuthorDetails) {
    this.authorForm.setValue({
      name: author.name,
      surname: author.surname,
      age: author.age,
      biography: author.biography
    });
  }

  initializeForm() {
    return (this.authorForm = this._formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      age: [ [Validators.required, Validators.email, Validators.min(0)]],
      biography: ['', Validators.required],
    }));
  }

  onSubmit() {
    if (this.authorForm.invalid) {
      return;
    }

    const authorRequest: CreateAuthorRequest = this.createAuthorRequestFun();

    if (this.data.authorId == null) {
      this.createAuthor(authorRequest)
    } else {
      this.editAuthor(authorRequest)
    }
  }

  onCancel(){
    this._dialogRef.close()
  }

  createAuthor(authorRequest: CreateAuthorRequest) {
    this.authorSubscription = this._authorService.createAuthor(authorRequest)
      .subscribe(
        (next) => {
          this._dialogRef.close()
          this.notifier.notify('success', 'New author has been created!');
        },
        (error) => {
          console.error('Author creation failed: ', error);
          this.notifier.notify('error', 'Author creation failed: \n', error);
        }
      );
  }

  editAuthor(authorRequest: CreateAuthorRequest) {
    this.authorSubscription = this._authorService.editAuthor(authorRequest,this.data.authorId!)
      .subscribe(
        (next) => {
          this._dialogRef.close()
          this.notifier.notify('success', 'Author has been successfully edited!');
        },
        (error) => {
          console.error('Author editing failed: ', error);
          this.notifier.notify('error', 'Author editing failed: \n', error);
        }
      );
  }

  createAuthorRequestFun(): CreateAuthorRequest {
    return {
      name: this.authorForm.value.name,
      surname: this.authorForm.value.surname,
      age: this.authorForm.value.age,
      biography: this.authorForm.value.biography
    };
  }

  getSubmitButtonText() {
    if (this.data.authorId != null)
      return 'Save'
    else
      return 'Create'
  }

}

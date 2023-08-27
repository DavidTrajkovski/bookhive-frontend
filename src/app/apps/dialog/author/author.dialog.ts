import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AuthorDetails} from "../../../core/interface/author/author-details";
import {AuthorService} from "../../../core/service/author/author.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {CreateAuthorRequest} from "../../../core/interface/author/create-author-request";

@Component({
  selector: 'AuthorDialog',
  templateUrl: 'author.dialog.html',
  styleUrls: ['author.dialog.scss']
})
export class AuthorDialog implements OnInit {

  author: AuthorDetails | null  = null
  authorForm: FormGroup = this.initializeForm() ;
  authorSubscription = new Subscription();

  constructor(
    private _dialogRef: MatDialogRef<AuthorDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {authorId: string | null},
    private _authorService: AuthorService,
    private _formBuilder: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.initLogic()
  }

  initLogic() {
    if (this.data.authorId != null) {
      this._authorService.getAuthorById(this.data.authorId).subscribe({
        next: value => {
          this.author = value
          this.prepopulateAuthorForm(this.author);
        },
        error: err => {console.log(err)}
      })
    } else {
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
        },
        (error) => {
          console.error('Author creation failed: ', error);
        }
      );
  }

  editAuthor(authorRequest: CreateAuthorRequest) {
    this.authorSubscription = this._authorService.editAuthor(authorRequest,this.data.authorId!)
      .subscribe(
        (next) => {
          this._dialogRef.close()
        },
        (error) => {
          console.error('Author editing failed: ', error);
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

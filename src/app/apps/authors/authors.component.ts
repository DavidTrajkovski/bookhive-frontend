import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {BookAuthorInfoDto} from "../../core/interface/author/book-author-info-dto";
import {AuthorService} from "../../core/service/author/author.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AuthorDialog} from "../dialog/author/author.dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {
  authors$: Observable<BookAuthorInfoDto[]> | null

  constructor(private _authorService: AuthorService,
              private router: Router,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
    this.authors$ = null
  }

  ngOnInit(): void {
    this.authors$ = this._authorService.getAllAuthors()
  }

  openAuthorDialog(authorId: string | null) {
    const dialog = this.dialog.open(AuthorDialog, {
      data: {
        authorId: authorId,
      },
      height: '600px',
      width: '600px',
      autoFocus: false
    });
    dialog.afterClosed().subscribe(_ => this.authors$ = this._authorService.getAllAuthors())
  }

  deleteAuthor(id: string) {
    this._authorService.deleteAuthor(id).subscribe({
      next: value => {
        this.openSnackbar()
        this.authors$ = this._authorService.getAllAuthors()
      },
      error: err => {this.authors$ = this._authorService.getAllAuthors()}
    })
  }

  openSnackbar() {
    this.snackBar.open('Author Deleted', 'Close', {
      duration: 2000,
    });
  }

}

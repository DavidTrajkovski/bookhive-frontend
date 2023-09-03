import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {BookAuthorInfoDto} from "../../core/interface/author/book-author-info-dto";
import {AuthorService} from "../../core/service/author/author.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AuthorDialog} from "./dialogs/author-dialog/author.dialog";
import { NotifierService } from 'angular-notifier';
import { AuthService } from 'src/app/core/service/authentication/auth.service';
@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {
  authors$: Observable<BookAuthorInfoDto[]> | null
  loading: boolean = false;

  constructor(private _authorService: AuthorService,
              private router: Router,
              private dialog: MatDialog,
              private _notifierService: NotifierService,
              public authService: AuthService) {
    this.authors$ = null
  }

  ngOnInit(): void {
    this.loading = true
    this.authors$ = this._authorService.getAllAuthors()
    this.authors$.subscribe(data => {
      if (data != null) {
        this.loading = false
      }
    })
    // if (this.authors$ != null) {
    //   this.loading = false;
    // }
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
        this._notifierService.notify('success', 'Author deleted.');
        this.authors$ = this._authorService.getAllAuthors()
      },
      error: err => {this.authors$ = this._authorService.getAllAuthors()}
    })
  }
}

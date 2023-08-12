import {Component, OnInit} from '@angular/core';

import {Observable} from "rxjs";

import {BookAuthorInfoDto} from "../../core/interface/author/book-author-info-dto";
import {AuthorService} from "../../core/service/author/author.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {
  authors$: Observable<BookAuthorInfoDto[]> | null

  constructor(private _authorService: AuthorService,
              private router: Router) {
    this.authors$ = null
  }

  ngOnInit(): void {
    this.authors$ = this._authorService.getAllAuthors()
  }



}

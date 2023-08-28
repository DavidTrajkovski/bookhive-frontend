import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthorService} from "../../core/service/author/author.service";
import {RouteConstants} from "../../shared/RouteConstants";
import {AuthorDetails} from "../../core/interface/author/author-details";
import {AuthorBook} from "../../core/interface/author/author-book";

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.scss']
})
export class AuthorDetailsComponent implements OnInit{
  authorId: string = '';
  author?: AuthorDetails;
  authorIsLoading: boolean = true;
  authorBooks: AuthorBook[] = [];
  authorBooksAreLoading: boolean = true;

  constructor(
    private _route: ActivatedRoute,
    private _authorService: AuthorService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.getAuthorIdFromPath();
    this.getAuthorById();
    this.getBooksForAuthor();
  }

  getAuthorIdFromPath() {
    this._route.params.subscribe((params) => {
      this.authorId = params[RouteConstants.AUTHORS_ID];
    });
  }

  getAuthorById() {
    this._authorService.getAuthorById(this.authorId).subscribe({
      next: (data) => {
        this.author = data;
        this.authorIsLoading = false;
      },
      error: (err) => {
        console.error(err)
        this.authorIsLoading = false
        this._router.navigate([RouteConstants.NOT_FOUND])
      },
    });
  }

  getBooksForAuthor() {
    this._authorService.getBooksForAuthor(this.authorId).subscribe({
      next: (data) => {
        this.authorBooks = data;
        console.log(this.authorBooks)
        this.authorBooksAreLoading = false;
      },
      error: (err) => console.error(err),
    });
  }

}

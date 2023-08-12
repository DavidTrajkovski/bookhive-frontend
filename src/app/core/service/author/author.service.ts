import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthorDetails} from "../../interface/author/author-details";
import {BookAuthorInfoDto} from "../../interface/author/book-author-info-dto";
import {AuthorBook} from "../../interface/author/author-book";
import {environment} from "../../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  baseUrl: string = `${environment.apiUrl}/authors`;

  constructor(private _http: HttpClient) {
  }

  getAllAuthors(): Observable<BookAuthorInfoDto[]> {
    return this._http.get<BookAuthorInfoDto[]>(`${this.baseUrl}`);
  }

  getAuthorById(id: string): Observable<AuthorDetails> {
    return this._http.get<AuthorDetails>(`${this.baseUrl}/${id}`);
  }

  getBooksForAuthor(id: string): Observable<AuthorBook[]> {
    return this._http.get<AuthorBook[]>(`${this.baseUrl}/${id}/authorbookdtos`);
  }

}

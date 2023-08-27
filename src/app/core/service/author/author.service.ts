import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthorDetails} from "../../interface/author/author-details";
import {BookAuthorInfoDto} from "../../interface/author/book-author-info-dto";
import {AuthorBook} from "../../interface/author/author-book";
import {environment} from "../../../../environments/environment.development";
import {CreateAuthorRequest} from "../../interface/author/create-author-request";

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

  createAuthor(createAuthorRequest: CreateAuthorRequest): Observable<number> {
    return this._http.post<number>(`${this.baseUrl}`, createAuthorRequest)
  }

  editAuthor(createAuthorRequest: CreateAuthorRequest, id: string): Observable<number> {
    return this._http.put<number>(`${this.baseUrl}/${id}`, createAuthorRequest)
  }

  deleteAuthor(id: string): Observable<any> {
    return this._http.delete<any>(`${this.baseUrl}/${id}`)
  }

}

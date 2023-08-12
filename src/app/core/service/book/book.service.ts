import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BookAuthorInfoDto} from "../../interface/author/book-author-info-dto";
import {BookDto} from "../../interface/book/book-dto";
import {AuthorDetails} from "../../interface/author/author-details";

@Injectable({
  providedIn: 'root'
})
export class BookService {
  baseUrl: string = `${environment.apiUrl}/books`;

  constructor(private _http: HttpClient) {
  }

  getAllBooks(): Observable<BookDto[]> {
    return this._http.get<BookDto[]>(`${this.baseUrl}`);
  }

  getBookById(id: string): Observable<BookDto> {
    return this._http.get<BookDto>(`${this.baseUrl}/${id}`);
  }

  getAllGenres(): Observable<string[]> {
    return this._http.get<string[]>(`${this.baseUrl}/genres`)
  }

}

import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BookDto} from "../../interface/book/book-dto";

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

  getPageableBooks(page: number, nameSearch: string, genre: string): Observable<BookDto[]> {
    let genres = []
    genres.push(genre)
    return this._http.get<BookDto[]>(`${this.baseUrl}/filter`,
      {params: {page: page, pageSize: 10, nameSearch: nameSearch, genres: genres} });
  }

  getBookById(id: string): Observable<BookDto> {
    return this._http.get<BookDto>(`${this.baseUrl}/${id}`);
  }

  getAllGenres(): Observable<string[]> {
    return this._http.get<string[]>(`${this.baseUrl}/genres`)
  }

}

import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BookDto} from "../../interface/book/book-dto";
import {BookPdfUrl} from "../../interface/book/BookPdfUrl";

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

  addBook(bookDto: BookDto): Observable<BookDto> {
    return this._http.post<BookDto>(`${this.baseUrl}`, bookDto)
  }
  updateBook(bookDto: BookDto): Observable<BookDto> {
    return this._http.put<BookDto>(`${this.baseUrl}/${bookDto.id}`, bookDto)
  }

  getBookPdfUrl(bookId: string): Observable<BookPdfUrl> {
    return this._http.get<BookPdfUrl>(`${this.baseUrl}/${bookId}/preview`)
  }

}

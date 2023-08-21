import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Bookshop } from '../interface/bookshop';
import { BookshopBook } from '../interface/bookshop-book';

@Injectable({
  providedIn: 'root',
})
export class BookshopService {
  baseUrl: string = `${environment.apiUrl}/bookshops`;
  constructor(private http: HttpClient) {}

  getAllBookshops(): Observable<Bookshop[]> {
    return this.http.get<Bookshop[]>(this.baseUrl);
  }

  getBookshopById(bookshopId: string): Observable<Bookshop> {
    return this.http.get<Bookshop>(`${this.baseUrl}/${bookshopId}`);
  }

  getBooksForBookshop(bookshopId: string): Observable<BookshopBook[]> {
    return this.http.get<BookshopBook[]>(`${this.baseUrl}/${bookshopId}/books`);
  }
}

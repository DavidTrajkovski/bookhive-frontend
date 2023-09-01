import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { LibraryBook } from '../interface/my-library/library-book';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  baseUrl: string = `${environment.apiUrl}/my-library`;

  constructor(private http: HttpClient) {}

  getLibraryBooks(): Observable<LibraryBook[]> {
    return this.http.get<LibraryBook[]>(this.baseUrl);
  }

  addBooksToLibrary(bookIds: string[]): Observable<any> {
    return this.http.post(this.baseUrl, {
      bookIds: bookIds,
    });
  }

  editLastPageRead(userId: string, bookId: string, lastPageRead: number) {
    return this.http
      .put(this.baseUrl, {
        userId: userId,
        bookId: bookId,
        lastPageRead: lastPageRead,
      })
      .subscribe();
  }
}

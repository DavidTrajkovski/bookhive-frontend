import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { BookClub } from '../interface/bookclub/bookclub';

@Injectable({
  providedIn: 'root',
})
export class BookclubService {
  baseUrl: string = `${environment.apiUrl}/bookclubs`;

  constructor(private http: HttpClient) {}

  getAllBookClubs(): Observable<BookClub[]> {
    return this.http.get<BookClub[]>(this.baseUrl);
  }

  getBookClubById(bookclubId: string): Observable<BookClub> {
    return this.http.get<BookClub>(`${this.baseUrl}/${bookclubId}`);
  }
}

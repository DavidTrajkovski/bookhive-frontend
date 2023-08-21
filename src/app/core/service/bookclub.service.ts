import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { BookClub } from '../interface/bookclub/bookclub';
import { Topic } from '../interface/bookclub/topic';
import { Member } from '../interface/bookclub/member';

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

  getTopicsForBookClub(bookclubId: string): Observable<Topic[]> {
    return this.http.get<Topic[]>(`${this.baseUrl}/${bookclubId}/topics`);
  }

  getMembersForBookClub(bookclubId: string): Observable<Member[]> {
    return this.http.get<Member[]>(`${this.baseUrl}/${bookclubId}/members`);
  }

  removeMemberFromBookClub(bookclubId: string, memberId: string): void {
    this.http
      .delete(`${this.baseUrl}/${bookclubId}/members/${memberId}`)
      .subscribe();
  }
}

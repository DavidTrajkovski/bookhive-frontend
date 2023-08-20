import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Invitation } from '../interface/bookclub/invitation';
import { CreateNewInvitation } from '../interface/bookclub/create-new-invitation';

@Injectable({
  providedIn: 'root',
})
export class InvitationService {
  baseUrl: string = `${environment.apiUrl}/invitations`;
  constructor(private http: HttpClient) {}

  getUserInvitations(): Observable<Invitation[]> {
    return this.http.get<Invitation[]>(this.baseUrl);
  }

  getUserInvitationsCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }

  getMembershipRequestsForBookClub(
    bookclubId: string
  ): Observable<Invitation[]> {
    return this.http.get<Invitation[]>(
      `${this.baseUrl}/${bookclubId}/membership-requests`
    );
  }

  getRequestsCountForBookClub(bookclubId: string): Observable<number> {
    return this.http.get<number>(
      `${this.baseUrl}/${bookclubId}/requests-count`
    );
  }

  requestBookClubMembership(bookclubId: string): void {
    this.http
      .post(`${this.baseUrl}/${bookclubId}/request-membership`, '')
      .subscribe();
  }

  sendInvitation(newInvitation: CreateNewInvitation): void {
    this.http
      .post(`${this.baseUrl}/send-invitation`, newInvitation)
      .subscribe();
  }

  acceptInvtitation(invitationId: string): void {
    this.http
      .post(`${this.baseUrl}/${invitationId}/accept-invitation`, '')
      .subscribe();
  }

  declineInvitation(invitationId: string): void {
    this.http
      .delete(`${this.baseUrl}/${invitationId}/decline-invitation`)
      .subscribe();
  }

  acceptRequest(invitationId: string): void {
    this.http
      .post(`${this.baseUrl}/${invitationId}/accept-request`, '')
      .subscribe();
  }

  declineRequest(invitationId: string): void {
    this.http
      .delete(`${this.baseUrl}/${invitationId}/decline-request`)
      .subscribe();
  }
}

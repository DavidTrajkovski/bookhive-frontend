import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProfileRequest } from '../../interface/authorization/profile-request';
import { ProfileResponse } from '../../interface/authorization/profile-response';
import { environment } from '../../../../environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  path: string = `${environment.apiUrl}/accountapi/edit`;
  constructor(private _http: HttpClient) {}

  updateProfile(profileRequest: ProfileRequest): Observable<ProfileResponse> {
    return this._http.post<ProfileResponse>(`${this.path}`, profileRequest);
  }

  getBookHiveUserEmails(): Observable<string[]> {
    return this._http.get<string[]>(`${environment.apiUrl}/accountapi/emails`);
  }
}

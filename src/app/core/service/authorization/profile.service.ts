import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ProfileRequest } from '../../interface/authorization/profile-request';
import { ProfileResponse } from '../../interface/authorization/profile-response';
import { environment } from '../../../../environments/environment.development';
import {AuthService} from "../authentication/auth.service";
import {User} from "../../interface/user";
@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private _http: HttpClient,
              private authService: AuthService) {
    this.getAuthenticatedUserDetails()
  }


  getAuthenticatedUserDetails(){
    return this._http.get<User>(`${environment.apiUrl}/accountapi/user`)
  }

  updateProfile(profileRequest: ProfileRequest): Observable<ProfileResponse> {
    let token = this.authService.jwtToken;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const options = { headers: headers };

    return this._http.post<ProfileResponse>(`${environment.apiUrl}/accountapi/edit`, profileRequest, options);
  }

  getBookHiveUserEmails(): Observable<string[]> {
    return this._http.get<string[]>(`${environment.apiUrl}/accountapi/emails`);
  }
}

import { Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../../interface/authorization/login-request';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { environment } from 'src/environments/environment.development';
import { LoginResponse } from '../../interface/authorization/login-response';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  baseUrl: string = `${environment.apiUrl}/login`;
  constructor(
    private _http: HttpClient,
    private localStorageService: LocalStorageService,
    private jwtService: JwtService
  ) {}

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this._http.post<LoginResponse>(`${this.baseUrl}`, loginRequest).pipe(
      tap((data) => {
        this.localStorageService.setItem('TOKEN', data.token);
        this.jwtService.setToken(data.token);
      })
    );
  }
}

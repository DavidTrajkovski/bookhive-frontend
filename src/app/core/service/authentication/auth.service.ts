import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../../interface/authorization/login-request';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { environment } from 'src/environments/environment.development';
import { LoginResponse } from '../../interface/authorization/login-response';
import { RegisterRequest } from '../../interface/authorization/register-request';
import * as moment from 'moment';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = `${environment.apiUrl}`;
  jwtToken: string | null = this.localStorageService.getItem('TOKEN');
  decodedToken: { [key: string]: string } = {};

  constructor(
    private _http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this._http
      .post<LoginResponse>(`${this.baseUrl}/login`, loginRequest)
      .pipe(
        tap((data) => {
          this.localStorageService.setItem('TOKEN', data.token);
          this.setToken(data.token);
        })
      );
  }

  register(registerRequest: RegisterRequest): Observable<number> {
    return this._http.post<number>(`${this.baseUrl}/register`, registerRequest);
  }

  setToken(token: string): void {
    if (token) {
      this.jwtToken = token;
    }
  }

  decodeToken(): void {
    if (this.jwtToken) {
      this.decodedToken = jwt_decode(this.jwtToken);
    }
  }

  getDecodeToken(): unknown {
    return jwt_decode(this.jwtToken ?? '');
  }

  getUserId(): string | null {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['id'] : null;
  }

  getUserName(): string | null {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['name'] : null;
  }

  getEmail(): string | null {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['email'] : null;
  }

  getUserRole(): string | null {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['role'] : null;
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'Administrator';
  }

  getExpiryTime(): string | null {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['exp'] : null;
  }

  logout(): void {
    this.localStorageService.setItem('TOKEN', null);
  }

  isLoggedIn(): boolean {
    if (!this.jwtToken) return false;
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  private getExpiration(): moment.Moment {
    this.decodeToken();
    const expiresAt = JSON.parse(this.decodedToken['exp']);
    return moment(new Date(expiresAt * 1000));
  }
}

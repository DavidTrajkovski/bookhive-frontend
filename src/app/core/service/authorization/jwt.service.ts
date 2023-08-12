import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import * as moment from 'moment';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  jwtToken: string | null = this.localStorageService.getItem('TOKEN');
  decodedToken: { [key: string]: string } = {};

  constructor(private localStorageService: LocalStorageService) {}

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

  getUserName(): string | null {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['name'] : null;
  }

  getEmail(): string | null {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['email'] : null;
  }

  getExpiryTime(): string | null {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['exp'] : null;
  }

  logout(): void {
    this.localStorageService.setItem('TOKEN', null);
  }

  isLoggedIn(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  getExpiration(): moment.Moment {
    this.decodeToken();
    const expiresAt = JSON.parse(this.decodedToken['exp']);
    return moment(new Date(expiresAt * 1000));
  }
}

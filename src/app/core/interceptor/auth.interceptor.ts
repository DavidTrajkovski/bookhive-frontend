import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../service/authentication/auth.service';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const authToken = this.authService.jwtToken;
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    console.log(environment.apiUrl);

    if (authToken && isApiUrl) {
      const authReq = request.clone({
        setHeaders: { Authorization: `Bearer ${authToken}` },
      });

      return next.handle(authReq);
    }

    return next.handle(request);
  }
}

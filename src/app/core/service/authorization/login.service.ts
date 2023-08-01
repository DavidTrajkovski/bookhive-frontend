
import { Observable } from 'rxjs';
import {RegisterRequest} from "../../interface/authorization/register-request";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LoginRequest} from "../../interface/authorization/login-request";
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  path = 'api/login';
  constructor(private _http: HttpClient) {
  }

  register(loginRequest: LoginRequest): Observable<number> {
    return this._http.post<number>(`${this.path}`, loginRequest);
  }

}

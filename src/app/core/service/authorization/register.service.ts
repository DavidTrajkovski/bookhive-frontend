
import { Observable } from 'rxjs';
import {RegisterRequest} from "../../interface/authorization/register-request";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class  RegisterService {
  path = 'api/register';
  constructor(private _http: HttpClient) {
  }

  register(registerRequest: RegisterRequest): Observable<number> {
    return this._http.post<number>(`${this.path}`, registerRequest);
  }

}

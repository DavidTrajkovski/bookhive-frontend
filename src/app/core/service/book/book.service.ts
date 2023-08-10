import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BookService {
  path = 'api/books';

  constructor(private _http: HttpClient) {
  }


}

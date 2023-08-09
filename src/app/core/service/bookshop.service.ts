import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Bookshop } from '../interface/bookshop';

@Injectable({
  providedIn: 'root',
})
export class BookshopService {
  URL: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getAllBookshops(): Observable<Bookshop[]> {
    console.log(`${this.URL}/bookshops`);
    return this.http.get<Bookshop[]>(`${this.URL}/bookshops`);
  }
}

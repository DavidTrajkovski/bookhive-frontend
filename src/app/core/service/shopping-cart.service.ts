import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ShoppingCartInfo } from '../interface/shopping-cart/shopping-cart-info';
import { AddToCard } from '../interface/shopping-cart/add-to-cart';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  baseUrl: string = `${environment.apiUrl}/shopping-cart`;

  constructor(private http: HttpClient) {}

  getShoppingCartInfo(): Observable<ShoppingCartInfo> {
    return this.http.get<ShoppingCartInfo>(this.baseUrl);
  }

  addBookToShoppingCart(addBookToShoppingCart: AddToCard): Observable<boolean> {
    return this.http.post<boolean>(
      `${this.baseUrl}/add`,
      addBookToShoppingCart
    );
  }

  removeBookFromShoppingCart(bookId: string) {
    this.http.delete(this.baseUrl, { params: { bookId: bookId } }).subscribe();
  }

  payNow() {
    // TODO: Impl
  }
}

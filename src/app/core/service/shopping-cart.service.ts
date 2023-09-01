import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ShoppingCartInfo } from '../interface/shopping-cart/shopping-cart-info';
import { AddToCart } from '../interface/shopping-cart/add-to-cart';
import { PaymentIntent } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  baseUrl: string = `${environment.apiUrl}/shopping-cart`;

  constructor(private http: HttpClient) {}

  getShoppingCartInfo(): Observable<ShoppingCartInfo> {
    return this.http.get<ShoppingCartInfo>(this.baseUrl);
  }

  addBookToShoppingCart(addBookToShoppingCart: AddToCart): Observable<boolean> {
    return this.http.post<boolean>(
      `${this.baseUrl}/add`,
      addBookToShoppingCart
    );
  }

  createPaymentIntent(amount: number): Observable<PaymentIntent> {
    return this.http.post<PaymentIntent>(
      `${this.baseUrl}/create-payment-intent`,
      {
        amount: amount,
      }
    );
  }

  removeBookFromShoppingCart(bookId: string) {
    this.http.delete(this.baseUrl, { params: { bookId: bookId } }).subscribe();
  }

  clearShoppingCart() {
    this.http.delete(`${this.baseUrl}/clear`).subscribe();
  }
}

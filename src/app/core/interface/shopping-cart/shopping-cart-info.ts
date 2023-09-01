import { ShoppingCartBook } from './shopping-cart-book';

export interface ShoppingCartInfo {
  books: ShoppingCartBook[];
  totalPrice: number;
}

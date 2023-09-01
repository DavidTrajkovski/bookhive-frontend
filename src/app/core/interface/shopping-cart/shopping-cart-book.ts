import { Book } from '../book';
import { ShoppingCart } from './shopping-cart';

export interface ShoppingCartBook {
  book: Book;
  shoppingCart: ShoppingCart;
  quantity: number;
}

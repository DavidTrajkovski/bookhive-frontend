import { User } from '../user';
import { ShoppingCartBook } from './shopping-cart-book';

export interface ShoppingCart {
  ownerId: string;
  owner: User;
  books: ShoppingCartBook[];
}

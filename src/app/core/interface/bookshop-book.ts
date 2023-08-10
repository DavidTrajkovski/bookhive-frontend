import { BookAuthorInfo } from './book-author-info';

export interface BookshopBook {
  id: string;
  name: string;
  price: number;
  authors: BookAuthorInfo[];
}

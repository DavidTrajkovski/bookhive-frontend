import { Book } from '../book';

export interface LibraryBook {
  userId: string;
  book: Book;
  lastPageRead: number;
}

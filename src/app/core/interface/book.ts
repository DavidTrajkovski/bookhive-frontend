import { BookAuthorInfo } from "./book-author-info";

export interface Book {
  id: string;
  isbn: string;
  name: string;
  description: string;
  datePublished: Date;
  coverImageUrl: string;
  price: number;
  totalPages: number;
  isValid: boolean;
  genres: string[];
  authors: BookAuthorInfo[];
}

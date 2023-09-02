import {BookAuthorInfoDto} from "../author/book-author-info-dto";

export interface BookDto {
  id: string,
  isbn: string,
  name: string,
  description: string,
  datePublished: Date,
  coverImageUrl: string,
  pdfUrl: string,
  price: number,
  totalPages: number,
  isValid: boolean,
  genres: string[],
  authors: BookAuthorInfoDto[],
  authorIds: string[]
}

import {BookDto} from "./book-dto";

export interface BookFilterResult {
  bookDtos: BookDto[],
  totalBooksCount: number
}

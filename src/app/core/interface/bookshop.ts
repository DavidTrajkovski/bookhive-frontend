import { Book } from "./book";

export interface Bookshop {
  id: string;
  name: string;
  city: string;
  address: string;
  bookshopEmail: string;
  phoneNumber: string;
  websiteLink: string;
  latitude: number;
  longitude: number;
  grade: number;
  numOfGraders: number;
  books: Book[];
}

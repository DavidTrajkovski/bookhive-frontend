import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {LocalStorageService} from "../../shared/services/local-storage.service";
import {Observable} from "rxjs";
import {BookDto} from "../interface/book/book-dto";
import {Topic} from "../interface/bookclub/topic";
import {WishlistDto} from "../interface/my-wishlist/wishlist-dto";

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  baseUrl: string = `${environment.apiUrl}/accountapi`;

  constructor(
    private _http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  getBooksFromMyWishList(id: string): Observable<BookDto[]> {
    return this._http.get<BookDto[]>(`${this.baseUrl}/my-wishlist/${id}`);
  }

  addBookToMyWishList(wishlistDto: WishlistDto): Observable<any> {
    return this._http.post<any>(`${this.baseUrl}/my-wishlist`, wishlistDto);
  }

  removeBookFromMyWishList(wishlistDto: WishlistDto): Observable<any> {
    return this._http.delete<any>(`${this.baseUrl}/my-wishlist`,
      { params: { userId: wishlistDto.userId, bookId: wishlistDto.bookId } }
    );
  }

}

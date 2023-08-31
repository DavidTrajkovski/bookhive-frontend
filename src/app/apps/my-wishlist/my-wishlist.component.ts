import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../core/service/authentication/auth.service";
import {BookDto} from "../../core/interface/book/book-dto";
import {WishlistService} from "../../core/service/wishlist.service";
import {WishlistDto} from "../../core/interface/my-wishlist/wishlist-dto";
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'app-my-wishlist',
  templateUrl: './my-wishlist.component.html',
  styleUrls: ['./my-wishlist.component.scss']
})
export class MyWishlistComponent implements OnInit{

  userId: string | null
  myBooks: BookDto[] = []
  isLoading: boolean = false
  constructor(private _authService: AuthService,
              private _wishlistService: WishlistService,
              private _notifierService: NotifierService) {
    this.userId = _authService.getUserId()
  }
  ngOnInit(): void {
    if (this.userId != null) {
      this.getMyBooksFromWishList()
    }
  }

  getMyBooksFromWishList() {
    this.isLoading = true
    this._wishlistService.getBooksFromMyWishList(this.userId!).subscribe({
      next: (data) => {
        this.myBooks = data
        this.isLoading = false
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  removeBookFromMyWishList(bookId: string) {
    if (this.userId != null) {
      const wishlistDto = {
        userId: this.userId,
        bookId: bookId
      } as WishlistDto;
      this._wishlistService.removeBookFromMyWishList(wishlistDto).subscribe({
        next: () => {
          this._notifierService.notify('success','Successfully removed from wishlist')
          this.getMyBooksFromWishList()
        },
        error: (err) => {
          this._notifierService.notify('error','Error occurred while removing book from wishlist')
        }
      })
    }
  }

}

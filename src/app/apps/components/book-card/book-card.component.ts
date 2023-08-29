import {Component, Input} from '@angular/core';
import {BookDto} from "../../../core/interface/book/book-dto";
import {NotifierService} from "angular-notifier";
import {WishlistService} from "../../../core/service/wishlist.service";
import {AuthService} from "../../../core/service/authentication/auth.service";
import {WishlistDto} from "../../../core/interface/my-wishlist/wishlist-dto";

@Component({
  selector: 'bh-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent {
  @Input() book?: BookDto;
  userId: string | null;
  constructor(private _notifierService: NotifierService,
              private _wishlistService: WishlistService,
              private _authService: AuthService) {
    this.userId = _authService.getUserId();
  }
  addBookToMyWishList(bookId: string) {
    if (this.userId != null) {
      const wishlistDto = {
        userId: this.userId,
        bookId: bookId
      } as WishlistDto;
      this._wishlistService.addBookToMyWishList(wishlistDto).subscribe({
        next: () => {
          this._notifierService.notify('success','Successfully added to wishlist!')
        },
        error: (err) => {
          this._notifierService.notify('success','Error adding book to wishlist!')
        }
      })
    }
  }

  openAddToCartDialog(bookId: string) {
    //logic todo after marko completes task for add to cart dialog
  }
}

import { Component, Input } from '@angular/core';
import { BookDto } from '../../../core/interface/book/book-dto';
import { NotifierService } from 'angular-notifier';
import { WishlistService } from '../../../core/service/wishlist.service';
import { AuthService } from '../../../core/service/authentication/auth.service';
import { WishlistDto } from '../../../core/interface/my-wishlist/wishlist-dto';
import { ShoppingCartService } from 'src/app/core/service/shopping-cart.service';
import { AddToCart } from 'src/app/core/interface/shopping-cart/add-to-cart';

@Component({
  selector: 'bh-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent {
  @Input() book?: BookDto;
  userId: string | null;
  constructor(
    private _notifierService: NotifierService,
    private _wishlistService: WishlistService,
    private _authService: AuthService,
    private _shoppingCartService: ShoppingCartService
  ) {
    this.userId = _authService.getUserId();
  }
  addBookToMyWishList(bookId: string) {
    if (this.userId != null) {
      const wishlistDto = {
        userId: this.userId,
        bookId: bookId,
      } as WishlistDto;
      this._wishlistService.addBookToMyWishList(wishlistDto).subscribe({
        next: () => {
          this._notifierService.notify(
            'success',
            'Successfully added to wishlist!'
          );
        },
        error: (_) => {
          this._notifierService.notify(
            'error',
            'Error adding book to wishlist!'
          );
        },
      });
    }
  }

  addBookToShoppingCart() {
    const addToCardObj: AddToCart = {
      bookId: this.book?.id!,
      quantity: 1,
    };
    this._shoppingCartService.addBookToShoppingCart(addToCardObj).subscribe({
      next: (bookAddedToCart) => {
        if (bookAddedToCart) {
          this._notifierService.notify(
            'success',
            `"${this.book?.name}" added to cart!`
          );
        } else {
          this._notifierService.notify(
            'error',
            `"${this.book?.name}" is already in your cart!`
          );
        }
      },
      error: (_) => {
        this._notifierService.notify('error', 'Error adding book to cart!');
      },
    });
  }
}

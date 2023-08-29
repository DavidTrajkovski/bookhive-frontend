import { Component } from '@angular/core';
import { ShoppingCartInfo } from 'src/app/core/interface/shopping-cart/shopping-cart-info';
import { ShoppingCartService } from 'src/app/core/service/shopping-cart.service';
import { CurrencyPipe, Location } from '@angular/common';

@Component({
  selector: 'app-shopping-cart-details',
  templateUrl: './shopping-cart-details.component.html',
  styleUrls: ['./shopping-cart-details.component.scss'],
})
export class ShoppingCartDetailsComponent {
  shoppingCartInfo?: ShoppingCartInfo;
  isLoading: boolean = true;

  constructor(private _shoppingCartService: ShoppingCartService, private _location: Location) {}

  ngOnInit() {
    this.getShoppingCartInfo();
  }

  getShoppingCartInfo() {
    this._shoppingCartService.getShoppingCartInfo().subscribe({
      next: (data) => {
        this.shoppingCartInfo = data;
        this.isLoading = false;
      },
      error: (err) => console.error(err),
    });
  }

  removeBook(bookId: string) {
    this._shoppingCartService.removeBookFromShoppingCart(bookId);
    this.getShoppingCartInfo();
    location.reload();
  }

  checkout() {
    alert('AAAAAAAAA');
  }

  goBack() {
    this._location.back();
  }
}

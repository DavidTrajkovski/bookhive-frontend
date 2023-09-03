import { Component } from '@angular/core';
import { ShoppingCartInfo } from 'src/app/core/interface/shopping-cart/shopping-cart-info';
import { ShoppingCartService } from 'src/app/core/service/shopping-cart.service';
import { CurrencyPipe, Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { PaymentDialog } from '../payment-dialog/payment-dialog/payment-dialog.component';

@Component({
  selector: 'app-shopping-cart-details',
  templateUrl: './shopping-cart-details.component.html',
  styleUrls: ['./shopping-cart-details.component.scss'],
})
export class ShoppingCartDetailsComponent {
  shoppingCartInfo?: ShoppingCartInfo;
  isLoading: boolean = true;

  constructor(
    private _shoppingCartService: ShoppingCartService,
    private _location: Location,
    public dialog: MatDialog
  ) {}

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
    if (confirm('Are you sure you want to remove the item from your cart?')) {
      this._shoppingCartService.removeBookFromShoppingCart(bookId);
      this.isLoading = true;
      console.log(this.shoppingCartInfo);
      this.getShoppingCartInfo();
      location.reload();
    }
  }

  checkout() {
    this.dialog
      .open(PaymentDialog, {
        data: {
          totalAmountToPay: this.shoppingCartInfo?.totalPrice,
        },
      })
      .afterClosed()
      .subscribe((_) => location.reload());
  }

  goBack() {
    this._location.back();
  }
}

import { Component } from '@angular/core';
import { ShoppingCartInfo } from 'src/app/core/interface/shopping-cart/shopping-cart-info';
import { ShoppingCartService } from 'src/app/core/service/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart-details',
  templateUrl: './shopping-cart-details.component.html',
  styleUrls: ['./shopping-cart-details.component.scss'],
})
export class ShoppingCartDetailsComponent {
  shoppingCartInfo?: ShoppingCartInfo;
  isLoading: boolean = true;

  constructor(private _shoppingCartService: ShoppingCartService) {}

  ngOnInit() {
    this.getShoppingCartInfo();
  }

  getShoppingCartInfo() {
    this._shoppingCartService.getShoppingCartInfo().subscribe({
      next: (data) => {
        this.shoppingCartInfo = data;
        console.log(this.shoppingCartInfo);
        this.isLoading = false;
      },
      error: (err) => console.error(err),
    });
  }
}

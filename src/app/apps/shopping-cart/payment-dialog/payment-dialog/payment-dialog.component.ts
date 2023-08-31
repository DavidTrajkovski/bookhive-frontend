import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

import { StripeService, StripeCardNumberComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import { AuthService } from 'src/app/core/service/authentication/auth.service';
import { NotifierService } from 'angular-notifier';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ShoppingCartService } from 'src/app/core/service/shopping-cart.service';
import { StripeVariables } from 'src/app/apps/configs/stripe-options';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'bh-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.scss'],
})
export class PaymentDialog implements OnInit {
  @ViewChild(StripeCardNumberComponent) card:
    | StripeCardNumberComponent
    | undefined;

  cardOptions: StripeCardElementOptions = StripeVariables.cardOptions;

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };

  stripeTest: FormGroup | undefined;

  isProcessing: boolean = false;

  constructor(
    private _dialogRef: MatDialogRef<PaymentDialog>,
    @Inject(MAT_DIALOG_DATA)
    public data: { totalAmountToPay: number },
    private shoppingCartService: ShoppingCartService,
    private formBuilder: FormBuilder,
    private stripeService: StripeService,
    private authService: AuthService,
    private notifierService: NotifierService
  ) {}

  ngOnInit(): void {
    this.stripeTest = this.formBuilder.group({
      name: [this.authService.getUserName(), [Validators.required]],
    });
  }

  pay(): void {
    if (this.stripeTest!.valid) {
      this.isProcessing = true;
      this.shoppingCartService
        .createPaymentIntent(this.data.totalAmountToPay)
        .pipe(
          switchMap((pi) =>
            this.stripeService.confirmCardPayment(pi.client_secret!, {
              payment_method: {
                card: this.card!.element,
                billing_details: {
                  name: this.stripeTest!.get('name')!.value,
                },
              },
            })
          )
        )
        .subscribe({
          next: (result) => {
            if (
              result.paymentIntent !== undefined &&
              result.paymentIntent.status === 'succeeded'
            ) {
              this.notifierService.notify(
                'success',
                'Payment accepted! New books added to your library.'
              );
              this.shoppingCartService.clearShoppingCart();
            }
            this._dialogRef.close();
            this.isProcessing = false;
          },
          error: (result) => {
            console.error(result);
            this.notifierService.notify(
              'error',
              'Payment failed! Error while processing.'
            );
            this._dialogRef.close();
            this.isProcessing = false;
          },
        });
    }
  }
}

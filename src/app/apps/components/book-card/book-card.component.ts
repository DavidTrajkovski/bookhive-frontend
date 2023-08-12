import { Component } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'bh-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent {
  showMore = false;

  constructor(private snackBar: MatSnackBar) {

  }
  addToFavourites() {
    //logic
    this.snackBar.open('Book added to favourites', 'Close', {
      duration: 2000, // Duration in milliseconds
    });
  }

  openAddToCartDialog() {
    //logic
  }
}

import { Component, OnInit } from '@angular/core';
import { Bookshop } from 'src/app/core/interface/bookshop';
import { BookshopService } from 'src/app/core/service/bookshop.service';

@Component({
  selector: 'app-bookshops',
  templateUrl: './bookshops.component.html',
  styleUrls: ['./bookshops.component.scss'],
})
export class BookshopsComponent implements OnInit {
  bookshops: Bookshop[] = [];
  bookshopsAreLoading: boolean = true;

  constructor(private bookshopService: BookshopService) {}

  ngOnInit(): void {
    this.getAllBookshops();
  }

  getAllBookshops() {
    this.bookshopService.getAllBookshops().subscribe({
      next: (data) => {
        this.bookshops = data;
        this.bookshopsAreLoading = false;
      },
      error: (err) => console.error(err),
    });
  }
}

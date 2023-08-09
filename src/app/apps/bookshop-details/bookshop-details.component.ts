import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bookshop } from 'src/app/core/interface/bookshop';
import { BookshopService } from 'src/app/core/service/bookshop.service';
import { RouteConstants } from 'src/app/shared/RouteConstants';

@Component({
  selector: 'bh-bookshop-details',
  templateUrl: './bookshop-details.component.html',
  styleUrls: ['./bookshop-details.component.scss'],
})
export class BookshopDetailsComponent implements OnInit {
  bookshopId: string = '';
  bookshops: Bookshop[] = [];

  constructor(
    private route: ActivatedRoute,
    private bookshopService: BookshopService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.bookshopId = params[RouteConstants.BOOKSHOPS_ID];
    });
    console.log(this.getAllBookshops())
  }

  getAllBookshops() {
    this.bookshopService.getAllBookshops().subscribe({
      next: (data) => {
        this.bookshops = data;
        console.log(this.bookshops);
      },
      error: (err) => console.error(err),
    });
  }
}

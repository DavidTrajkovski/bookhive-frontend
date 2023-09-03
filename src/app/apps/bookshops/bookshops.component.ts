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
  filteredBookshops: Bookshop[] = [];
  bookshopsAreLoading: boolean = true;

  constructor(private bookshopService: BookshopService) {}

  ngOnInit(): void {
    this.getAllBookshops();
  }

  queryBookshopsByName(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue === '') {
      console.log(filterValue);
      this.filteredBookshops = this.bookshops;
    } else {
      this.filteredBookshops = this.bookshops.filter((item) =>
        item.name.toLowerCase().includes(filterValue.trim().toLowerCase())
      );
    }
  }

  getAllBookshops() {
    this.bookshopService.getAllBookshops().subscribe({
      next: (data) => {
        this.bookshops = data;
        this.filteredBookshops = this.bookshops;
        this.bookshopsAreLoading = false;
      },
      error: (err) => console.error(err),
    });
  }
}

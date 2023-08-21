import { Component } from '@angular/core';
import { BookClub } from 'src/app/core/interface/bookclub/bookclub';
import { BookclubService } from 'src/app/core/service/bookclub.service';

@Component({
  selector: 'app-bookclubs-page',
  templateUrl: './bookclubs.component.html',
  styleUrls: ['./bookclubs.component.scss'],
})
export class BookclubsComponent {
  bookclubs: BookClub[] = [];
  filteredBookclubs: BookClub[] = [];
  bookclubsAreLoading: boolean = true;

  constructor(private bookclubService: BookclubService) {}

  ngOnInit(): void {
    this.getAllBookshops();
  }

  queryBookClubsByName(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue === '') {
      this.filteredBookclubs = this.bookclubs;
    } else {
      this.filteredBookclubs = this.bookclubs.filter((item) =>
        item.name.toLowerCase().includes(filterValue.trim().toLowerCase())
      );
    }
  }

  getAllBookshops() {
    this.bookclubService.getAllBookClubs().subscribe({
      next: (data) => {
        this.bookclubs = data;
        this.filteredBookclubs = this.bookclubs;
        this.bookclubsAreLoading = false;
      },
      error: (err) => console.error(err),
    });
  }
}

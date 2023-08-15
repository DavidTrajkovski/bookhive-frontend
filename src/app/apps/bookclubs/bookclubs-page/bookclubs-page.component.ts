import { Component } from '@angular/core';
import { BookClub } from 'src/app/core/interface/bookclub/bookclub';
import { BookclubService } from 'src/app/core/service/bookclub.service';

@Component({
  selector: 'app-bookclubs-page',
  templateUrl: './bookclubs-page.component.html',
  styleUrls: ['./bookclubs-page.component.scss']
})
export class BookclubsPageComponent {
  bookclubs: BookClub[] = [];
  bookclubsAreLoading: boolean = true;

  constructor(private bookclubService: BookclubService) {}

  ngOnInit(): void {
    this.getAllBookshops();
  }

  getAllBookshops() {
    this.bookclubService.getAllBookClubs().subscribe({
      next: (data) => {
        this.bookclubs = data;
        this.bookclubsAreLoading = false;
      },
      error: (err) => console.error(err),
    });
  }
}

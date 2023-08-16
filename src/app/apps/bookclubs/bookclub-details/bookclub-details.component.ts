import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookClub } from 'src/app/core/interface/bookclub/bookclub';
import { Topic } from 'src/app/core/interface/bookclub/topic';
import { BookclubService } from 'src/app/core/service/bookclub.service';
import { RouteConstants } from 'src/app/shared/RouteConstants';

@Component({
  selector: 'app-bookclub-details',
  templateUrl: './bookclub-details.component.html',
  styleUrls: ['./bookclub-details.component.scss'],
})
export class BookclubDetailsComponent {
  bookclubId: string = '';
  bookclub?: BookClub;
  bookclubIsLoading: boolean = true;

  topics: Topic[] = [];
  topicsAreLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private bookclubService: BookclubService
  ) {}

  ngOnInit(): void {
    this.getBookClubIdFromPath();
    this.getBookClubById();
    this.getTopicsForBookClub();
  }

  getBookClubIdFromPath() {
    this.route.params.subscribe((params) => {
      this.bookclubId = params[RouteConstants.BOOKCLUB_ID];
    });
  }

  getBookClubById() {
    this.bookclubService.getBookClubById(this.bookclubId).subscribe({
      next: (data) => {
        this.bookclub = data;
        this.bookclubIsLoading = false;
      },
      error: (err) => console.error(err),
    });
  }

  getTopicsForBookClub() {
    this.bookclubService.getTopicsForBookClub(this.bookclubId).subscribe({
      next: (data) => {
        this.topics = data;
        this.topicsAreLoading = false;
        console.log(this.topics);
      },
      error: (err) => console.error(err),
    });
  }
}

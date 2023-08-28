import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookClub } from 'src/app/core/interface/bookclub/bookclub';
import { BookclubService } from 'src/app/core/service/bookclub.service';
import { BookclubDialog } from '../../components/dialogues/bookclub-dialog/bookclub-dialog.component';

@Component({
  selector: 'app-bookclubs-page',
  templateUrl: './bookclubs.component.html',
  styleUrls: ['./bookclubs.component.scss'],
})
export class BookclubsComponent {
  bookclubs: BookClub[] = [];
  filteredBookclubs: BookClub[] = [];
  bookclubsAreLoading: boolean = true;

  constructor(
    private bookclubService: BookclubService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllBookClubs();
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

  getAllBookClubs() {
    this.bookclubService.getAllBookClubs().subscribe({
      next: (data) => {
        this.bookclubs = data;
        this.filteredBookclubs = this.bookclubs;
        this.bookclubsAreLoading = false;
      },
      error: (err) => console.error(err),
    });
  }

  openBookClubDialog() {
    const dialog = this.dialog.open(BookclubDialog, {
      data: {
        bookclubId: null,
      },
      height: '600px',
      width: '600px',
      autoFocus: false,
    });
    dialog.afterClosed().subscribe((_) => {
      this.bookclubsAreLoading = true;
      this.getAllBookClubs();
    });
  }
}

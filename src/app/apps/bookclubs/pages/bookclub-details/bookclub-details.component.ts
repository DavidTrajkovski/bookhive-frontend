import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BookClub } from 'src/app/core/interface/bookclub/bookclub';
import { Topic } from 'src/app/core/interface/bookclub/topic';
import { BookclubService } from 'src/app/core/service/bookclub.service';
import { RouteConstants } from 'src/app/shared/RouteConstants';
import { SendInvitationDialog } from '../../components/dialogues/send-invitation/send-invitation.component';
import { BookclubDialog } from '../../components/dialogues/bookclub-dialog/bookclub-dialog.component';
import { TopicDialog } from '../../components/dialogues/topic-dialog/topic-dialog.component';

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
    private bookclubService: BookclubService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getBookClubIdFromPath();
    this.getBookClubById();
    this.getTopicsForBookClub();
  }

  openSendInvitationDialog() {
    const dialogRef = this.dialog.open(SendInvitationDialog, {
      data: { bookclubId: this.bookclubId },
    });
    dialogRef.componentInstance.bookclubId = this.bookclubId;
  }

  openBookClubDialog() {
    const dialog = this.dialog.open(BookclubDialog, {
      data: {
        bookclubId: this.bookclubId,
      },
      height: '600px',
      width: '600px',
      autoFocus: false,
    });
    dialog.afterClosed().subscribe((_) => {
      this.bookclubIsLoading = true;
      this.getBookClubById();
    });
  }

  openTopicDialog() {
    const dialog = this.dialog.open(TopicDialog, {
      data: {
        topicId: null,
        bookclubId: this.bookclubId,
      },
      height: '600px',
      width: '600px',
      autoFocus: false,
    });
    dialog.afterClosed().subscribe((_) => {
      this.topicsAreLoading = true;
      this.getTopicsForBookClub();
    });
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
        console.log(this.topics);
        this.topicsAreLoading = false;
      },
      error: (err) => console.error(err),
    });
  }
}

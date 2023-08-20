import { Component, Input, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { BookClub } from 'src/app/core/interface/bookclub/bookclub';
import { InvitationService } from 'src/app/core/service/invitation.service';

@Component({
  selector: 'bh-bookclub-card',
  templateUrl: './bookclub-card.component.html',
  styleUrls: ['./bookclub-card.component.scss'],
})
export class BookclubCardComponent {
  @Input() bookclub?: BookClub;

  constructor(
    private invitationService: InvitationService,
    private snackBar: MatSnackBar
  ) {}

  requestBookClubMembership(bookclubId: string | undefined) {
    if (bookclubId) {
      this.invitationService.requestBookClubMembership(bookclubId);
      this.openSnackBar();
    }
  }

  openSnackBar() {
    this.snackBar.open(
      `Successfully requested to join "${this.bookclub?.name}"`,
      'Close',
      {
        duration: 5 * 1000,
      }
    );
  }
}

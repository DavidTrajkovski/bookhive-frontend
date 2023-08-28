import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookClub } from 'src/app/core/interface/bookclub/bookclub';
import { InvitationService } from 'src/app/core/service/invitation.service';
import { BookclubDialog } from '../dialogues/bookclub-dialog/bookclub-dialog.component';

@Component({
  selector: 'bh-bookclub-card',
  templateUrl: './bookclub-card.component.html',
  styleUrls: ['./bookclub-card.component.scss'],
})
export class BookclubCardComponent {
  @Input() bookclub?: BookClub;
  @Output() refetchBookClubsEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private invitationService: InvitationService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
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

  openBookClubDialog() {
    const dialog = this.dialog.open(BookclubDialog, {
      data: {
        bookclubId: this.bookclub?.id,
      },
      height: '600px',
      width: '600px',
      autoFocus: false,
    });
    dialog.afterClosed().subscribe((_) => {
      this.refetchBookClubsEvent.emit(true);
    });
  }
}

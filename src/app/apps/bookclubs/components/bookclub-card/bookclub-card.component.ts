import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookClub } from 'src/app/core/interface/bookclub/bookclub';
import { InvitationService } from 'src/app/core/service/invitation.service';
import { BookclubDialog } from '../dialogues/bookclub-dialog/bookclub-dialog.component';
import { NotifierService } from 'angular-notifier';

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
    private dialog: MatDialog,
    private _notifierService: NotifierService
  ) {}

  requestBookClubMembership(bookclubId: string | undefined) {
    if (bookclubId) {
      this.invitationService.requestBookClubMembership(bookclubId);
      this._notifierService.notify(
        'success',
        `Successfully requested to join "${this.bookclub?.name}"`
      );
    }
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

import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/core/service/authorization/profile.service';
import { CreateNewInvitation } from 'src/app/core/interface/bookclub/create-new-invitation';
import { AuthService } from 'src/app/core/service/authentication/auth.service';
import { InvitationService } from 'src/app/core/service/invitation.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'bh-send-invitation',
  templateUrl: './send-invitation.component.html',
  styleUrls: ['./send-invitation.component.scss'],
})
export class SendInvitationDialog {
  recipientEmail = new FormControl('', [Validators.required, Validators.email]);
  shortMessage = new FormControl('');

  bookHiveUserEmails: string[] = [];
  bookclubId: string = '';

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private invitationService: InvitationService,
    private _notifierService: NotifierService
  ) {}

  ngOnInit(): void {
    this.getBookHiveUserEmails();
  }

  onSubmit() {
    if (this.recipientEmail.invalid || !this.recipientEmail.value) {
      return;
    }

    const newInvitation: CreateNewInvitation = {
      bookClubId: this.bookclubId,
      senderId: this.authService.getUserId()!,
      receiverEmail: this.recipientEmail.value,
      message: this.shortMessage.value ?? '',
    };

    this.invitationService.sendInvitation(newInvitation);
    this._notifierService.notify(
      'success',
      `Invitation send to: "${this.recipientEmail.value}"`
    );
  }

  getBookHiveUserEmails() {
    this.profileService.getBookHiveUserEmails().subscribe({
      next: (data) => (this.bookHiveUserEmails = data),
      error: (err) => console.error(err),
    });
  }
}

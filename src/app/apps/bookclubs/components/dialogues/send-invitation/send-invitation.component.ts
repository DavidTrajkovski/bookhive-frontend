import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgFor } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProfileService } from 'src/app/core/service/authorization/profile.service';
import { CreateNewInvitation } from 'src/app/core/interface/bookclub/create-new-invitation';
import { AuthService } from 'src/app/core/service/authentication/auth.service';
import { InvitationService } from 'src/app/core/service/invitation.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'bh-send-invitation',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgFor,
  ],
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
    private snackBar: MatSnackBar
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
    this.openSnackBar();
  }

  openSnackBar() {
    this.snackBar.open(
      `Invitation send to: "${this.recipientEmail.value}"`,
      'Close',
      {
        duration: 5 * 1000,
      }
    );
  }

  getBookHiveUserEmails() {
    this.profileService.getBookHiveUserEmails().subscribe({
      next: (data) => (this.bookHiveUserEmails = data),
      error: (err) => console.error(err),
    });
  }
}

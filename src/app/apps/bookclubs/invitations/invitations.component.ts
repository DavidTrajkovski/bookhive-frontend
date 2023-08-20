import { Component } from '@angular/core';
import { Invitation } from 'src/app/core/interface/bookclub/invitation';
import { InvitationService } from 'src/app/core/service/invitation.service';

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.scss'],
})
export class InvitationsComponent {
  invitations: Invitation[] = [];
  invitationsAreLoading: boolean = true;

  constructor(private invitationService: InvitationService) {}

  ngOnInit(): void {
    this.getInvitations();
  }

  getInvitations() {
    this.invitationService.getUserInvitations().subscribe({
      next: (data) => {
        this.invitations = data;
        this.invitationsAreLoading = false;
      },
    });
  }
}

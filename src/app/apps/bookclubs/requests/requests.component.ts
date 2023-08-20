import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookClub } from 'src/app/core/interface/bookclub/bookclub';
import { Invitation } from 'src/app/core/interface/bookclub/invitation';
import { BookclubService } from 'src/app/core/service/bookclub.service';
import { InvitationService } from 'src/app/core/service/invitation.service';
import { RouteConstants } from 'src/app/shared/RouteConstants';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
})
export class RequestsComponent {
  bookclubId: string = '';
  bookclub?: BookClub;

  membershipRequests: Invitation[] = [];
  membershipRequestsAreLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private invitationService: InvitationService,
    private bookclubService: BookclubService
  ) {}

  ngOnInit(): void {
    this.getBookClubIdFromPath();
    this.getBookClubById();
    this.getMembershipRequestsForBookClub();
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
      },
      error: (err) => console.error(err),
    });
  }

  getMembershipRequestsForBookClub() {
    this.invitationService
      .getMembershipRequestsForBookClub(this.bookclubId)
      .subscribe({
        next: (data) => {
          this.membershipRequests = data;
          this.membershipRequestsAreLoading = false;
        },
        error: (err) => console.error(err),
      });
  }

  acceptRequest(invitaionId: string) {
    this.invitationService.acceptRequest(invitaionId);
    this.getMembershipRequestsForBookClub();
  }

  declineRequest(invitaionId: string) {
    if (confirm('Are you sure you want to decline this request?')) {
      this.invitationService.declineRequest(invitaionId);
      this.getMembershipRequestsForBookClub();
    }
  }
}

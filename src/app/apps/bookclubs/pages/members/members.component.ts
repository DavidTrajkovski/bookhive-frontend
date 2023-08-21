import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookClub } from 'src/app/core/interface/bookclub/bookclub';
import { Member } from 'src/app/core/interface/bookclub/member';
import { BookclubService } from 'src/app/core/service/bookclub.service';
import { RouteConstants } from 'src/app/shared/RouteConstants';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class MembersComponent {
  bookclubId: string = '';
  bookclub?: BookClub;
  bookclubIsLoading: boolean = true;

  members?: Member[];
  membersAreLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private bookclubService: BookclubService
  ) {}

  ngOnInit(): void {
    this.getBookClubIdFromPath();
    this.getBookClubById();
    this.getMembersForBookClub();
  }

  kickMember(memberId: string, firstName: string, lastName: string) {
    if (
      confirm(`Are you sure you want to kick member: ${firstName} ${lastName}?`)
    ) {
      this.bookclubService.removeMemberFromBookClub(this.bookclubId, memberId);
      this.getMembersForBookClub();
    }
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

  getMembersForBookClub() {
    this.bookclubService.getMembersForBookClub(this.bookclubId).subscribe({
      next: (data) => {
        this.members = data;
        this.membersAreLoading = false;
      },
      error: (err) => console.error(err),
    });
  }
}

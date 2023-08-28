import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from '../../app-routing.module';
import { RouteConstants } from '../RouteConstants';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { AuthService } from 'src/app/core/service/authentication/auth.service';
import { InvitationService } from 'src/app/core/service/invitation.service';

@Component({
  selector: 'bh-sidenav',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    AppRoutingModule,
    MatMenuModule,
    MatBadgeModule,
  ],
})
export class NavBarComponent {
  home: string = RouteConstants.HOME;
  books: string = RouteConstants.BOOKS;
  bookshops: string = RouteConstants.BOOKSHOPS;
  login: string = RouteConstants.LOGIN;
  register: string = RouteConstants.REGISTER;
  profile: string = RouteConstants.PROFILE;
  bookclubs: string = RouteConstants.BOOKCLUBS;
  invitations: string = RouteConstants.INVITATIONS;
  authors: string = RouteConstants.AUTHORS
  mywishlist: string = RouteConstants.MY_WISHLIST

  isUserLoggedIn: boolean = false;
  invitationsCount: number = 0;

  constructor(
    private authService: AuthService,
    private invitationService: InvitationService
  ) {}

  ngOnInit(): void {
    this.isUserLoggedIn = this.authService.isLoggedIn();
    this.setInvitationsCount();
  }

  logout() {
    this.authService.logout();
    location.reload();
  }

  setInvitationsCount() {
    this.invitationService.getUserInvitationsCount().subscribe({
      next: (count) => (this.invitationsCount = count),
      error: (err) => console.error(err),
    });
  }
}

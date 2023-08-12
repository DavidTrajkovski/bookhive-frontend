import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from '../../app-routing.module';
import { RouteConstants } from '../RouteConstants';
import { AuthService } from 'src/app/core/service/authentication/auth.service';

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
  ],
})
export class NavBarComponent {
  home: string = RouteConstants.HOME;
  books: string = RouteConstants.BOOKS;
  bookshops: string = RouteConstants.BOOKSHOPS;
  login: string = RouteConstants.LOGIN;
  register: string = RouteConstants.REGISTER;

  isUserLoggedIn: boolean = this.authService.isLoggedIn();

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
    location.reload();
  }
}

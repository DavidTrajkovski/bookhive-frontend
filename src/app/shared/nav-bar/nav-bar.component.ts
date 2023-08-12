import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from '../../app-routing.module';
import { RouteConstants } from '../RouteConstants';

@Component({
  selector: 'bh-sidenav',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  standalone: true,
  imports: [
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
}

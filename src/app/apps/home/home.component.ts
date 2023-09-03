import { Component } from '@angular/core';
import {AuthService} from "../../core/service/authentication/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(public authService: AuthService) {
  }

}

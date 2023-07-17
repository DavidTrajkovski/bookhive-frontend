import { NgModule } from '@angular/core';
import {RegisterService} from "./service/authorization/register.service";
import {LoginService} from "./service/authorization/login.service";

@NgModule({
  providers: [
    RegisterService,
    LoginService
  ],
})
export class CoreModule { }

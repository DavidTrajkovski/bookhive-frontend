import { NgModule } from '@angular/core';
import {RegisterService} from "./service/authorization/register.service";
import {LoginService} from "./service/authorization/login.service";
import {BookService} from "./service/book/book.service";

@NgModule({
  providers: [
    RegisterService,
    LoginService,
    BookService
  ],
})
export class CoreModule { }

import { NgModule } from '@angular/core';
import { BookshopService } from './service/bookshop.service';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from './service/authentication/auth.service';
import {RegisterService} from "./service/authorization/register.service";
import {LoginService} from "./service/authorization/login.service";
import {AuthorService} from "./service/author/author.service";
import {BookService} from "./service/book/book.service";

@NgModule({
  imports: [SharedModule],
  providers: [AuthService, BookshopService],
  providers: [
    RegisterService,
    LoginService,
    AuthorService,
    BookService,
    AuthService,
    BookshopService
  ],
})
export class CoreModule {}

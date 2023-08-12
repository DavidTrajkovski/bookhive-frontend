import {NgModule} from '@angular/core';
import {RegisterService} from "./service/authorization/register.service";
import {LoginService} from "./service/authorization/login.service";
import {AuthorService} from "./service/author/author.service";
import {BookService} from "./service/book/book.service";

@NgModule({
  providers: [
    RegisterService,
    LoginService,
    AuthorService,
    BookService
  ],
})
export class CoreModule {
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPage } from './apps/register/register-page.component';
import { RouteConstants } from './shared/RouteConstants';
import { LoginPage } from './apps/login/login-page.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { BooksComponent } from './apps/books/books.component';
import {BookDetailsComponent} from "./apps/book-details/book-details.component";
import {AuthorsComponent} from "./apps/authors/authors.component";
import {AuthorDetailsComponent} from "./apps/author-details/author-details.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: RouteConstants.BOOKS, component: BooksComponent },
      { path: `${RouteConstants.BOOKS}/:${RouteConstants.BOOKS_ID}`, component: BookDetailsComponent },
      { path: RouteConstants.AUTHORS, component: AuthorsComponent },
      { path: `${RouteConstants.AUTHORS}/:${RouteConstants.AUTHORS_ID}`, component: AuthorDetailsComponent },
    ],
  },
  { path: RouteConstants.REGISTER, component: RegisterPage },
  { path: RouteConstants.LOGIN, component: LoginPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

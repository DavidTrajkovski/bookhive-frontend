import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPage } from './apps/register/register-page.component';
import { RouteConstants } from './shared/RouteConstants';
import { LoginPage } from './apps/login/login-page.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { BooksComponent } from './apps/books/books.component';
import { BookshopsComponent } from './apps/bookshops/bookshops.component';
import { HomeComponent } from './apps/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: RouteConstants.HOME, pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: RouteConstants.HOME, component: HomeComponent },
      { path: RouteConstants.BOOKS, component: BooksComponent },
      { path: RouteConstants.BOOKSHOPS, component: BookshopsComponent },
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

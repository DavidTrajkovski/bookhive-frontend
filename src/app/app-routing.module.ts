import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterPage} from './apps/register/register-page.component';
import {RouteConstants} from './shared/RouteConstants';
import {LoginPage} from './apps/login/login-page.component';
import {LayoutComponent} from './shared/layout/layout.component';
import {BooksComponent} from './apps/books/books.component';
import {BookshopsComponent} from './apps/bookshops/bookshops.component';
import {HomeComponent} from './apps/home/home.component';
import {BookshopDetailsComponent} from './apps/bookshop-details/bookshop-details.component';
import {ProfileComponent} from "./apps/profile/profile.component";
import {AuthorsComponent} from "./apps/authors/authors.component";
import {AuthorDetailsComponent} from "./apps/author-details/author-details.component";
import {BookDetailsComponent} from "./apps/book-details/book-details.component";
import { BookclubDetailsComponent } from './apps/bookclubs/pages/bookclub-details/bookclub-details.component';
import { BookclubsComponent } from './apps/bookclubs/pages/bookclubs/bookclubs.component';
import { InvitationsComponent } from './apps/bookclubs/pages/invitations/invitations.component';
import { MembersComponent } from './apps/bookclubs/pages/members/members.component';
import { RequestsComponent } from './apps/bookclubs/pages/requests/requests.component';
import { TopicDetailsComponent } from './apps/bookclubs/pages/topic-details/topic-details.component';
import {NotFoundComponent} from "./shared/components/not-found/not-found.component";
import { ShoppingCartDetailsComponent } from './apps/shopping-cart/shopping-cart-details/shopping-cart-details.component';

const routes: Routes = [
  {path: '', redirectTo: RouteConstants.HOME, pathMatch: 'full'},
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: RouteConstants.SHOPPING_CART, component: ShoppingCartDetailsComponent},
      {path: RouteConstants.NOT_FOUND, component: NotFoundComponent},
      {path: RouteConstants.HOME, component: HomeComponent},
      {path: RouteConstants.BOOKS, component: BooksComponent},
      {path: RouteConstants.BOOKSHOPS, component: BookshopsComponent},
      {path: `${RouteConstants.BOOKS}/:${RouteConstants.BOOKS_ID}`, component: BookDetailsComponent},
      {path: RouteConstants.AUTHORS, component: AuthorsComponent},
      {path: `${RouteConstants.AUTHORS}/:${RouteConstants.AUTHORS_ID}`, component: AuthorDetailsComponent},
      {path: `${RouteConstants.BOOKSHOPS}/:${RouteConstants.BOOKSHOPS_ID}`, component: BookshopDetailsComponent,},
      {path: RouteConstants.PROFILE, component: ProfileComponent},
      { path: RouteConstants.BOOKCLUBS, component: BookclubsComponent },
      {
        path: `${RouteConstants.BOOKCLUBS}/:${RouteConstants.BOOKCLUB_ID}`,
        component: BookclubDetailsComponent,
      },
      {
        path: `${RouteConstants.BOOKCLUBS}/:${RouteConstants.BOOKCLUB_ID}/${RouteConstants.MEMBERS}`,
        component: MembersComponent,
      },
      {
        path: `${RouteConstants.BOOKCLUBS}/:${RouteConstants.BOOKCLUB_ID}/${RouteConstants.REQUESTS}`,
        component: RequestsComponent,
      },
      { path: RouteConstants.INVITATIONS, component: InvitationsComponent },
      {
        path: `${RouteConstants.TOPIC}/:${RouteConstants.TOPIC_ID}`,
        component: TopicDetailsComponent,
      },
    ],
  },
  {path: RouteConstants.REGISTER, component: RegisterPage},
  {path: RouteConstants.LOGIN, component: LoginPage},
  {path: "**", pathMatch: 'full', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}

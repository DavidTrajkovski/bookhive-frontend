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
import {BookshopGeolocationComponent} from "./apps/bookshop-geolocation/bookshop-geolocation.component";
import {BooksAddComponent} from "./apps/books-add/books-add.component";
import {NotFoundComponent} from "./shared/components/not-found/not-found.component";
import {UnauthorizedComponent} from "./shared/components/unauthorized/unauthorized.component"
import { ShoppingCartDetailsComponent } from './apps/shopping-cart/shopping-cart-details/shopping-cart-details.component';
import {MyWishlistComponent} from "./apps/my-wishlist/my-wishlist.component";
import { MyLibraryComponent } from './apps/my-library/my-library.component';
import { authGuard } from './core/guards/auth.guard';
import { adminRoleGuard } from './core/guards/admin-role.guard';

const routes: Routes = [
  {path: '', redirectTo: RouteConstants.HOME, pathMatch: 'full'},
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: RouteConstants.MY_LIBRARY, component: MyLibraryComponent, canActivate: [authGuard]},
      {path: RouteConstants.SHOPPING_CART, component: ShoppingCartDetailsComponent, canActivate: [authGuard]},
      {path: RouteConstants.NOT_FOUND, component: NotFoundComponent},
      {path: RouteConstants.UNAUTHORIZED, component: UnauthorizedComponent},
      {path: RouteConstants.HOME, component: HomeComponent},
      {path: RouteConstants.BOOKS, component: BooksComponent},
      {path: RouteConstants.BOOKSHOPS, component: BookshopsComponent},
      {path: `${RouteConstants.BOOKS}/add`, component: BooksAddComponent, canActivate: [authGuard, adminRoleGuard]},
      {path: `${RouteConstants.BOOKS}/edit/:${RouteConstants.BOOK_ID}`, component: BooksAddComponent, canActivate: [authGuard, adminRoleGuard]},
      {path: `${RouteConstants.BOOKS}/:${RouteConstants.BOOKS_ID}`, component: BookDetailsComponent},
      {path: RouteConstants.AUTHORS, component: AuthorsComponent},
      {path: `${RouteConstants.AUTHORS}/:${RouteConstants.AUTHORS_ID}`, component: AuthorDetailsComponent},
      {path: `${RouteConstants.BOOKSHOPS}/:${RouteConstants.BOOKSHOPS_ID}`, component: BookshopDetailsComponent,},
      {path: RouteConstants.PROFILE, component: ProfileComponent, canActivate: [authGuard]},
      { path: RouteConstants.BOOKCLUBS, component: BookclubsComponent, canActivate: [authGuard] },
      {
        path: `${RouteConstants.BOOKCLUBS}/:${RouteConstants.BOOKCLUB_ID}`,
        component: BookclubDetailsComponent,
        canActivate: [authGuard]
      },
      {
        path: `${RouteConstants.BOOKCLUBS}/:${RouteConstants.BOOKCLUB_ID}/${RouteConstants.MEMBERS}`,
        component: MembersComponent,
        canActivate: [authGuard]
      },
      {
        path: `${RouteConstants.BOOKCLUBS}/:${RouteConstants.BOOKCLUB_ID}/${RouteConstants.REQUESTS}`,
        component: RequestsComponent,
        canActivate: [authGuard]
      },
      { path: RouteConstants.INVITATIONS, component: InvitationsComponent, canActivate: [authGuard] },
      {
        path: `${RouteConstants.TOPIC}/:${RouteConstants.TOPIC_ID}`,
        component: TopicDetailsComponent,
        canActivate: [authGuard]
      },
      {
        path: `${RouteConstants.MY_WISHLIST}`,
        component: MyWishlistComponent,
        canActivate: [authGuard]
      }
    ],
  },
  {path: RouteConstants.REGISTER, component: RegisterPage},
  {path: RouteConstants.LOGIN, component: LoginPage},
  {path: "**", pathMatch: 'full', component: NotFoundComponent},
  { path: `${RouteConstants.GEOLOCATION}/:${RouteConstants.BOOK_ID}`, component: BookshopGeolocationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}

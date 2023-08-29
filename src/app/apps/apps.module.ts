import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { RegisterPage } from './register/register-page.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { LoginPage } from './login/login-page.component';
import { BooksComponent } from './books/books.component';
import { BookCardComponent } from './components/book-card/book-card.component';
import { BookshopsComponent } from './bookshops/bookshops.component';
import { BookshopCardComponent } from './components/bookshop-card/bookshop-card.component';
import { HomeComponent } from './home/home.component';
import { BookshopDetailsComponent } from './bookshop-details/bookshop-details.component';
import { RouterModule } from '@angular/router';
import { BookshopBooksTableComponent } from './components/bookshop-books-table/bookshop-books-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProfileComponent } from './profile/profile.component';
import { MatIconModule } from "@angular/material/icon";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { AuthorsComponent } from './authors/authors.component';
import { AuthorDetailsComponent } from './author-details/author-details.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {RouterLink} from "@angular/router";
import { BookclubsModule } from './bookclubs/bookclubs.module';
import {AuthorDialog} from "./authors/dialogs/author-dialog/author.dialog";
import { MyWishlistComponent } from './my-wishlist/my-wishlist.component';
import {NotifierModule, NotifierOptions} from "angular-notifier";
import { ShoppingCartDetailsComponent } from './shopping-cart/shopping-cart-details/shopping-cart-details.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {NgxPaginationModule} from "ngx-pagination";
import { customNotifierOptions } from './configs/custom-notifier-options';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    MatOptionModule,
    MatTooltipModule,
    RouterLink,
    NgOptimizedImage,
    MatSelectModule,
    BookclubsModule,
    NotifierModule.withConfig(customNotifierOptions),
    MatProgressSpinnerModule,
    NgxPaginationModule
  ],
  declarations: [
    RegisterPage,
    LoginPage,
    BooksComponent,
    BookCardComponent,
    AuthorsComponent,
    AuthorDetailsComponent,
    BookDetailsComponent,
    BookshopsComponent,
    BookshopCardComponent,
    HomeComponent,
    BookshopDetailsComponent,
    BookshopBooksTableComponent,
    ProfileComponent,
    AuthorDialog,
    ShoppingCartDetailsComponent,
    MyWishlistComponent
  ],
  providers: [],
})
export class AppsModule {}

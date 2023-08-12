import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterPage } from './register/register-page.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
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
  ],
  declarations: [
    RegisterPage,
    LoginPage,
    BooksComponent,
    BookCardComponent,
    BookshopsComponent,
    BookshopCardComponent,
    HomeComponent,
    BookshopDetailsComponent,
    BookshopBooksTableComponent,
    ProfileComponent
  ],
  providers: [],
})
export class AppsModule {}

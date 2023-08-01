import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterPage } from './register/register-page.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { LoginPage } from './login/login-page.component';
import { BooksComponent } from './books/books.component';
import { BookCardComponent } from './components/book-card/book-card.component';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [RegisterPage, LoginPage, BooksComponent, BookCardComponent],
  providers: [],
})
export class AppsModule {}

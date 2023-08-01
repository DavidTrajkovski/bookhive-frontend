import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterPage } from './register/register-page.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { LoginPage } from './login/login-page.component';
import { BooksComponent } from './books/books.component';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [RegisterPage, LoginPage, BooksComponent],
  providers: [],
})
export class AppsModule {}

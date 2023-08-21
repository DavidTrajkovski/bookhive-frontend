import { NgModule } from '@angular/core';
import { BookshopService } from './service/bookshop.service';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from './service/authentication/auth.service';
import { AuthorService } from './service/author/author.service';
import { BookService } from './service/book/book.service';
import { TopicService } from './service/topic.service';

@NgModule({
  imports: [SharedModule],
  providers: [
    AuthorService,
    BookService,
    AuthService,
    BookshopService,
    TopicService,
  ],
})
export class CoreModule {}

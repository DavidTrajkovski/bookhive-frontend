import { NgModule } from '@angular/core';
import { RegisterService } from './service/authorization/register.service';
import { LoginService } from './service/authorization/login.service';
import { BookshopService } from './service/bookshop.service';

@NgModule({
  providers: [RegisterService, LoginService, BookshopService],
})
export class CoreModule {}

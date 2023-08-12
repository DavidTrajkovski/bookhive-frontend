import { NgModule } from '@angular/core';
import { RegisterService } from './service/authorization/register.service';
import { LoginService } from './service/authorization/login.service';
import { BookshopService } from './service/bookshop.service';
import { SharedModule } from '../shared/shared.module';
import { JwtService } from './service/authorization/jwt.service';

@NgModule({
  imports: [SharedModule],
  providers: [RegisterService, LoginService, BookshopService]
})
export class CoreModule {}

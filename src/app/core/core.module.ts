import { NgModule } from '@angular/core';
import { BookshopService } from './service/bookshop.service';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from './service/authentication/auth.service';

@NgModule({
  imports: [SharedModule],
  providers: [AuthService, BookshopService],
})
export class CoreModule {}

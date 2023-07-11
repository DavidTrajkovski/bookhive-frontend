import { NgModule } from '@angular/core';
import {RegisterService} from "./service/authorization/register.service";

@NgModule({
  providers: [
    RegisterService
  ],
})
export class CoreModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from "./apps/register/register.component";
import {RouteConstants} from "./shared/RouteConstants";

const routes: Routes = [
  { path: RouteConstants.REGISTER, component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

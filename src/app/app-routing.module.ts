import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPage } from './apps/register/register-page.component';
import { RouteConstants } from './shared/RouteConstants';

const routes: Routes = [
  { path: RouteConstants.REGISTER, component: RegisterPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

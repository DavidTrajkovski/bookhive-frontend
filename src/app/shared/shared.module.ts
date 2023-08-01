import { NgModule } from '@angular/core';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LayoutComponent } from './layout/layout.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [LayoutComponent],
  imports: [NavBarComponent, AppRoutingModule],
  exports: [NavBarComponent, LayoutComponent],
})
export class SharedModule {}

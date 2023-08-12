import { NgModule } from '@angular/core';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LayoutComponent } from './layout/layout.component';
import { AppRoutingModule } from '../app-routing.module';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [LayoutComponent],
  imports: [NavBarComponent, AppRoutingModule, MatProgressSpinnerModule],
  exports: [NavBarComponent, LayoutComponent, MatProgressSpinnerModule],
})
export class SharedModule {}

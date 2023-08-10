import { NgModule } from '@angular/core';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LayoutComponent } from './layout/layout.component';
import { AppRoutingModule } from '../app-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { TextIconComponent } from './components/text-icon/text-icon.component';

@NgModule({
  declarations: [LayoutComponent, TextIconComponent],
  imports: [
    NavBarComponent,
    AppRoutingModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  exports: [
    NavBarComponent,
    LayoutComponent,
    MatProgressSpinnerModule,
    TextIconComponent,
  ],
})
export class SharedModule {}

import { NgModule } from '@angular/core';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LayoutComponent } from './layout/layout.component';
import { AppRoutingModule } from '../app-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { TextIconComponent } from './components/text-icon/text-icon.component';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from './services/local-storage.service';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [LayoutComponent, TextIconComponent, NotFoundComponent],
  providers: [LocalStorageService],
  imports: [
    CommonModule,
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

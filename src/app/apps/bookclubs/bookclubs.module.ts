import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookclubsComponent } from './pages/bookclubs/bookclubs.component';
import { BookclubCardComponent } from './components/bookclub-card/bookclub-card.component';
import { BookclubDetailsComponent } from './pages/bookclub-details/bookclub-details.component';
import { TopicDetailsComponent } from './pages/topic-details/topic-details.component';
import { TopicCardComponent } from './components/topic-card/topic-card.component';
import { MembersComponent } from './pages/members/members.component';
import { InvitationsComponent } from './pages/invitations/invitations.component';
import { RequestsComponent } from './pages/requests/requests.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { PostCardComponent } from './components/post-card/post-card.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { BookclubDialog } from './components/dialogues/bookclub-dialog/bookclub-dialog.component';
import { TopicDialog } from './components/dialogues/topic-dialog/topic-dialog.component';
import { NotifierModule } from 'angular-notifier';
import { SendInvitationDialog } from './components/dialogues/send-invitation/send-invitation.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { customNotifierOptions } from '../apps.module';

@NgModule({
  declarations: [
    BookclubsComponent,
    BookclubCardComponent,
    BookclubDetailsComponent,
    TopicDetailsComponent,
    TopicCardComponent,
    MembersComponent,
    InvitationsComponent,
    RequestsComponent,
    PostCardComponent,
    BookclubDialog,
    TopicDialog,
    SendInvitationDialog,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatBadgeModule,
    MatDialogModule,
    MatAutocompleteModule,
    NotifierModule.withConfig(customNotifierOptions),
  ],
})
export class BookclubsModule {}

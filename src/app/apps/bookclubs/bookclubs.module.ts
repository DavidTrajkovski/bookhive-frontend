import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookclubsPageComponent } from './bookclubs-page/bookclubs-page.component';
import { BookclubCardComponent } from './bookclub-card/bookclub-card.component';
import { BookclubDetailsComponent } from './bookclub-details/bookclub-details.component';
import { TopicDetailsComponent } from './topic-details/topic-details.component';
import { TopicCardComponent } from './topic-card/topic-card.component';
import { MembersComponent } from './members/members.component';
import { InvitationsComponent } from './invitations/invitations.component';
import { RequestsComponent } from './requests/requests.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    BookclubsPageComponent,
    BookclubCardComponent,
    BookclubDetailsComponent,
    TopicDetailsComponent,
    TopicCardComponent,
    MembersComponent,
    InvitationsComponent,
    RequestsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class BookclubsModule {}
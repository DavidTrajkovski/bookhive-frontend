import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookClub } from 'src/app/core/interface/bookclub/bookclub';
import { Topic } from 'src/app/core/interface/bookclub/topic';
import { BookclubService } from 'src/app/core/service/bookclub.service';
import { RouteConstants } from 'src/app/shared/RouteConstants';

@Component({
  selector: 'bh-topic-details',
  templateUrl: './topic-details.component.html',
  styleUrls: ['./topic-details.component.scss'],
})
export class TopicDetailsComponent {
  topicId: string = '';
  topic?: Topic;
  bookclub?: BookClub; // Needed for the breadcrumbs

  constructor(
    private route: ActivatedRoute,
    private bookclubService: BookclubService
  ) {}

  ngOnInit(): void {
    this.getTopicIdFromPath();
  }

  getTopicIdFromPath() {
    this.route.params.subscribe((params) => {
      this.topicId = params[RouteConstants.TOPIC_ID];
    });
  }

  getBookClubById() {
    this.bookclubService.getBookClubById(this.topic!.bookclubId).subscribe({
      next: (data) => {
        this.bookclub = data;
      },
      error: (err) => console.error(err),
    });
  }
}

import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookClub } from 'src/app/core/interface/bookclub/bookclub';
import { CreateNewPost } from 'src/app/core/interface/bookclub/create-new-post';
import { Post } from 'src/app/core/interface/bookclub/post';
import { Topic } from 'src/app/core/interface/bookclub/topic';
import { AuthService } from 'src/app/core/service/authentication/auth.service';
import { BookclubService } from 'src/app/core/service/bookclub.service';
import { TopicService } from 'src/app/core/service/topic.service';
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
  posts?: Post[];
  @ViewChild('newPostTextArea') newPostTextArea!: ElementRef;
  newPostContent: string = '';

  constructor(
    private route: ActivatedRoute,
    private topicService: TopicService,
    private bookclubService: BookclubService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getTopicIdFromPath();
    this.getTopicById();
    this.getPostsForTopic();
  }

  updateNewPostContent($event: Event) {
    this.newPostContent = ($event.target as HTMLInputElement).value;
  }

  onSubmit() {
    if (!this.newPostContent) return;

    const newPost: CreateNewPost = {
      content: this.newPostContent,
      userId: this.authService.getUserId()!,
      topicId: this.topicId,
    };

    this.newPostContent = '';
    this.newPostTextArea.nativeElement.value = '';
    this.newPostTextArea.nativeElement.blur();
    this.topicService.addPostToTopic(this.topicId, newPost).subscribe({
      next: (_) => this.getPostsForTopic(),
      error: (err) => console.error(err),
    });
  }

  getTopicIdFromPath() {
    this.route.params.subscribe((params) => {
      this.topicId = params[RouteConstants.TOPIC_ID];
    });
  }

  getTopicById() {
    this.topicService.getTopicById(this.topicId).subscribe({
      next: (data) => {
        this.topic = data;
        this.getBookClubById();
      },
      error: (err) => console.error(err),
    });
  }

  getPostsForTopic() {
    this.topicService.getPostsForTopic(this.topicId).subscribe({
      next: (data) => (this.posts = data),
      error: (err) => console.error(err),
    });
  }

  getBookClubById() {
    this.bookclubService.getBookClubById(this.topic!.bookclubId).subscribe({
      next: (data) => (this.bookclub = data),
      error: (err) => console.error(err),
    });
  }
}

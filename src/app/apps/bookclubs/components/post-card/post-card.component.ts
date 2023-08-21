import { Component, Input } from '@angular/core';
import { Post } from 'src/app/core/interface/bookclub/post';

@Component({
  selector: 'bh-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent {
  @Input() post?: Post;
}

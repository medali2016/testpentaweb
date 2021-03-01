import { Component, Input } from '@angular/core';
import { Post } from '@modules/home/models/post.model';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent {
  @Input() post: Post;

  flipped = false;
}

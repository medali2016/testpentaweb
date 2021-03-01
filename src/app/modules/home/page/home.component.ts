import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MyModalComponent } from '../modal/my-modal.component';
import { PostService } from '../services/post.service';
import { Post } from '../models/post.model';
import { Comment } from '../models/comment.model';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { NewPostComponent } from './new-post/new-post.component';
import { MessageService } from '@shared/service/message.service';
import { UserService } from '@shared/service/user.service';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts$: Post[];
  subscription: Subscription;
  message: any;
  userId: string;
  comments: any[];
  user: any;
  constructor(
    private messageService: MessageService,
    private userService: UserService,
    private dialog: MatDialog,
    private modalService: NgbModal,
    private postService: PostService,
    private commentService: CommentService
  ) {
    this.subscription = this.messageService.getMessage().subscribe(message => {
      console.log('message' + message['text']);
      if (
        message['text'] === 'post added' ||
        message['text'] === 'post edited'
      ) {
        this.getAll();
        this.message = message;
      }
    });
  }

  ngOnInit(): void {
    this.comments = [];
    this.userId = localStorage.getItem('userId');
    this.getAll();
    this.userService
      .findByid(localStorage.getItem('userId'))
      .subscribe(value => {
        this.user = value['body'];
      });
  }
  deleteComment(commentId: number) {
    this.commentService.delete(commentId).subscribe(data => {
      this.getAll();
    });
  }
  getAll() {
    this.postService.getAll(0).subscribe(data => {
      this.posts$ = data['body'];
    });
  }
  delete(postId: number) {
    this.postService.delete(postId).subscribe(data => {
      this.getAll();
    });
  }
  addComment(post: any) {
    const newComment = new Comment(
      null,
      this.comments[post.id],
      post,
      this.user
    );
    this.commentService.createComment(newComment).subscribe(
      value => {
        this.messageService.sendMessage('post added');
      },
      error => {}
    );
  }
  openMyModal() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      title: 'Nouveau post'
    };
    this.dialog.open(NewPostComponent, dialogConfig);
  }
}

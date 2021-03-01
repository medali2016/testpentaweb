import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  ValidatorFn
} from '@angular/forms';
import { Router } from '@angular/router';

import { PostService } from '@modules/home/services/post.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Post } from '@modules/home/models/post.model';
import { MessageService } from '@shared/service/message.service';
import { UserService } from '@shared/service/user.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html'
})
export class NewPostComponent implements OnInit {
  postForm: FormGroup;
  user: any;
  description: string;
  title: string;
  constructor(
    private messageService: MessageService,
    private postService: PostService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private dialogRef: MatDialogRef<NewPostComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {}

  ngOnInit() {
    this.postForm = this.formBuilder.group({
      title: [this.title, []],
      description: [this.description, []]
    });
    this.userService
      .findByid(localStorage.getItem('userId'))
      .subscribe(value => {
        this.user = value['body'];
      });
  }

  save() {
    const formValue = this.postForm.value;
    const newPost = new Post(
      null,
      formValue['title'],
      formValue['description'],
      this.user
    );
    this.postService.create(newPost).subscribe(
      value => {
        this.messageService.sendMessage('post added');
        this.close();
      },
      error => {}
    );
  }

  close() {
    this.dialogRef.close();
  }
}

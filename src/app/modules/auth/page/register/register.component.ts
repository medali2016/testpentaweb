import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/service/auth.service';
import { User } from '@shared/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signupForm: FormGroup;
  error: string;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.buildForm();
  }

  ngOnInit() {}

  get f() {
    return this.signupForm.controls;
  }

  signup() {
    const credentials = this.signupForm.value;
    const newUser = new User(
      null,
      credentials['firstname'],
      credentials['lastname'],
      credentials['email'],
      credentials['password']
    );
    this.authService.create(newUser).subscribe(
      value => {
        console.log('value' + value);
        this.router.navigate(['/auth/login']);
      },
      error => {
        console.log('error' + error);
      }
    );
  }
  private buildForm(): void {
    this.signupForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}

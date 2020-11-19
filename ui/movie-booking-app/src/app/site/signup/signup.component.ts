import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  error: string;
  userNameTaken: boolean;
  checkPassword: boolean;

  constructor(private userService: UserService, private router: Router) {};

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.maxLength(20), Validators.minLength(3)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.maxLength(50), Validators.minLength(8)]),
      'confirmPassword': new FormControl(null, [Validators.required])
    });
  };

  get username() {
    return this.signUpForm.get('username');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  checkUsername() {
    if (this.signUpForm && this.username) {
      this.userService.checkUserId(this.username.value).subscribe(data => {
        this.userNameTaken = data;
      })
    }
  }

  matchPassword() {
    if (this.signUpForm && this.confirmPassword && this.confirmPassword.value && this.confirmPassword.value.length>0) {
      if (this.confirmPassword.value===this.password.value)
      this.checkPassword = true;
      else
      this.checkPassword = false;
    }
  }

  onSubmitSignup() {
    if (this.checkPassword && !this.userNameTaken) {
      this.userService.addUser(this.signUpForm.value).subscribe(data => {
        this.router.navigate(['/login']);
      }, error => {
        this.error = error.error.message;
      })
    }
  }
}

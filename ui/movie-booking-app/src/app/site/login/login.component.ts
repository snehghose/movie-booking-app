import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginFailed = false;
  unauthorized = false;
  error = false;
  showPass: boolean = false;

  constructor( private authService: AuthService, private userService: UserService, private router: Router ) {};

  ngOnInit(): void {
    if ( this.authService.loggedInUser.value ) {
      if (this.authService.loggedInUser.value.role === Role.ROLE_ADMIN)
      this.router.navigate(['/admin']);
      else
      this.router.navigate(['/user']);
    }
    this.loginForm = new FormGroup ({
      'username': new FormControl(null, [Validators.required, Validators.maxLength(20)]),
      'password': new FormControl(null, [Validators.required, Validators.maxLength(50)])
    });
  };

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  loginUser() {
    if (this.loginForm.valid) {
      this.authService.login(this.username.value, this.password.value).subscribe((res) => {
        this.authService.setToken(res['token'])
      }, (res: HttpErrorResponse) => {
        const statusCode = res.status;
        if (statusCode === 401) {
          this.loginFailed = true;
        } else if (statusCode === 403) {
          this.unauthorized = true;
        } else {
          this.error = true;
        }
      }, () => {
        this.userService.getUserById(this.username.value).subscribe(user => {
          this.authService.loggedInUser.next(user);
          if (user.role === Role.ROLE_ADMIN)
          this.router.navigate(['/admin']);
          else
          this.router.navigate(['/user']);
        });
      });
    }
  }

  showPassword() {
    this.showPass = !this.showPass;
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  resetPass:FormGroup =this.formBuilder.group({
    oldPassword: ['', Validators.required],
    password: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(8)]],
    confirmPassword: ['', Validators.required]
  });
  isSuccess: boolean;
  isError: boolean;
  userId: string;
  checkPassword: boolean;
  
  constructor( private formBuilder: FormBuilder, private route: ActivatedRoute, private userService: UserService, private authService: AuthService ) { }

  ngOnInit(): void {
    if (this.authService.loggedInUser.value) {
      this.userId = this.authService.loggedInUser.value.username;
    }
  }

  get resetForm() {
    return this.resetPass.controls;
  }

  get oldPassword() {
    return this.resetForm['oldPassword'];
  }

  get password() {
    return this.resetForm['password'];
  }

  get confirmPassword() {
    return this.resetForm['confirmPassword']
  }

  matchPassword() {
    if (this.resetForm && this.confirmPassword && this.confirmPassword.value && this.confirmPassword.value.length>0) {
      if (this.confirmPassword.value===this.password.value)
      this.checkPassword = true;
      else
      this.checkPassword = false;
    }
  }

  reset() {
    if (this.resetPass.valid && this.checkPassword) {
      const pass = {
        username: this.userId,
        newPassword: this.password.value,
        oldPassword: this.oldPassword.value
      }
      this.userService.updatePassword(pass).subscribe(data => {
        if (data)
        this.isSuccess = true;
        else
        window.alert("Incorrect password");
      }, () => this.isError = true);
    }
  }
}

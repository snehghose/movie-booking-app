import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent implements OnInit {

  userDetails: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]]
  });
  user: User;
  isSuccess: boolean;
  isError: boolean;

  constructor( private formBuilder: FormBuilder, private authService: AuthService, private userService:UserService ) { }

  ngOnInit(): void {
    if (this.authService.loggedInUser.value) {
      this.user = this.authService.loggedInUser.value;
      this.userDetails.patchValue({
        email: this.user.email
      });
    }
  }

  get editDetails() {
    return this.userDetails.controls;
  }

  get email() {
    return this.editDetails['email'];
  }

  submit() {
    if (this.userDetails.value) {
      this.user.email = this.email.value;
      this.userService.updateEmail(this.user).subscribe(data => 
        this.isSuccess = true,
        () => this.isError = true
      );
    }
  }

}

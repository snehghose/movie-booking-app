import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './models/user.model';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'movie-booking-app';
  loggedInUser: User = null;

  constructor( private http: HttpClient, private authService: AuthService ) {};

  ngOnInit(): void {
    this.authService.loggedInUser.subscribe( user => {
      this.loggedInUser = user;
    });
  };
  
}

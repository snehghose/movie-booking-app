import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role, User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedInUser: User = null;

  constructor( private router: Router, private authService: AuthService ) { }

  ngOnInit(): void {
    this.authService.loggedInUser.subscribe( user => this.loggedInUser = user);
  }

  logout() {
    this.authService.logout();
  }

  home() {
    if (this.authService.loggedInUser.value) {
      if (this.authService.loggedInUser.value.role === Role.ROLE_ADMIN)
      this.router.navigate(['/admin']);
      else
      this.router.navigate(['/user']);
    } else {
      this.router.navigate(['/']);
    }
  }
}

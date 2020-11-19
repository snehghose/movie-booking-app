import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor( private authService: AuthService, private router: Router ) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    const role = route.data['role'];
    return this.checkLogin(role);
  }

  checkLogin(role: Role): boolean {
    const loggedInUser = this.authService.loggedInUser.value;
    if (loggedInUser) {
      if (loggedInUser.role === role) {
        return true;
      } else {
        if (!role) {
          return true;
        } else {
          this.router.navigate(['/unauthorized']);
        }
      }
    } else {
      this.router.navigate(['/login']);
    }
    return false;
  }
}

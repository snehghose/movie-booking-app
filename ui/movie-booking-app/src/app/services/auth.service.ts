import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _baseUrl = `${environment.baseUrl}/user-authentication-service`;

  loggedInUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  private _token: string = '';

  constructor( private http: HttpClient, private router: Router ) { }

  getToken(): string {
    return this._token;
  }

  setToken(token: string) {
    this._token = token;
  }

  login(username: string, password: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Basic '+btoa(username+':'+password));
    return this.http.get(`${this._baseUrl}/authenticate`, {headers});
  }

  logout() {
    this.loggedInUser.next(null);
    this._token = null;
    this.router.navigate(["/login"]);
  }
}

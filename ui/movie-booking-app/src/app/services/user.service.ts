import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  _baseUrl = `${environment.baseUrl}/user-authentication-service/user`;

  constructor( private http: HttpClient ) { }

  getUserById(username: string): Observable<User> {
    return this.http.get<User>(`${this._baseUrl}/${username}`);
  }

  checkUserId(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${this._baseUrl}/check/${username}`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this._baseUrl}`, user);
  }

  updateEmail(user: User): Observable<User> {
    return this.http.put<User>(`${this._baseUrl}`, user);
  }

  updatePassword(pass: any): Observable<any> {
    return this.http.put<any>(`${this._baseUrl}/change-password`, pass);
  }
}

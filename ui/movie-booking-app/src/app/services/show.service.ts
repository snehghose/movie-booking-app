import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Show, ShowMap } from '../models/show.model';

@Injectable({
  providedIn: 'root'
})
export class ShowService {

  _baseUrl = `${environment.baseUrl}/movie-service/show`;

  constructor( private http: HttpClient ) { }

  getAllShows(): Observable<Show[]> {
    return this.http.get<Show[]>(`${this._baseUrl}`);
  }

  getShowById(showId: string): Observable<Show> {
    return this.http.get<Show>(`${this._baseUrl}/${showId}`);
  }

  getShowsByTheatreIdAndDate(theatreId: string, date: Date): Observable<Show[]> {
    return this.http.get<Show[]>(`${this._baseUrl}/theatre/${theatreId}/${date}`);
  }

  getShowsByMovieIdAndDate(movieId: string, date: Date): Observable<Show[]> {
    return this.http.get<Show[]>(`${this._baseUrl}/${movieId}/${date.toJSON().split('T')[0]}`);
  }

  addShow(show: Show): Observable<Show> {
    return this.http.post<Show>(`${this._baseUrl}`, show);
  }

  updateShow(show: Show): Observable<Show> {
    return this.http.put<Show>(`${this._baseUrl}`, show);
  }

  deleteShow(showId: string): Observable<any> {
    return this.http.delete<any>(`${this._baseUrl}/${showId}`);
  }

}

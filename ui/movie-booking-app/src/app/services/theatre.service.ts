import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Theatre } from '../models/theatre.model';

@Injectable({
  providedIn: 'root'
})
export class TheatreService {

  _baseUrl = `${environment.baseUrl}/movie-service/theatre`;

  constructor( private http: HttpClient ) { }

  getAllTheatres(): Observable<Theatre[]> {
    return this.http.get<Theatre[]>(`${this._baseUrl}`);
  }

  getTheatreById(theatreId: string): Observable<Theatre> {
    return this.http.get<Theatre>(`${this._baseUrl}/${theatreId}`);
  }

  getTheatresByCity(city: string): Observable<Theatre[]> {
    return this.http.get<Theatre[]>(`${this._baseUrl}/city/${city}`);
  }

  addTheatre(theatre: Theatre): Observable<Theatre> {
    return this.http.post<Theatre>(`${this._baseUrl}`, theatre);
  }

  updateTheatre(theatre: Theatre): Observable<Theatre> {
    return this.http.put<Theatre>(`${this._baseUrl}`, theatre);
  }

  deleteTheatre(theatreId: string): Observable<any> {
    return this.http.delete<any>(`${this._baseUrl}/${theatreId}`);
  }
}

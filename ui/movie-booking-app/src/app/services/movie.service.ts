import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  
  _baseUrl = `${environment.baseUrl}/movie-service/movie`;

  constructor( private http: HttpClient ) { }

  getAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this._baseUrl}`);
  }
  
  getMovieById(movieId: string): Observable<Movie> {
    return this.http.get<Movie>(`${this._baseUrl}/${movieId}`);
  }

  getMoviesByLanguage(language: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this._baseUrl}/language/${language}`);
  }

  getMoviesByGenre(genre: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this._baseUrl}/genre/${genre}`);
  }

  addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this._baseUrl}`, movie);
  }

  updateMovie(movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(`${this._baseUrl}`, movie);
  }

  deleteMovie(movieId: string): Observable<any> {
    return this.http.delete<any>(`${this._baseUrl}/${movieId}`);
  }
}

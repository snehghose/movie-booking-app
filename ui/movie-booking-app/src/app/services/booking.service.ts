import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Booking } from '../models/booking.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  _baseUrl = `${environment.baseUrl}/movie-service/booking`;

  constructor( private http: HttpClient ) { }

  getBookingById(bookingId: string): Observable<Booking> {
    return this.http.get<Booking>(`${this._baseUrl}/${bookingId}`);
  }

  addBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(`${this._baseUrl}`, booking);
  }
}

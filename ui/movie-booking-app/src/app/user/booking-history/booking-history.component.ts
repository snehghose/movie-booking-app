import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/models/booking.model';
import { AuthService } from 'src/app/services/auth.service';
import { BookingService } from 'src/app/services/booking.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css']
})
export class BookingHistoryComponent implements OnInit {

  bookings: Booking[]

  constructor( private authService: AuthService, private bookingService: BookingService, private userService: UserService ) { }

  ngOnInit(): void {
    if (this.authService.loggedInUser.value) {
      this.bookings = []
      this.userService.getUserById(this.authService.loggedInUser.value.username).subscribe(user => {
        user.bookings.forEach(bookingId => {
          this.bookingService.getBookingById(bookingId).subscribe(booking => this.bookings.push(booking));
        })
        this.bookings.sort((a, b) => a.bookingDate<b.bookingDate?-1:1);
      });
    }
  }

}

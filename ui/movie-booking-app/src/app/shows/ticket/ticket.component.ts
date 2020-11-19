import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Booking } from 'src/app/models/booking.model';
import { Show } from 'src/app/models/show.model';
import { BookingService } from 'src/app/services/booking.service';
import { ShowService } from 'src/app/services/show.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  booking: Booking;
  show: Show;
  seats: string = "";

  constructor( private route: ActivatedRoute, private bookingService: BookingService, private showService: ShowService ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params) => {
      const bookingId = params['id'];
      this.bookingService.getBookingById(bookingId).subscribe(data => {
        this.booking = data;
        
        this.showService.getShowById(this.booking.showId).subscribe(show => {
          this.show = show
        });
        
        for (var i=0;i<this.booking.noOfSeats;i++)
        this.seats += " A"+(this.booking.seat+i)+",";
        this.seats = this.seats.substr(0,this.seats.length-1);
      });
    })
  }

}

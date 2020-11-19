import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Booking } from 'src/app/models/booking.model';
import { Show } from 'src/app/models/show.model';
import { AuthService } from 'src/app/services/auth.service';
import { BookingService } from 'src/app/services/booking.service';
import { MovieService } from 'src/app/services/movie.service';
import { ShowService } from 'src/app/services/show.service';
import { TheatreService } from 'src/app/services/theatre.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  addBooking: FormGroup = new FormGroup({
    'noOfSeats': new FormControl(null, [Validators.required, Validators.min(1)])
  });
  newBooking: Booking;
  userId: string;
  theatreName: string;
  movieName: string;
  showId: string;
  total: number = 0;
  show: Show;
  isError: boolean;

  constructor( private route: ActivatedRoute, private router: Router, private showService: ShowService, 
    private theatreService: TheatreService, private movieService: MovieService,
    private bookingService: BookingService, private authService: AuthService ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params) => {
      this.showId = params['id'];
      
      this.showService.getShowById(this.showId).subscribe(shw => {
        this.show = shw;
        this.theatreService.getTheatreById(this.show.theatreId).subscribe(theatre => {
          this.theatreName = theatre.name;
        });
        this.movieService.getMovieById(this.show.movieId).subscribe(movie => {
          this.movieName = movie.name;
        });
        if(this.authService.loggedInUser.value)
        this.userId = this.authService.loggedInUser.value.username;
        else
        this.router.navigate(['/login']);
      });
    });
  }

  onChangeTotal() {
    this.total = this.addBooking.value.noOfSeats * this.show.ticketPrice;
  }

  onSubmitAddBooking() {
    this.newBooking = {
      userId: this.userId,
      noOfSeats: this.addBooking.value.noOfSeats,
      theatreName: this.theatreName,
      movieName: this.movieName,
      showId: this.showId,
      total: this.total
    }
    this.bookingService.addBooking(this.newBooking).subscribe(data => {
      this.router.navigate(['/ticket',data.id])},
      () => this.isError = true
    );
  }

}

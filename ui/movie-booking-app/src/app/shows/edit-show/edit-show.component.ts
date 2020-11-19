import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Movie } from 'src/app/models/movie.model';
import { Show } from 'src/app/models/show.model';
import { Theatre } from 'src/app/models/theatre.model';
import { MovieService } from 'src/app/services/movie.service';
import { ShowService } from 'src/app/services/show.service';
import { TheatreService } from 'src/app/services/theatre.service';

@Component({
  selector: 'app-edit-show',
  templateUrl: './edit-show.component.html',
  styleUrls: ['./edit-show.component.css']
})
export class EditShowComponent implements OnInit {

  editShow:FormGroup = this.formBuilder.group({
    date: ['', Validators.required],
    startTime: ['', Validators.required],
    ticketPrice: ['', [Validators.required, Validators.min(0)]]
  });
  movie: Movie;
  theatre: Theatre;
  show: Show;
  isSuccess = false;
  isError = false;

  constructor( private formBuilder: FormBuilder, private route: ActivatedRoute, private showService: ShowService, private theatreService: TheatreService, private movieService: MovieService ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const showId = params['id'];
      this.showService.getShowById(showId).subscribe((show: Show) => {
        this.show = show;
        if (this.show) {
          this.movieService.getMovieById(this.show.movieId).subscribe(movie => this.movie = movie);
          this.theatreService.getTheatreById(this.show.theatreId).subscribe(theatre => this.theatre = theatre);
          
          this.editShow.patchValue({
            date: this.show.date,
            startTime: this.show.startTime,
            ticketPrice: this.show.ticketPrice
          });
        }
      });
    });
  }

  get editForm() {
    return this.editShow.controls;
  }

  get date() {
    return this.editForm['date']
  }

  get startTime() {
    return this.editForm['startTime']
  }

  get ticketPrice() {
    return this.editForm['ticketPrice'];
  }

  onSubmit() {
    if (this.editShow.value) {
      this.show.date = this.date.value,
      this.show.startTime = this.startTime.value,
      this.show.ticketPrice = this.ticketPrice.value
      
      this.showService.updateShow(this.show).subscribe((data) =>
          this.isSuccess = true,
        () => this.isError = true
      );
    }
  }

}

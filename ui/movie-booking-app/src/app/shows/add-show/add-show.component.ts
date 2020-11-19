import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Movie } from 'src/app/models/movie.model';
import { Show } from 'src/app/models/show.model';
import { Theatre } from 'src/app/models/theatre.model';
import { MovieService } from 'src/app/services/movie.service';
import { ShowService } from 'src/app/services/show.service';
import { TheatreService } from 'src/app/services/theatre.service';

@Component({
  selector: 'app-add-show',
  templateUrl: './add-show.component.html',
  styleUrls: ['./add-show.component.css']
})
export class AddShowComponent implements OnInit {

  addShow:FormGroup = this.formBuilder.group({
    movie: [null, Validators.required],
    theatre: [null, Validators.required],
    date: ['', Validators.required],
    startTime: ['', Validators.required],
    ticketPrice: ['0', [Validators.required, Validators.min(0)]]
  });
  movies: Movie[];
  theatres: Theatre[];
  isSuccess = false;
  isError = false;

  constructor( private formBuilder: FormBuilder, private showService: ShowService, private theatreService: TheatreService, private movieService: MovieService ) { }

  ngOnInit(): void {
    this.theatreService.getAllTheatres().subscribe(theatres => this.theatres = theatres);
    this.movieService.getAllMovies().subscribe(movies => this.movies = movies);
  }

  get addForm() {
    return this.addShow.controls;
  }

  get movie() {
    return this.addForm['movie'];
  }

  get theatre() {
    return this.addForm['theatre'];
  }

  get date() {
    return this.addForm['date']
  }

  get startTime() {
    return this.addForm['startTime']
  }

  get ticketPrice() {
    return this.addForm['ticketPrice'];
  }

  onSubmit() {
    if (this.addShow.value) {
      const newShow: Show = {
        movieId: this.movie.value,
        theatreId: this.theatre.value,
        date: this.date.value,
        startTime: this.startTime.value,
        ticketPrice: this.ticketPrice.value
      }
      
      this.showService.addShow(newShow).subscribe((data) => {
      if(data)
          {this.isSuccess = true; this.isError=false;}
          else
          {this.isError = true; this.isSuccess=false;}},
        () => this.isError = true
      );
    }
  }

}

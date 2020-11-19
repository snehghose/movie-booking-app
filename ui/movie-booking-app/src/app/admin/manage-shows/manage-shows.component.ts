import { Component, OnInit } from '@angular/core';
import { DisplayShow, Show } from 'src/app/models/show.model';
import { MovieService } from 'src/app/services/movie.service';
import { ShowService } from 'src/app/services/show.service';
import { TheatreService } from 'src/app/services/theatre.service';

@Component({
  selector: 'app-manage-shows',
  templateUrl: './manage-shows.component.html',
  styleUrls: ['./manage-shows.component.css']
})
export class ManageShowsComponent implements OnInit {

  displayShows: DisplayShow[]

  constructor( private showService: ShowService, private theatreService: TheatreService, private movieService: MovieService ) { }

  ngOnInit(): void {
    this.showService.getAllShows().subscribe(shows => {
      this.displayShows = []
      shows.forEach(show => {
        var time = show.startTime+" hours";
        var movie: string;
        var theatre: string;
        var sold: number;
        this.movieService.getMovieById(show.movieId).subscribe(data => {
          movie = data.name;
          this.theatreService.getTheatreById(show.theatreId).subscribe(data =>  {
            theatre = data.name;
            sold = data.totalSeats - show.remainingSeats;
            this.displayShows.push({show, movie, theatre, time, sold});
          });
        });
      });
    });
  }

  delete(show: Show) {
    this.showService.deleteShow(show.id).subscribe((data) => {
      if (data)
      window.alert("The Show cannot be deleted as it is running within the next 3 days");
      else
      this.showService.getAllShows().subscribe(shows => {
        this.displayShows = [];
        shows.forEach(show => {
          
          var time = show.startTime + " hours";
          var movie: string;
          var theatre: string;
          var sold: number;
          this.movieService.getMovieById(show.movieId).subscribe(data => {
            movie = data.name;
            this.theatreService.getTheatreById(show.theatreId).subscribe(data =>  {
              theatre = data.name;
              sold = data.totalSeats - show.remainingSeats;
              this.displayShows.push({show, movie, theatre, time, sold});
            });
          });
        })
      });
    });
  }

}

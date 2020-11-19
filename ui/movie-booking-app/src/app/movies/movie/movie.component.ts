import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movie: Movie;

  constructor( private route: ActivatedRoute, private movieService: MovieService ) { };

  ngOnInit(): void {
    this.route.params.subscribe((params:Params) => {
      const movieId = params['id'];
      this.movieService.getMovieById(movieId).subscribe(movie => {
        this.movie = movie;
      });
    });
  };

}

import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-manage-movies',
  templateUrl: './manage-movies.component.html',
  styleUrls: ['./manage-movies.component.css']
})
export class ManageMoviesComponent implements OnInit {

  movies: Movie[];

  constructor( private movieService: MovieService ) { }

  ngOnInit(): void {
    this.movieService.getAllMovies().subscribe(movies => this.movies = movies);
  }

  delete(movie: Movie) {
    this.movieService.deleteMovie(movie.id).subscribe((data) => {
      if (data)
      window.alert("The Movie cannot be deleted as it is connected to one or more Shows. Delete the Shows first then delete the Movie");
      else
      this.movieService.getAllMovies().subscribe(movies => this.movies = movies);
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movies: Movie[];

  constructor( private router: Router, private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getAllMovies().subscribe( movieList => {
      this.movies = movieList;
    });
  }

}

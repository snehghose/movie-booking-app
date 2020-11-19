package com.project.movie.controllers;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.movie.entities.Movie;
import com.project.movie.services.MovieService;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/movie")
public class MovieController {

	private final MovieService movieService;

	public MovieController(MovieService movieService) {
		this.movieService = movieService;
	}
	
	@GetMapping
	public Flux<Movie> getAllMovies() {
		return movieService.findAll();
	}
	
	@GetMapping("/{movieId}")
	public Mono<Movie> findById(@PathVariable String movieId) {
		return movieService.findById(movieId);
	}
	
	@GetMapping("/language/{language}")
	public Flux<Movie> findByLanguage(@PathVariable String language) {
		return movieService.findByLanguage(language);
	}
	
	@GetMapping("/genre/{genre}")
	public Flux<Movie> findByGenre(@PathVariable String genre) {
		return movieService.findByGenre(genre);
	}
	
	@PostMapping
	public Mono<Movie> addMovie(@RequestBody Movie movie) {
		return movieService.addMovie(movie);
	}
	
	@DeleteMapping("/{movieId}")
	public Mono<?> deleteMovie(@PathVariable String movieId) {
		return movieService.deleteMovie(movieId);
	}
	
	@PutMapping
	public Mono<Movie> updateMovie(@RequestBody Movie movie) {
		return movieService.updateMovie(movie);
	}
}

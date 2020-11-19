package com.project.movie.services;

import com.project.movie.entities.Movie;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface MovieService {
	
	public Flux<Movie> findAll();

	public Mono<Movie> findById(String movieId);
	
	public Flux<Movie> findByLanguage(String language);
	
	public Flux<Movie> findByGenre(String genre);
	
	public Mono<Movie> addMovie(Movie movie);
	
	public Mono<?> deleteMovie(String movieId);
	
	public Mono<Movie> updateMovie(Movie movie);
}

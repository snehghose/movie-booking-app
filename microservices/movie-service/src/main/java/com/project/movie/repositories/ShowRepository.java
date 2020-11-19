package com.project.movie.repositories;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

import com.project.movie.entities.Show;

import reactor.core.publisher.Flux;

public interface ShowRepository extends ReactiveMongoRepository<Show, String> {

	Flux<Show> findByMovieId(String movieId);
	
	Flux<Show> findByTheatreId(String theatreId);

	Flux<Show> findByTheatreIdAndDate(String theatreId, String date);
	
	Flux<Show> findByMovieIdAndDate(String movieId, String date);
}

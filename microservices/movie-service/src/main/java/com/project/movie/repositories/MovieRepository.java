package com.project.movie.repositories;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

import com.project.movie.entities.Movie;

import reactor.core.publisher.Flux;

public interface MovieRepository extends ReactiveMongoRepository<Movie, String> {
	
	Flux<Movie> findByLanguage(String language);
	
	Flux<Movie> findByGenre(String genre);

}

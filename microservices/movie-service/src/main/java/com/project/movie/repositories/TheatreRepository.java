package com.project.movie.repositories;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

import com.project.movie.entities.Theatre;

import reactor.core.publisher.Flux;

public interface TheatreRepository extends ReactiveMongoRepository<Theatre, String> {

	Flux<Theatre> findByCity(String city);
}

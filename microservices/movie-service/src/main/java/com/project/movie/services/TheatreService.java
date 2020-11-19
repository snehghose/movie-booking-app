package com.project.movie.services;

import com.project.movie.entities.Theatre;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface TheatreService {
	
	public Mono<Theatre> getTheatreById(String theatreId);
	
	public Flux<Theatre> getAllTheatres();
	
	public Flux<Theatre> getTheatreByCity(String city);
	
	public Mono<Theatre> addTheatre(Theatre theatre);
	
	public Mono<Theatre> updateTheatre(Theatre theatre);
	
	public Mono<?> deleteTheatre(String theatreId);

}

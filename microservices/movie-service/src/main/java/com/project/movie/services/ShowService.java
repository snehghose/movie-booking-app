package com.project.movie.services;

import com.project.movie.entities.Show;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ShowService {

	public Mono<?> deleteShow(String showId);
	
	public Flux<Show> getAllShows();
	
	public Flux<Show> getShowByDate(String theatreId, String date);
	
	public Flux<Show> getShowByMovieIdAndDate(String movieId, String date);
	
	public Mono<Show> updateShow(Show show);

	public Mono<Show> addShow(Show newShow);
	
	public Mono<Show> getShowById(String showId);

}

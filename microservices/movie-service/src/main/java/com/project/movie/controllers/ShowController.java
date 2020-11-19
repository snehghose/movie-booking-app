package com.project.movie.controllers;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.movie.entities.Show;
import com.project.movie.services.ShowService;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/show")
public class ShowController {
	
	private final ShowService showService;
	
	public ShowController(ShowService showService) {
		this.showService = showService;
	}

	@PostMapping
	public Mono<Show> addShow(@RequestBody Show show) {
		return showService.addShow(show);
	}
	
	@DeleteMapping("/{showId}")
	public Mono<?> deleteShow(@PathVariable String showId) {
		return showService.deleteShow(showId);
	}
	
	@GetMapping("/{showId}")
	public Mono<Show> getShowById(@PathVariable String showId) {
		return showService.getShowById(showId);
	}
	
	@GetMapping("/theatre/{theatreId}/{date}")
	public Flux<Show> getShowByDate(@PathVariable String theatreId, @PathVariable String date) {
		return showService.getShowByDate(theatreId, date);
	}
	
	@GetMapping("/{movieId}/{date}")
	public Flux<Show> getShowByMovieAndDate(@PathVariable String movieId, @PathVariable String date) {
		return showService.getShowByMovieIdAndDate(movieId, date);
	}
	
	@PutMapping
	public Mono<Show> updateShow(@RequestBody Show show) {
		return showService.updateShow(show);
	}
	
	@GetMapping
	public Flux<Show> getAllShows() {
		return showService.getAllShows();
	}

}

package com.project.movie.controllers;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.movie.entities.Theatre;
import com.project.movie.services.TheatreService;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/theatre")
public class TheatreController {

	private final TheatreService theatreService;

	public TheatreController(TheatreService theatreService) {
		this.theatreService = theatreService;
	}
	
	@GetMapping
	public Flux<Theatre> getAllTheatres() {
		return theatreService.getAllTheatres();
	}
	
	@GetMapping("/{theatreId}")
	public Mono<Theatre> getTheatreById(@PathVariable String theatreId) {
		return theatreService.getTheatreById(theatreId);
	}
	
	@GetMapping("/city/{city}")
	public Flux<Theatre> getTheatreByCity(@PathVariable String city) {
		return theatreService.getTheatreByCity(city);
	}
	
	@PostMapping
	public Mono<Theatre> addTheatre(@RequestBody Theatre theatre) {
		return theatreService.addTheatre(theatre);
	}
	
	@PutMapping
	public Mono<Theatre> updateTheatre(@RequestBody Theatre theatre) {
		return theatreService.updateTheatre(theatre);
	}
	
	@DeleteMapping("/{theatreId}")
	public Mono<?> deleteTheatre(@PathVariable String theatreId) {
		return theatreService.deleteTheatre(theatreId);
	}
	
}

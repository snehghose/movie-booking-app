package com.project.movie.services;

import org.springframework.stereotype.Service;

import com.project.movie.entities.Theatre;
import com.project.movie.repositories.ShowRepository;
import com.project.movie.repositories.TheatreRepository;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class TheatreServiceImpl implements TheatreService {
	
	private final TheatreRepository theatreRepository;
	
	private final ShowRepository showRepository;
	
	public TheatreServiceImpl(TheatreRepository theatreRepository, ShowRepository showRepository) {
		this.theatreRepository = theatreRepository;
		this.showRepository = showRepository;
	}

	@Override
	public Flux<Theatre> getTheatreByCity(String city) {
		return theatreRepository.findByCity(city);
	}

	@Override
	public Mono<Theatre> addTheatre(Theatre theatre) {
		return theatreRepository.save(theatre);
	}

	@Override
	public Mono<Theatre> updateTheatre(Theatre theatre) {
		return theatreRepository.save(theatre);
	}

	@Override
	public Mono<?> deleteTheatre(String theatreId) {
		if (showRepository.findByTheatreId(theatreId).hasElements().toProcessor().block() == false)
			return theatreRepository.deleteById(theatreId);
		return theatreRepository.findById(theatreId);
			
	}

	@Override
	public Flux<Theatre> getAllTheatres() {
		return theatreRepository.findAll().sort((theatre1, theatre2) -> theatre1.getName().compareTo(theatre2.getName()));
	}

	@Override
	public Mono<Theatre> getTheatreById(String theatreId) {
		return theatreRepository.findById(theatreId);
	}

}

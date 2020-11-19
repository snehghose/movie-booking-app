package com.project.movie.services;

import org.springframework.stereotype.Service;

import com.project.movie.entities.Movie;
import com.project.movie.entities.Show;
import com.project.movie.repositories.MovieRepository;
import com.project.movie.repositories.ShowRepository;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class MovieServiceImpl implements MovieService {

	private final MovieRepository movieRepository;
	
	private final ShowRepository showRepository;
	
	public MovieServiceImpl(MovieRepository movieRepository, ShowRepository showRepository) {
		this.movieRepository = movieRepository;
		this.showRepository = showRepository;
	}

	@Override
	public Mono<Movie> findById(String movieId) {
		return movieRepository.findById(movieId);
	}

	@Override
	public Flux<Movie> findByLanguage(String language) {
		return movieRepository.findByLanguage(language);
	}

	@Override
	public Flux<Movie> findByGenre(String genre) {
		return movieRepository.findByGenre(genre);
	}

	@Override
	public Mono<Movie> addMovie(Movie movie) {
		return movieRepository.save(movie);
	}

	@Override
	public Mono<?> deleteMovie(String movieId) {
		Flux<Show> shows = showRepository.findByMovieId(movieId);
		if (shows.hasElements().toProcessor().block()==false){
			return movieRepository.deleteById(movieId);
		}
		return showRepository.findByMovieId(movieId).hasElements();
	}

	@Override
	public Mono<Movie> updateMovie(Movie movie) {
		return movieRepository.save(movie);
	}

	@Override
	public Flux<Movie> findAll() {
		return movieRepository.findAll().sort((movie1, movie2) -> movie1.getName().compareTo(movie2.getName()));
	}

}

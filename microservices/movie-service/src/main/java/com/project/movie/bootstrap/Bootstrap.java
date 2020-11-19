package com.project.movie.bootstrap;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.Set;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.project.movie.entities.City;
import com.project.movie.entities.Genre;
import com.project.movie.entities.Language;
import com.project.movie.entities.Movie;
import com.project.movie.entities.Theatre;
import com.project.movie.repositories.MovieRepository;
import com.project.movie.repositories.TheatreRepository;
import com.project.movie.services.MovieService;
import com.project.movie.services.TheatreService;

@Component
public class Bootstrap implements CommandLineRunner {

	private final MovieService movieService;
	
	private final TheatreService theatreService;
	
	private final MovieRepository movieRepository;
	
	private final TheatreRepository theatreRepository;
	
	public Bootstrap(MovieService movieService, TheatreService theatreService, MovieRepository movieRepository, TheatreRepository theatreRepository) {
		this.movieService = movieService;
		this.theatreService = theatreService;
		this.movieRepository = movieRepository;
		this.theatreRepository = theatreRepository;
	}

	@Override
	public void run(String... args) throws Exception {
		if (movieRepository.count().block() == 0)
		loadMovies();
		if (theatreRepository.count().block() == 0)
		loadTheatre();
	}
	
	private void loadTheatre() {
		Theatre theatre = new Theatre();
		theatre.setCity(City.KOLKATA);
		theatre.setName("Def");
		theatreService.addTheatre(theatre).block();
	}
	
	private void loadMovies() {
		Movie movie = new Movie();
		movie.setName("The Birth of a Nation");
		movie.setImage("https://flxt.tmsimg.com/assets/p170620_p_v11_az.jpg");
		movie.setDuration(LocalTime.of(2, 45));
		Set<Genre> genre = new HashSet<>();
		genre.add(Genre.DRAMA);
		genre.add(Genre.ACTION);
		movie.setGenre(genre);
		movie.setLanguage(Language.ENGLISH);
		movie.setPlot("Two brothers, Phil and Ted Stoneman, visit their friends in Piedmont, South Carolina: the family Cameron. This friendship is affected by the Civil War, as the Stonemans and the Camerons must join up opposite armies. The consequences of the War in their lives are shown in connection to major historical events, like the development of the Civil War itself, Lincoln's assassination, and the birth of the Ku Klux Klan.");
		movie.setRating(6.8);
		movie.setReleaseDate(LocalDate.of(1915, 9, 11));
		movieService.addMovie(movie).block();
	}

}

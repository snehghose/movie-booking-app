package com.project.movie.services;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.List;

import org.springframework.stereotype.Service;

import com.project.movie.entities.Show;
import com.project.movie.repositories.ShowRepository;
import com.project.movie.repositories.TheatreRepository;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class ShowServiceImpl implements ShowService {
	
	private final TheatreRepository theatreRepository;

	private final ShowRepository showRepository;
	
	public ShowServiceImpl(TheatreRepository theatreRepository, ShowRepository showRepository) {
		this.theatreRepository = theatreRepository;
		this.showRepository = showRepository;
	}

	@Override
	public Mono<Show> addShow(Show newShow) {
		List<Show> showList = showRepository.findByTheatreIdAndDate(newShow.getTheatreId(), newShow.getDate()).collectList().toProcessor().block();
		newShow.setRemainingSeats(theatreRepository.findById(newShow.getTheatreId()).toProcessor().block().getTotalSeats());
		LocalTime time = LocalTime.parse(newShow.getStartTime()).plus(Duration.ofHours(3));
		newShow.setEndTime(time.toString());
		if (checkConflict(showList, newShow))
			return showRepository.save(newShow);
		else
			return Mono.empty();
	}
	
	public boolean checkConflict(List<Show> shows, Show newShow) {
		LocalTime st = LocalTime.parse(newShow.getStartTime());
		LocalTime et = LocalTime.parse(newShow.getEndTime());
		for ( Show show : shows ) {
			if((newShow.getId()==null || !newShow.getId().equals(show.getId())) && show.getDate().equals(newShow.getDate())) {
				LocalTime st1 = LocalTime.parse(show.getStartTime());
				LocalTime et1 = LocalTime.parse(show.getEndTime());
				if (st1.equals(st)) {
					return false;
				}
				
				if (st1.isBefore(st) && et1.isAfter(st)) {
					return false;
				}
					
				if (st1.isBefore(et) && et1.isAfter(et)) {
					return false;
				}
				
				if (st1.isBefore(st) && et1.isAfter(et)) {
					return false;
				}
				
				if (st1.isAfter(et) && et1.isBefore(et)) {
					return false;
				}
			}
		}
		return true;
	}

	@Override
	public Mono<?> deleteShow(String showId) {
		Show show = showRepository.findById(showId).toProcessor().block();
		if (LocalDate.parse(show.getDate()).isAfter(LocalDate.now().plusDays(2)) || LocalDate.parse(show.getDate()).isBefore(LocalDate.now()))
			return showRepository.deleteById(showId);
		return showRepository.findById(showId);
	}

	@Override
	public Flux<Show> getShowByDate(String theatreId, String date) {
		return showRepository.findByTheatreIdAndDate(theatreId, date);
	}

	@Override
	public Mono<Show> updateShow(Show newShow) {
		List<Show> showList = showRepository.findByTheatreIdAndDate(newShow.getTheatreId(), newShow.getDate()).collectList().toProcessor().block();
		LocalTime time = LocalTime.parse(newShow.getStartTime()).plus(Duration.ofHours(3));
		newShow.setEndTime(time.toString());
		if (checkConflict(showList, newShow))
			return showRepository.save(newShow);
		else
			return Mono.empty();
	}

	@Override
	public Flux<Show> getShowByMovieIdAndDate(String movieId, String date) {
		System.out.println(LocalTime.now());
		System.out.println(LocalDate.parse(date));
		System.out.println(showRepository.findByMovieIdAndDate(movieId, date).collectList().toProcessor().block());
		if (LocalDate.parse(date).equals(LocalDate.now()))
			return showRepository.findByMovieIdAndDate(movieId, date).filter(show -> {
				return LocalTime.parse(show.getStartTime()).isAfter(LocalTime.now(ZoneId.of("Asia/Kolkata")));
			});
		else
		return showRepository.findByMovieIdAndDate(movieId, date);
	}

	@Override
	public Mono<Show> getShowById(String showId) {
		return showRepository.findById(showId);
	}

	@Override
	public Flux<Show> getAllShows() {
		return showRepository.findAll().sort((show1, show2) -> {
			if (show1.getDate().compareTo(show2.getDate()) != 0 )
				return show1.getDate().compareTo(show2.getDate());
			else
				return show1.getStartTime().compareTo(show2.getStartTime());
		});
	}

}

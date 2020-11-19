package com.project.movie.services;

import java.time.LocalDate;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.project.movie.entities.Booking;
import com.project.movie.entities.Show;
import com.project.movie.entities.User;
import com.project.movie.repositories.BookingRepository;
import com.project.movie.repositories.ShowRepository;
import com.project.movie.repositories.TheatreRepository;

import reactor.core.publisher.Mono;

@Service
public class BookingServiceImpl implements BookingService {

	private final BookingRepository bookingRepository;
	
	private final ShowRepository showRepository;
	
	private final TheatreRepository theatreRepository;
	
	public BookingServiceImpl(BookingRepository bookingRepository, ShowRepository showRepository, TheatreRepository theatreRepository) {
		this.bookingRepository = bookingRepository;
		this.showRepository = showRepository;
		this.theatreRepository = theatreRepository;
	}

	@Override
	public Mono<Booking> addBooking(Booking booking, String authHeader) {
		booking.setTotal(booking.getNoOfSeats() * showRepository.findById(booking.getShowId()).toProcessor().block().getTicketPrice());
		booking.setBookingDate(LocalDate.now());
		Show show = showRepository.findById(booking.getShowId()).toProcessor().block();
		if (show.getRemainingSeats()<booking.getNoOfSeats()) {
			return Mono.empty();
		}
		booking.setSeat(theatreRepository.findById(show.getTheatreId()).toProcessor().block().getTotalSeats()-show.getRemainingSeats()+1);
		show.setRemainingSeats(show.getRemainingSeats() - booking.getNoOfSeats());
		showRepository.save(show).subscribe();
		WebClient webClient = WebClient.create("http://localhost:9000/user-authentication-service");
		Booking newBooking = bookingRepository.save(booking).toProcessor().block();
		webClient.post()
				.uri("/user/booking")
				.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
				.header(HttpHeaders.AUTHORIZATION, authHeader)
				.body(Mono.just(newBooking), Booking.class)
				.retrieve()
				.bodyToMono(User.class).subscribe();
		return Mono.just(newBooking);
	}

	@Override
	public Mono<Booking> getBooking(String bookingId) {
		return bookingRepository.findById(bookingId);
	}

}

package com.project.movie.services;

import com.project.movie.entities.Booking;
import com.project.movie.entities.User;

import reactor.core.publisher.Mono;

public interface BookingService {
	
	public Mono<Booking> getBooking(String bookingId);
	
	public Mono<Booking> addBooking(Booking booking, String authHeader);
	
}

package com.project.movie.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.movie.entities.Booking;
import com.project.movie.services.BookingService;

import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/booking")
public class BookingController {

	private final BookingService bookingService;
	
	public BookingController(BookingService bookingService) {
		this.bookingService = bookingService;
	}
	
	@GetMapping("/{bookingId}")
	public Mono<Booking> getBooking(@PathVariable String bookingId) {
		return bookingService.getBooking(bookingId);
	}

	@PostMapping
	public Mono<Booking> addBooking(@RequestBody Booking booking, @RequestHeader("Authorization") String authHeader) {
		return bookingService.addBooking(booking, authHeader);
	}
}

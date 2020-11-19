package com.project.movie.repositories;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

import com.project.movie.entities.Booking;

public interface BookingRepository extends ReactiveMongoRepository<Booking, String> {

}

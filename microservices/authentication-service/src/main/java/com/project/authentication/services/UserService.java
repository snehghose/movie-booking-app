package com.project.authentication.services;

import com.project.authentication.entities.Booking;
import com.project.authentication.entities.PasswordPOJO;
import com.project.authentication.entities.User;

import reactor.core.publisher.Mono;

public interface UserService {

	public Mono<User> findByUsername(String username);
	
	public Mono<Boolean> existsByUsername(String username);

	public Mono<User> addUser(User user);

	public Mono<User> updateUser(User user);

	public Mono<?> updatePassword(PasswordPOJO passwordPOJO) throws Exception;
	
	public Mono<User> addBooking(Booking booking);

}
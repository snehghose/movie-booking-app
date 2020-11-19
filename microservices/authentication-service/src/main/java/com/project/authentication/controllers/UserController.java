package com.project.authentication.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.authentication.entities.Booking;
import com.project.authentication.entities.PasswordPOJO;
import com.project.authentication.entities.User;
import com.project.authentication.services.UserService;

import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/user")
public class UserController {

	private final UserService userService;

	public UserController(UserService userService) {
		this.userService = userService;
	}
	
	@GetMapping("/{username}")
	public Mono<User> getUser(@PathVariable String username) {
		return userService.findByUsername(username);
	}
	
	@GetMapping("/check/{username}")
	public Mono<Boolean> checkUsername(@PathVariable String username) {
		return userService.existsByUsername(username);
	}

	@PostMapping
	public Mono<User> addUser(@RequestBody User user) {
		return userService.addUser(user);
	}

	@PutMapping
	public Mono<User> updateUser(@RequestBody User user) {
		return userService.updateUser(user);
	}

	@PutMapping("/change-password")
	public Mono<?> updatePassword(@RequestBody PasswordPOJO passwordPOJO) throws Exception {
		System.out.println(passwordPOJO);
		return userService.updatePassword(passwordPOJO);
	}
	
	@PostMapping("/booking")
	public Mono<User> addBooking(@RequestBody Booking booking) {
		return userService.addBooking(booking);
	}
}

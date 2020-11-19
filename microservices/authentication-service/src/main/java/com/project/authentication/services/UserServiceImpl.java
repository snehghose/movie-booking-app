package com.project.authentication.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.authentication.entities.Booking;
import com.project.authentication.entities.PasswordPOJO;
import com.project.authentication.entities.Role;
import com.project.authentication.entities.User;
import com.project.authentication.repositories.UserRepository;

import reactor.core.publisher.Mono;

@Service
public class UserServiceImpl implements UserService {
	
	private final UserRepository userRepository;
	
	private final PasswordEncoder passwordEncoder;
	
	public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}

	@Override
	public Mono<User> findByUsername(String username) {
		return userRepository.findById(username);
	}
	
	@Override
	public Mono<User> addUser(User user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		user.setRole(Role.ROLE_CUSTOMER);
		user.setBookings(new ArrayList<>());
		return userRepository.save(user);
	}
	
	@Override
	public Mono<User> updateUser(User user) {
		return userRepository.save(user);
	}
	
	@Override
	public Mono<?> updatePassword(PasswordPOJO passwordPOJO) throws Exception {
		User user = userRepository.findById(passwordPOJO.getUsername()).toProcessor().block();
		if (user == null) {
			throw new Exception("Unauthorized");
		}
		if (passwordEncoder.matches(passwordPOJO.getOldPassword(), user.getPassword())) {
			user.setPassword(passwordEncoder.encode(passwordPOJO.getNewPassword()));
			return userRepository.save(user);
		} else {
			return Mono.empty();
		}
	}
	
	@Override
	public Mono<User> addBooking(Booking booking) {
		User user = userRepository.findById(booking.getUserId()).toProcessor().block();
		List<String> bookingList = user.getBookings();
		bookingList.add(booking.getId());
		user.setBookings(bookingList);
		return userRepository.save(user);
	}

	@Override
	public Mono<Boolean> existsByUsername(String username) {
		return userRepository.existsById(username);
	}
}

package com.project.authentication.controllers;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.project.authentication.security.JwtAuthorizationFilter;
import com.project.authentication.services.UserService;

import reactor.core.publisher.Mono;

@RestController
public class AuthenticationController {

	private final JwtAuthorizationFilter jwtFilter;
	
	private final PasswordEncoder passwordEncoder;
	
	private final UserService userService;

	public AuthenticationController(JwtAuthorizationFilter jwtFilter, PasswordEncoder passwordEncoder,
			UserService userService) {
		this.jwtFilter = jwtFilter;
		this.passwordEncoder = passwordEncoder;
		this.userService = userService;
	}
	
	@GetMapping("/authenticate")
	public Mono<ResponseEntity<?>> login(@RequestHeader("Authorization") String authHeader) {
		byte[] auth = Base64.getDecoder().decode(authHeader.split(" ")[1]);
		String[] credentials = new String(auth).split(":");
		return userService.findByUsername(credentials[0]).map((userDetails) -> {
			if (passwordEncoder.matches(credentials[1], userDetails.getPassword())) {
				Map<String, String> response = new HashMap<>();
				response.put("token", jwtFilter.generateToken(userDetails));
				return ResponseEntity.ok(response);
			} else {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
			}
		}).defaultIfEmpty(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
	}
}

package com.project.authentication.security;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import reactor.core.publisher.Mono;

@Component
public class AuthenticationManager implements ReactiveAuthenticationManager {

	private final JwtAuthorizationFilter jwtFilter;
	
	public AuthenticationManager(JwtAuthorizationFilter jwtFilter) {
		this.jwtFilter = jwtFilter;
	}

	@Override
	public Mono<Authentication> authenticate(Authentication authentication) {
		String authToken = authentication.getCredentials().toString();
		try {
			if (!jwtFilter.validateToken(authToken)) {
				return Mono.empty();
			}
			Claims claims = jwtFilter.getAllClaimsFromToken(authToken);
			List<String> roles = new ArrayList<>();
			roles.add(claims.get("role", String.class));
			List<GrantedAuthority> authorities = new ArrayList<>();
			for (String roleString : roles) {
				authorities.add(new SimpleGrantedAuthority(roleString));
			}
			return Mono.just(new UsernamePasswordAuthenticationToken(claims.getSubject(), null, authorities));
		} catch (Exception e) {
			e.printStackTrace();
			return Mono.empty();
		}
	}

}

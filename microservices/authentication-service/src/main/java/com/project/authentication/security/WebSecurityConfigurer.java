package com.project.authentication.security;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.method.configuration.EnableReactiveMethodSecurity;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.server.SecurityWebFilterChain;

import reactor.core.publisher.Mono;

@EnableWebFluxSecurity
@EnableReactiveMethodSecurity
public class WebSecurityConfigurer{

	private final AuthenticationManager authenticationManager;
	
	private final SecurityContextRepository securityContextRepository;
	
	public WebSecurityConfigurer(AuthenticationManager authenticationManager,
			SecurityContextRepository securityContextRepository) {
		this.authenticationManager = authenticationManager;
		this.securityContextRepository = securityContextRepository;
	}

	@Bean
	public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
		return http.exceptionHandling()
				.authenticationEntryPoint((swe, e) -> {
					return Mono.fromRunnable(() -> {
						swe.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
					});
				}).accessDeniedHandler((swe, e) -> {
					return Mono.fromRunnable(() -> {
						swe.getResponse().setStatusCode(HttpStatus.FORBIDDEN);
					});
				}).and()
				.csrf().disable()
				.formLogin().disable()
				.httpBasic().disable()
				.authenticationManager(authenticationManager)
				.securityContextRepository(securityContextRepository)
				.authorizeExchange()
				.pathMatchers(HttpMethod.OPTIONS).permitAll()
				.pathMatchers("/authenticate").permitAll()
				.pathMatchers(HttpMethod.GET, "/user/**").permitAll()
				.pathMatchers(HttpMethod.POST, "/user").permitAll()
				.pathMatchers(HttpMethod.POST, "/user/booking").authenticated()
				.pathMatchers(HttpMethod.PUT, "/user/**").authenticated()
				.pathMatchers("/manager").hasRole("ADMIN")
				.anyExchange().authenticated()
				.and()
				.logout()
				.logoutUrl("/logout")
				.and().build();
				
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}

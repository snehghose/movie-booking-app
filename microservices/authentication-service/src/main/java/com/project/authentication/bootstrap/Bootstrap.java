package com.project.authentication.bootstrap;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.project.authentication.entities.Role;
import com.project.authentication.entities.User;
import com.project.authentication.repositories.UserRepository;
import com.project.authentication.services.UserService;

@Component
public class Bootstrap implements CommandLineRunner {
	
	private final UserService userService;
	
	private final UserRepository userRepository;

	public Bootstrap(UserService userService, UserRepository userRepository) {
		this.userService = userService;
		this.userRepository = userRepository;
	}

	@Override
	public void run(String... args) throws Exception {
		if (!userRepository.existsById("customer").block()) {
			User customer = new User("customer", "customer@email.com", Role.ROLE_CUSTOMER, "pass1234", null);
			userService.addUser(customer).block();
			User admin = new User("admin", "admin@email.com", Role.ROLE_ADMIN, "pass1234", null);
			userService.addUser(admin).block();
		}
	}

}

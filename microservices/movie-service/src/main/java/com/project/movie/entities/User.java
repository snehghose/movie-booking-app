package com.project.movie.entities;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Document(collection = "users")
public class User {

	@Id
	private String username;
	private String email;
	private Role role;
	private String password;
	private List<String> bookings;
}

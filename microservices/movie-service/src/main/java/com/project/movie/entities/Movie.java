package com.project.movie.entities;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Document(collection = "movies")
public class Movie {

	@Id
	private String id;
	private String name;
	private String image;
	private Set<Genre> genre;
	private Language language;
	private LocalDate releaseDate;
	private LocalTime duration;
	private Double rating;
	private String plot;

}


package com.project.movie.entities;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Document(collection = "shows")
public class Show {

	private String id;
	private String movieId;
	private String theatreId;
	private String date;
	private String startTime;
	private String endTime;
	private Integer remainingSeats;
	private Double ticketPrice;
}

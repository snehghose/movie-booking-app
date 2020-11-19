package com.project.authentication.entities;

import java.time.LocalDate;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Document(collection = "bookings")
public class Booking {

	@Id
	private String id;
	private String userId;
	private Integer noOfSeats;
	private String theatreName;
	private String movieName;
	private LocalDate bookingDate;
	private String showId;
	private Double total;
	private Integer seat;
}

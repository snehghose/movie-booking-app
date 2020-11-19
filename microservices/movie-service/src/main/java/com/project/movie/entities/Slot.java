package com.project.movie.entities;

import java.time.LocalTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Slot {

	private LocalTime startTime;
	private String showId;

}

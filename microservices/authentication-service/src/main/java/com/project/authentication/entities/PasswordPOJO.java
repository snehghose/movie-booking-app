package com.project.authentication.entities;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PasswordPOJO {

	private String username;
	
	private String newPassword;
	
	private String oldPassword;
}

package com.merchant.api.payload;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import lombok.Data;

@Data
public class SignUpRequest {
	 	@NotBlank
	    private String firstName;
	 	
	 	@NotBlank
	    private String lastName;

	    @NotBlank
	    @Email(message = "Email format not valid")
	    private String email;

	    @NotBlank
	    private String password;
}

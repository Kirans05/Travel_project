package com.merchant.api.payload;

import javax.validation.constraints.NotBlank;

import lombok.Data;

@Data
public class ChangePasswordRequest {
	@NotBlank
    private String password;
	private String token;
}

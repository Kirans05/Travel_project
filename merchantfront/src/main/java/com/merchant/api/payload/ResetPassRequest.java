package com.merchant.api.payload;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import lombok.Data;

@Data
public class ResetPassRequest {
	@NotBlank
    @Email
    private String email;
}

package com.merchant.api.payload;

import lombok.Data;

@Data
public class AuthResponse {
	private String accessToken;
    private String tokenType = "Bearer";
    private String message;
    private Boolean success = false;

    public AuthResponse(String accessToken) {
        this.accessToken = accessToken;
    }
    
    public AuthResponse(String accessToken, String message, Boolean success) {
    	this.accessToken = accessToken;
    	this.message = message;
    	this.success = success;
    }
}

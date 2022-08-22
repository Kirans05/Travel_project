package com.merchant.api.payment;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;

import lombok.Data;

@Data
@JsonRootName("authResponse")
public class AuthResponse {
	@JsonProperty(value = "txn_status")
    private String txnStatus;

    @JsonProperty(value = "txn_status_desc")
    private String txnStatusDesc;
    
    @JsonProperty(value = "response_code")
    private String responseCode;
    
    @JsonProperty(value = "auth_token")
    private String token;
}

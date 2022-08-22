package com.merchant.api.payment;
 

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;

import lombok.Data;


@Data
@JsonRootName(value = "auth_token")
public class AuthToken
{
    @JsonProperty(value = "merchant_id")
    private String merchantId;

    @JsonProperty(value = "terminal_id")
    private String terminalId;

    @JsonProperty(value = "checksum")
    private String checksum;
    
    @JsonProperty(value = "username")
    private String username;
    
    @JsonProperty(value = "secret")
    private String secret;
    
    @JsonProperty(value = "order_no")
    private String orderNo;
    
}

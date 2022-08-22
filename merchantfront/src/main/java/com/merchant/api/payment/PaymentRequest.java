package com.merchant.api.payment;

import java.math.BigDecimal;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.merchant.api.payment.CardDetails;
import com.merchant.api.payment.CustomerDetails;

import lombok.Data;

@Data
public class PaymentRequest extends AuthToken {

    private String currency;

    private BigDecimal amount;
    
    @JsonProperty(value = "card_details")
    private CardDetails cardDetails;
    
    @JsonProperty(value = "customer_details")
    private CustomerDetails customerDetails;
    
    @JsonProperty(value = "payment_mode")
    private String paymentMode;
    
    @JsonProperty(value = "card_type")
    private String cardType;

    @JsonProperty(value = "ref_desc")
    private String refDesc;
    
    @JsonProperty(value = "redirect_url")
    private String redirectUrl;
    
    @JsonProperty(value = "notification_url")
    private String notificationUrl;
    
    @JsonProperty(value = "txn_request_url")
    private String txnRequestUrl;
    
    @JsonProperty(value = "txn_request_ip")
    private String txnRequestIp;
}

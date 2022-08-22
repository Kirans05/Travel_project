package com.merchant.api.payment;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class PaymentResponse {
	@JsonProperty(value = "txn_status")
    private String txnStatus;

    @JsonProperty(value = "txn_status_desc")
    private String txnStatusDesc;
    
    @JsonProperty(value = "response_code")
    private String responseCode;
    
    @JsonProperty(value = "merchant_id")
    private UUID merchantId;
    
    @JsonProperty(value = "terminal_id")
    private UUID terminalId;
    
    @JsonProperty(value = "txn_id")
    private UUID transactionId;
    
    @JsonProperty(value = "billing_descriptor")
    private String billingDescriptor;
}

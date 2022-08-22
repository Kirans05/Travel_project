package com.merchant.api.model;

import lombok.Data;

@Data 
public class GatewayResponse {

	private String trackingId;
	
	private String billingDescriptor;
	
	private String status;
	
	private String responseCode;
	
	private String txnInfo;
}

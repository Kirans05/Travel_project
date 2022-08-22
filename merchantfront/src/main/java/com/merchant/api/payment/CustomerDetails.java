package com.merchant.api.payment;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;

import lombok.Data;

@Data
@JsonRootName("customer_details")
public class CustomerDetails {
	@JsonProperty("first_name")
	private String firstName;
	
	@JsonProperty("last_name")
	private String lastName;
	
	@JsonProperty("birth_date")
	private String birthDate;
	
	@JsonProperty("phone")
	private String phone;
	
	@JsonProperty("ip_adress")
	private String ipAddress;
	
	@JsonProperty("email")
	private String email;
	
	@JsonProperty("zip")
	private String zip;
	
	@JsonProperty("country")
	private String country;
	
	@JsonProperty("city")
	private String city;
	
	@JsonProperty("address")
	private String address;
	
	@JsonProperty("customer_id")
	private String customerId;

	@JsonProperty("state")
	private String state;
}

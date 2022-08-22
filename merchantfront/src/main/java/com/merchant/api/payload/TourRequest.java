package com.merchant.api.payload;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class TourRequest {
	private String name;
	private String description;
	private String imageUrl;
	private BigDecimal price;
	private String currency;
	private Integer availableQty;
	private String city;	
}

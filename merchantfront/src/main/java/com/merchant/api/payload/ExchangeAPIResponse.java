package com.merchant.api.payload;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Map;

import lombok.Data;


@Data
public class ExchangeAPIResponse {
	private String base;
	private Date date;
	private Map<String, BigDecimal> rates;
}

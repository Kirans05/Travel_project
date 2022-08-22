package com.merchant.api.payload;

import java.math.BigDecimal;
import java.util.Date;

import lombok.Data;


@Data
public class OrderRequest {
	private BigDecimal amount;
	private Integer quantity;
	private String currency;
	private String token;
	private Long userId;
	private Long productId;
	private String cardNumber;
	private String cardHolderName;
	private String cardExpiry;
	private String cardCvv;
	private Date fromDate;
	private Date toDate;
	private Integer adultQty;
	private Integer childQty;
}

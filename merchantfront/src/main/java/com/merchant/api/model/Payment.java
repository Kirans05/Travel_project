package com.merchant.api.model;

import java.math.BigDecimal;
import java.util.Date;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.hibernate.annotations.GenericGenerator;

import lombok.Data;

@Entity
@Data
public class Payment {
	@Id
	@GenericGenerator(name = "uuid2", strategy = "uuid2")
	@GeneratedValue(generator = "uuid2")
	@Column(columnDefinition = "BINARY(16)")
	private UUID id;
	
	private UUID orderId;
	
	private BigDecimal amount;
	
	private String currency;
	
	private Date created;
	
	private Date updated;
	
	private Boolean paid;
	
	private Boolean refund;
	
	private Boolean chargeback;
}

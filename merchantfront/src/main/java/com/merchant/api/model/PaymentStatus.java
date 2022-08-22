package com.merchant.api.model;

import java.util.Date;
import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;


@Entity
@Data
public class PaymentStatus {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

	private UUID paymentId;
	
	private String status;
	
	private Date created;
	
	private String trackingId;
	
	private String billingDescriptor;
	
	private String responseCode;
	
	private String txnInfo;
}

package com.merchant.api.model;

import java.math.BigDecimal;
import java.util.Date;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.GenericGenerator;

import lombok.Data;

@Entity
@Data
public class OrderMaster {
	@Id
	@GenericGenerator(name = "uuid2", strategy = "uuid2")
	@GeneratedValue(generator = "uuid2")
	@Column(columnDefinition = "BINARY(16)")
	private UUID orderId;

	private Long productId;

	private Long userId;
	
	private Integer quantity;
	
	private BigDecimal price;
		
	private Boolean paid;
	
	private Date created;
	
	private Date updated;
	
	private String status;

	private Date fromDate;

	private Date toDate;

	private Integer adultQty;

	private Integer childQty;
	
}

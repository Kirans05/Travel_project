package com.merchant.api.model;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.*;

import lombok.Data;

@Entity
@Data
public class Product {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	private String name;
	
	private String description;
	
	private String city;

	@Column(name="image_url")
	private String imageUrl;
	
	private Boolean active;
	
	private BigDecimal price;
	
	private String currency;

	@Column(name = "available_qty")
	private Integer availableQty;
	
	private Date created;
	
	private Date updated;
}

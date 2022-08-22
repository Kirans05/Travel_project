package com.merchant.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.merchant.api.model.Product;
import com.merchant.api.payload.ApiResponse;
import com.merchant.api.payload.TourRequest;
import com.merchant.api.repository.ProductRepository;
import com.merchant.api.util.ApplicationUtils;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/tour")
@Slf4j
public class TourController {
	
	@Autowired
	private ProductRepository productRepo; 
	
	@GetMapping("/allProducts")
	public List<Product> getAllProducts() {
		return productRepo.findAll();
	}
	
	
	@PostMapping("/addTour")
	public ApiResponse addTour(@RequestBody TourRequest request) {
		ApiResponse response = new ApiResponse();
		Product product = new Product();
		product.setName(request.getName());
		product.setAvailableQty(request.getAvailableQty());
		product.setCurrency(request.getCurrency());
		product.setDescription(request.getDescription());
		product.setImageUrl(request.getImageUrl());
		product.setPrice(request.getPrice());
		product.setCreated(ApplicationUtils.getLocalDate());
		product.setCity(request.getCity());
		product.setActive(true);
		try {
			log.info("Saving product ==> "+product);
			productRepo.save(product);
			response.setMessage("Success");
			response.setSuccess(true);
		} catch (Exception e) {
			log.error("Error saving product !", e);
			response.setMessage("Failed saving product:" + e.getMessage());
			response.setSuccess(false);
		}		
		return response;
	}
}

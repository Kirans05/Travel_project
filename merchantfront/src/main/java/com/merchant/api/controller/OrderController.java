package com.merchant.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.merchant.api.model.OrderMaster;
import com.merchant.api.model.User;
import com.merchant.api.payload.ApiResponse;
import com.merchant.api.payload.ExchangeAPIResponse;
import com.merchant.api.payload.OrderRequest;
import com.merchant.api.repository.UserRepository;
import com.merchant.api.security.CurrentUser;
import com.merchant.api.security.UserPrincipal;
import com.merchant.api.service.OrderService; 

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/order")
public class OrderController {
	
	@Autowired
	private OrderService orderService;
	
	@Autowired
	private UserRepository userRepo;
	
	 
	
	@PostMapping("/create")
	public ApiResponse processOrder(@CurrentUser UserPrincipal userPrincipal, @RequestBody OrderRequest request) {
		log.info("processOrder : " + request);
		try {
			User user = userRepo.findById(userPrincipal.getId()).orElse(null);
			OrderMaster order =  orderService.processOrder(user, request);
			if(order== null || order.getStatus().equalsIgnoreCase("FAILED")) {
				log.info("Error Processing order....");
				return new ApiResponse(false, "Error processing order");
			} else {
				return new ApiResponse(true, "Success", order);
			}
		} catch (Exception e) {
			log.error("Error processing order", e);
			return new ApiResponse(false, "Error processing order");
		}
	}
	 
	
}

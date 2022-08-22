package com.merchant.api.payload;

import com.merchant.api.model.OrderMaster;

import lombok.Data;

@Data
public class ApiResponse {
	private boolean success;
    private String message;
    private OrderMaster order;
    
    
    public ApiResponse() {
    	
    }
    public ApiResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }
    
    public ApiResponse(boolean success, String message, OrderMaster order) {
        this.success = success;
        this.message = message;
        this.order = order;
    }
}

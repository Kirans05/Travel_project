package com.merchant.api.validation;
 
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.merchant.api.payload.ApiResponse;

import lombok.extern.slf4j.Slf4j;

@ControllerAdvice
@Slf4j
public class TransactionControllerAdvice {
	
	@ExceptionHandler(value = Exception.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
	public ApiResponse processException(Exception e) {
		log.error("System error", e);
		ApiResponse res = new ApiResponse();
		res.setMessage(e.getMessage());
		res.setSuccess(false);		
		if(e instanceof MethodArgumentNotValidException) {
			MethodArgumentNotValidException me = (MethodArgumentNotValidException)e;
			res.setMessage(me.getFieldError().getDefaultMessage());
		}
		return res;
	}
}

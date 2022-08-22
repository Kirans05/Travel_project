package com.merchant.api.controller;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.merchant.api.exception.ResourceNotFoundException;
import com.merchant.api.model.User; 
import com.merchant.api.model.UserView; 
import com.merchant.api.repository.UserRepository; 
import com.merchant.api.security.CurrentUser;
import com.merchant.api.security.UserPrincipal;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class UserController {
	@Autowired
	private UserRepository userRepository;
	 
	@GetMapping("/user/me")
	@PreAuthorize("hasRole('USER')")
	public UserView getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {

		UserView view =  userRepository.findById(userPrincipal.getId(), UserView.class)
				.orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
		return view;
	}
 
}

	
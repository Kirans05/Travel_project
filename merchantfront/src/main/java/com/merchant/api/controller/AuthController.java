package com.merchant.api.controller;

import org.joda.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.merchant.api.exception.BadRequestException;
import com.merchant.api.exception.ResourceNotFoundException;
import com.merchant.api.model.AuthProvider;
import com.merchant.api.model.User;
import com.merchant.api.payload.ApiResponse;
import com.merchant.api.payload.AuthResponse;
import com.merchant.api.payload.ChangePasswordRequest;
import com.merchant.api.payload.LoginRequest;
import com.merchant.api.payload.ResetPassRequest;
import com.merchant.api.payload.SignUpRequest;
import com.merchant.api.repository.UserRepository; 
import com.merchant.api.security.CurrentUser;
import com.merchant.api.security.TokenProvider;
import com.merchant.api.security.UserPrincipal; 
import com.merchant.api.util.ApplicationUtils;
import com.nimbusds.oauth2.sdk.util.StringUtils;

import lombok.extern.slf4j.Slf4j;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/auth")
@Slf4j
public class AuthController {
	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private TokenProvider tokenProvider;

 	@Value("${app.api.host}")
	private String apiUrl;
	
	@Value("${app.api.ui}")
	private String frontEndUrl;

	String emailBodyPre = "Thank you for registering, Please click on below link to verify your email ! ";
	String emailBodyPost = "";

	@PostMapping("/login")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
		log.info("Inside authenticateUser ...");
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
		UserPrincipal user = (UserPrincipal)authentication.getPrincipal();
		if(user.getActive() == false) {
			return ResponseEntity.badRequest().body(new AuthResponse(null, "Your account has not been activated yet, we are verifying your details, please check back in some time!!",false));
		}
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String token = tokenProvider.createToken(authentication);
		return ResponseEntity.ok(new AuthResponse(token));
	}
	
	 
	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			throw new BadRequestException("Email address already in use.");
		}

		// Creating user's account
		User user = new User();
		user.setFirstName(signUpRequest.getFirstName());
		user.setLastName(signUpRequest.getLastName());
		user.setEmail(signUpRequest.getEmail());
		user.setPassword(signUpRequest.getPassword());
		user.setProvider(AuthProvider.local);
		user.setActive(true);
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		try {
			String code = ApplicationUtils.genrateUserToken();
			String emailBody = emailBodyPre + apiUrl + "/auth/verify?code=" + code ;
			log.info("Verification Token created for:" + user.getEmail() + ", emailBody : " + emailBody);			
			log.info("Storing user => "+user);
			User result = userRepository.save(user);
						
			URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("/user/me")
					.buildAndExpand(result.getId()).toUri();

			return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully@"));

		} catch (Exception e) {
			log.error("Error signing up user " + user.getEmail()+ "," + user.getFirstName() + " " + user.getLastName(), e);
			return ResponseEntity.badRequest().body(new ApiResponse(false, "User registration failed ! Please make sure you enter valid email address."));
		}

	}

	 
	@PostMapping("/changePass")
	public ResponseEntity<?> changePass(@Valid @RequestBody ChangePasswordRequest cpassReq, @CurrentUser UserPrincipal userPrincipal) {
		User user = userRepository.findByIdAndActive(userPrincipal.getId(), true)
				.orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
		if(user.getProvider() != AuthProvider.local) return ResponseEntity.badRequest().body(new ApiResponse(false, "You are signed up using " + user.getProvider() + ", please visit this prvoider website to reset password!"));
		user.setPassword(cpassReq.getPassword());
		userRepository.save(user);
		return ResponseEntity.ok(new ApiResponse(true, "Password changed successfully !"));
	}

	 
 
	@GetMapping("/heartbeat")
	public String heartbeat() {
		return "OK";
	}
}

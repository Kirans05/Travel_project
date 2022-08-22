package com.merchant.api.payment;

import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.merchant.api.payment.CustomerDetails;
import com.nimbusds.oauth2.sdk.util.StringUtils;

import lombok.extern.slf4j.Slf4j;

import com.merchant.api.payment.AuthResponse;
import com.merchant.api.payment.AuthToken;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.merchant.api.model.GatewayResponse;
import com.merchant.api.model.OrderMaster;
import com.merchant.api.model.User;
import com.merchant.api.payload.OrderRequest;

@Service
@Slf4j
public class PaymentProcessor {
	
	@Value("${app.payment.merchantId}")
	private String merchantId;
	@Value("${app.payment.terminal.USD}")
	private String usdterminalId;
	@Value("${app.payment.terminal.EUR}")
	private String eurTerminalId;
	@Value("${app.payment.terminal.NGN}")
	private String ngnTerminalId;
	@Value("${app.payment.secret}")
	private String secret;
	@Value("${app.payment.signKey}")
	private String signKey;
	@Value("${app.payment.host}")
	private String host;
	
	BigDecimal usd_to_eur  = new BigDecimal("0.86");
	BigDecimal naira_to_eur = new BigDecimal("0.0021");
	
	private static String AUTH_URL= "/txn/AuthToken";
	private static String SALE_URL= "/txn/sale";
	
	private ObjectMapper requestMapper = new ObjectMapper();
	private ObjectMapper responseMapper = new ObjectMapper();
	
	public GatewayResponse processPayment(User user, OrderMaster order, CardDetails card, OrderRequest requ) {
		GatewayResponse gr = new GatewayResponse();
		try {
			
			String terminalId = getTerminalIdForCurrency(requ.getCurrency());
			AuthResponse res = getAuthToken();
			PaymentRequest request =  getPaymentRequest(user, order, card, requ, terminalId);
			log.info("Request body ==> "+request);
	        HttpHeaders headers = new HttpHeaders();
	        headers.setContentType(MediaType.APPLICATION_JSON);
	        
	        String encryptString = merchantId + terminalId + request.getOrderNo() + signKey;
			MessageDigest messageDigestSHA256 = MessageDigest.getInstance("SHA-256");
			String signInfo =  bytesToHex(messageDigestSHA256.digest(encryptString.getBytes(StandardCharsets.UTF_8)));			
	        request.setChecksum(signInfo);	        
	        
	        String req = requestMapper.writeValueAsString(request);
	        
	        headers.add("Authorization", res.getToken());
	        
	        HttpEntity entity = new HttpEntity<String>(req, headers);	        
	        
	        RestTemplate restTemplate = new RestTemplate();
			log.info("Entity for sale ==> "+entity);
	        ResponseEntity<PaymentResponse> saleResponse = restTemplate.postForEntity(host+SALE_URL, entity, PaymentResponse.class);
	        log.info("Gateway Response: " + saleResponse);
	        
	        PaymentResponse pr = saleResponse.getBody();
	        if(pr!= null && pr.getTxnStatus().equalsIgnoreCase("SUCCESS")) {
	        	gr.setBillingDescriptor(pr.getBillingDescriptor());
	        	gr.setTrackingId(pr.getTransactionId().toString());
	        	gr.setTxnInfo("APPROVED");
	        	gr.setStatus("SUCCESS");
	        	gr.setResponseCode(pr.getResponseCode());	        	
	        } else {
	        	gr.setStatus("FAILED");
	        	gr.setTrackingId(pr.getTransactionId() != null ? pr.getTransactionId().toString(): null);
	        	gr.setTxnInfo("Sale failed");
	        	gr.setResponseCode(pr.getResponseCode());
	        			
	        }
	        return gr;
	        
		} catch (Exception e) {
			log.error("Error processing payment", e); 
		}
		gr.setStatus("FAILED");
    	gr.setTxnInfo("Sale failed");
		
		return gr;
	}
	
	private String getTerminalIdForCurrency(String currency) {
		log.info("Retrieving terminal for currency : " + currency);
		if(StringUtils.isBlank(currency)) return usdterminalId;
		if(currency.equalsIgnoreCase("EUR"))
			return eurTerminalId;
		else if(currency.equalsIgnoreCase("NGN"))
			return ngnTerminalId;
		return usdterminalId;
	}

	public static String bytesToHex(byte[] hash) {
		StringBuffer hexString = new StringBuffer();
		for (int i = 0; i < hash.length; i++) {
			String hex = Integer.toHexString(0xff & hash[i]);
			if (hex.length() == 1)
				hexString.append('0');
			hexString.append(hex);
		}
		return hexString.toString();
	}
	
	private BigDecimal convertToEur(BigDecimal amount, String currency) {
		
		if(currency.equalsIgnoreCase("USD")) {
			return amount.multiply(usd_to_eur);
			
		} else if(currency.equalsIgnoreCase("NGN")) {
			return amount.multiply(naira_to_eur);
		}
		
		return amount;
	}
	
	private AuthResponse getAuthToken() throws JsonProcessingException {
		AuthToken token = new AuthToken();
		token.setMerchantId(merchantId);		
		token.setSecret(secret);
		HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        String req = requestMapper.writeValueAsString(token);
        HttpEntity<String> entity = new HttpEntity<String>(req, headers);
        log.info("final auth entity ==> "+entity);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response2 = restTemplate.postForEntity(host+AUTH_URL, entity, String.class);
		AuthResponse response = responseMapper.readValue(response2.getBody().replaceAll("[^\\x00-\\x7F]", ""), AuthResponse.class);
        
        return response;
	}
	
	private PaymentRequest getPaymentRequest(User user, OrderMaster order, CardDetails card, OrderRequest req, String terminalId) {
		PaymentRequest request = new PaymentRequest();
		request.setAmount(convertToEur(order.getPrice(), req.getCurrency()));
        request.setCurrency(req.getCurrency());
        request.setCustomerDetails(getCustomerDetails(user));
        request.setMerchantId(merchantId);
        request.setOrderNo(order.getOrderId().toString());
        request.setTerminalId(terminalId);
        card.setName(user.getFirstName() + " " + user.getLastName());
        request.setCardDetails(card);
        return request;
	}
	
	private CustomerDetails getCustomerDetails(User user) {
		CustomerDetails detail = new CustomerDetails();
		detail.setAddress("NA");
		detail.setBirthDate("19/12/1980");
		detail.setCity("NA");
		detail.setCountry("NA");
		detail.setEmail(user.getEmail());
		detail.setFirstName(user.getFirstName());
		detail.setLastName(user.getLastName());
		detail.setIpAddress("127.0.0.1");
		detail.setPhone(StringUtils.isBlank(user.getPhone())? "0000" : user.getPhone());
		detail.setZip("NA");
		return detail;
	}
	
}

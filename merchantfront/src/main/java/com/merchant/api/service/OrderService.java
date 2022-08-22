package com.merchant.api.service;

import java.math.BigDecimal;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.merchant.api.model.GatewayResponse;
import com.merchant.api.model.OrderMaster;
import com.merchant.api.model.Payment;
import com.merchant.api.model.PaymentStatus;
import com.merchant.api.model.Product;
import com.merchant.api.model.User;
import com.merchant.api.payload.OrderRequest;
import com.merchant.api.payment.CardDetails;
import com.merchant.api.payment.PaymentProcessor;
import com.merchant.api.payment.PaymentResponse;
import com.merchant.api.repository.OrderRepository;
import com.merchant.api.repository.PaymentRepository;
import com.merchant.api.repository.PaymentStatusRepository;
import com.merchant.api.util.ApplicationUtils;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class OrderService {
	
	@Autowired
	private OrderRepository orderRepo;
	
	@Autowired
	private PaymentRepository paymentRepo;
	
	@Autowired
	private PaymentStatusRepository psRepo;
	
	@Autowired
	private PaymentProcessor paymentService;
	
	BigDecimal usd_to_eur  = new BigDecimal("0.86");
	BigDecimal naira_to_eur = new BigDecimal("0.0021");
	
	@Transactional
	public OrderMaster processOrder(User user, OrderRequest request) {
		OrderMaster order = mapOrder(user, request);
		order = orderRepo.save(order);
		Payment payment = mapPayment(order, request);
		payment = paymentRepo.save(payment);	
		GatewayResponse gr = paymentService.processPayment(user, order, mapCardDetails(request), request);
		PaymentStatus status = mapPaymentStatus(payment, gr);
		psRepo.save(status);
		order.setStatus(status.getStatus());
		orderRepo.save(order);
		return order;
	}
	
	
	private OrderMaster mapOrder(User user, OrderRequest request) {
		OrderMaster order = new OrderMaster();
		order.setCreated(ApplicationUtils.getLocalDate()); 
		order.setPrice(request.getAmount());
		order.setProductId(request.getProductId());
		order.setQuantity(request.getQuantity());
		order.setUserId(user.getId());
		order.setFromDate(request.getFromDate());
		order.setToDate(request.getToDate());
		order.setAdultQty(request.getAdultQty());
		order.setChildQty(request.getChildQty());
		return order;
	}
	
	private Payment mapPayment(OrderMaster order, OrderRequest request) {
		Payment pay = new Payment();
		pay.setAmount(convertToEur(request.getAmount(), request.getCurrency()));
		pay.setCurrency(request.getCurrency());
		pay.setOrderId(order.getOrderId());
		pay.setCreated(ApplicationUtils.getLocalDate());
		return pay;
	}
	
	private PaymentStatus mapPaymentStatus(Payment p, GatewayResponse pr) {
		PaymentStatus status = new PaymentStatus();
		status.setCreated(ApplicationUtils.getLocalDate());
		status.setPaymentId(p.getId());
		status.setStatus(pr.getStatus());
		status.setBillingDescriptor(pr.getBillingDescriptor());
		status.setTrackingId(pr.getTrackingId());
		status.setResponseCode(pr.getResponseCode());
		status.setTxnInfo(pr.getTxnInfo());
		return status;
	}
	
	private BigDecimal convertToEur(BigDecimal amount, String currency) {
		if(currency == null) currency = "EUR";
		if(currency.equalsIgnoreCase("USD")) {
			return amount.multiply(usd_to_eur);
			
		} else if(currency.equalsIgnoreCase("NGN")) {
			return amount.multiply(naira_to_eur);
		}
		
		return amount;
	}
	
	private CardDetails mapCardDetails(OrderRequest request) {
		CardDetails cd = new CardDetails();
		cd.setCardNumber(request.getCardNumber().replaceAll("\\s+", ""));
		cd.setCvv(request.getCardCvv());
		String month = request.getCardExpiry().split("/")[0].trim();
		String year = "20"+(request.getCardExpiry().split("/")[1].trim());
		cd.setExpMonth(month);
		cd.setExpYear(year);
		cd.setName(request.getCardHolderName());
		
		return cd;
	}
	
}

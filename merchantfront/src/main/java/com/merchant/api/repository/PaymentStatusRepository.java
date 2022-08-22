package com.merchant.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.merchant.api.model.PaymentStatus;

public interface PaymentStatusRepository extends JpaRepository<PaymentStatus, Long> {

}

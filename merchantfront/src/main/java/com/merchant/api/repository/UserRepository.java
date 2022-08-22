package com.merchant.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.merchant.api.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByEmail(String email);
    Boolean existsByEmail(String email);
    Optional<User> findByIdAndActive(Long id, boolean active);
    <T> Optional<T> findByEmail(String email, Class<T> type);
    <T> Optional<T> findById(Long id, Class<T> type);
}

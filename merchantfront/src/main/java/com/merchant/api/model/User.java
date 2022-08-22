package com.merchant.api.model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.SecondaryTable;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Email;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;

import lombok.Data;

@Entity
@Data
@Table(name = "user", uniqueConstraints = {
        @UniqueConstraint(columnNames = "email")
})
@SecondaryTable(name="UserDetail", pkJoinColumns = @PrimaryKeyJoinColumn(name = "userId", referencedColumnName = "id"))
public class User {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
    @Column
    private String firstName;
    
    @Column
    private String lastName;

    @Email
    @Column(nullable = false)
    private String email;


    @Column(nullable = false)
    private Boolean active = false;

    @JsonIgnore
    private String password;
 

    @NotNull
    @Enumerated(EnumType.STRING)
    private AuthProvider provider;

    private String providerId;
    
    @Column(table = "UserDetail")
    private String phone;
    
    @Column(table = "UserDetail")
    private Boolean consent; 
    
    @Column(table = "UserDetail")
    private String addressLine1;
    
    @Column(table = "UserDetail")
    private String addressLine2;
    
    @Column(table = "UserDetail")
    private String postcode;
    
    @Column(table = "UserDetail")
    private Boolean admin;
    
}

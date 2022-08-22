package com.merchant.api.model;

public interface UserView {

	public Long getId();

	public String getFirstName();
	
	public String getLastName();

	public String getEmail();	

	public Boolean getActive();

	public String getPassword();

	public AuthProvider getProvider();

	public String getProviderId();

	public String getPhone();

	public Boolean getConsent(); 

	public String getAddressLine1();

	public String getAddressLine2();

	public String getPostcode();
	 
	public Boolean getAdmin();
}



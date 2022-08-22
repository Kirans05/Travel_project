package com.merchant.api.payment;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;

import lombok.Data;
@Data
@JsonRootName("card_details")
public class CardDetails 
{
    @JsonProperty("card_number")
    @NotNull(message = "R0016")
    @Size(min = 13, max = 19, message = "R0017")
    @JsonIgnoreProperties
    private String cardNumber;
    
    @NotEmpty(message = "R0018")
    private String name;

    @JsonProperty("expiry_month")
    @NotNull(message = "R0019")
    @Size(min = 1, max = 2, message = "R0020")
    private String expMonth;

    @JsonProperty("expiry_year")
    @NotNull(message = "R0021")
    @Size(min = 4, max = 4, message = "R0022")
    private String expYear;

    @NotEmpty(message = "R0023")
    @Size(min = 3, max = 3, message = "R0024")
    @JsonIgnoreProperties
    private String cvv;

}

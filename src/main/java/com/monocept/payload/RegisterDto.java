package com.monocept.payload;

import com.monocept.entity.Customer;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
public class RegisterDto {
	
	private String username;
	
	private String password;
	
	private Customer customer;

}

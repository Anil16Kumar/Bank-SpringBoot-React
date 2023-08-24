package com.monocept.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class AccountDTO {

	private int accountno;
	
	private double balance;
	
	private int customerID;

	private String bankAbbriviation;
}
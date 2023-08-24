package com.monocept.entity;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class BankDTO {

	private int bankid;

	private String bankname;

	private String abbrevation;
	
	private List<Account> accounts;


}

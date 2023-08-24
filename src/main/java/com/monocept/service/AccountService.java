package com.monocept.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.monocept.entity.Account;

public interface AccountService {

	List<Account> allAccounts();
	Page<Account> allAccounts(int pageno,int pagesize);
	
	void deleteAccount(int accountno,String abbrevation,int customerId);
	
	List<Account> allAccounts(int customerID);
	Page<Account> allAccounts(int customerID,int pageno,int pagesize);
} 
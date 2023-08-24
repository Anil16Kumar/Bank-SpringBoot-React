package com.monocept.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.monocept.entity.Account;
import com.monocept.entity.Bank;

public interface BankService {
	
	void addNewBank(Bank bank);
	
	Account addBankAccounts(String abbrevation ,double balance);
	
	Page<Bank> allBank(int pageno,int pagesize);
	List<Bank> allBank();
	
	void deleteBank(int bankid);
	
	void updateBank(Bank bank);
	

}

package com.monocept.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.monocept.entity.Transaction;

public interface TransactionService {
	
	public String credit(Transaction transaction);
	public String debit(Transaction transaction);
	public String transfer(Transaction transaction);
	
	public List<Transaction> transaction(int accountno);
	public Page<Transaction> transaction(int accountno,int pageno,int pagesize);
	

}

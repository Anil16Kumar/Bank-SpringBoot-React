package com.monocept.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.monocept.entity.Account;
import com.monocept.entity.Bank;
import com.monocept.repository.BankRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@Service
public class BankServiceIMPL implements BankService{
	
	@Autowired
	private BankRepository bankRepo;

	@Override
	public void addNewBank(Bank bank) {
		bankRepo.save(bank);
	}

	@Override
	public Account addBankAccounts(String abbrevation, double balance) {
		
		Account newAccount = new Account();
		newAccount.setBalance(balance);
		
		
		Bank dbBank = bankRepo.findByAbbrevation(abbrevation);
		
		if(dbBank!=null) {
			List<Account> dbaccounts = dbBank.getAccounts();
			dbaccounts.add(newAccount);
			dbBank.setAccounts(dbaccounts);
			bankRepo.save(dbBank);
			
			int size = dbBank.getAccounts().size();
			
			System.out.println("New Account Added in Bank With AccountNo :" +dbBank.getAccounts().get(size-1).getAccountno());
		
			return dbBank.getAccounts().get(size-1);
		}
		
		return null;
	}

	@Override
	public Page<Bank> allBank(int pageno,int pagesize) {
		
		Pageable pageable = PageRequest.of(pageno, pagesize);
		return bankRepo.findAll(pageable);
	}
	
	
	@Override
	public List<Bank> allBank() {
		return bankRepo.findAll();
	}

	@Override
	public void deleteBank(int bankid) {
		bankRepo.deleteById(bankid);
		System.out.println("Bank Deleted Id:"+bankid);
	}

	@Override
	public void updateBank(Bank bank) {
	    Bank dbBank = bankRepo.findByBankid(bank.getBankid());
	    dbBank.setBankname(bank.getBankname());
	    dbBank.setAbbrevation(bank.getAbbrevation());
	    bankRepo.save(dbBank);
	    System.out.println("Bank Updated Succesfully Id : "+bank.getBankid());
	}

	

	
}
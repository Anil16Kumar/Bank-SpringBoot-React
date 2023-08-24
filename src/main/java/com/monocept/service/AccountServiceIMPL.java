package com.monocept.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.monocept.entity.Account;
import com.monocept.entity.Bank;
import com.monocept.entity.Customer;
import com.monocept.repository.AccountRepository;
import com.monocept.repository.BankRepository;
import com.monocept.repository.CustomerRepository;

import jakarta.transaction.Transactional;

@Service
public class AccountServiceIMPL implements AccountService{
	
	@Autowired
	private AccountRepository accountRepo;
	
	@Autowired
	private BankRepository bankRepo;
	
	@Autowired
	private CustomerRepository customerRepo;

	@Override
	public List<Account> allAccounts() {
		return accountRepo.findAll();
	}

	@Override
	public Page<Account> allAccounts(int pageno, int pagesize) {
		Pageable pageable = PageRequest.of(pageno, pagesize);
		return accountRepo.findAll(pageable);
	}

	@Override
	@Transactional
	public void deleteAccount(int accountno,String abbrevation ,int customerId) {
		Bank dbBank = bankRepo.findByAbbrevation(abbrevation);
		
		if(dbBank!=null) {
			List<Account> dbAccounts = dbBank.getAccounts();
			int index =-1;
			
			for(int i=0;i<dbAccounts.size();i++) {
				if(dbAccounts.get(i).getAccountno()==accountno) {
					index = i;
					break;
				}
			}
			
//			System.out.println("Bank Index "+index);
			
			dbAccounts.remove(index);
			dbBank.setAccounts(dbAccounts);
			bankRepo.save(dbBank);
			
		}
		
		Customer dbCustomer = customerRepo.findByCustomerid(customerId);
		
		if(dbCustomer!=null) {
			List<Account> dbAccounts = dbCustomer.getAccounts();
			int index =-1;
			
			for(int i=0;i<dbAccounts.size();i++) {
				if(dbAccounts.get(i).getAccountno()==accountno) {
					index = i;
					break;
				}
			}
		
			
//			System.out.println("Customer Index "+index);
			dbAccounts.remove(index);
			dbCustomer.setAccounts(dbAccounts);
			customerRepo.save(dbCustomer);
			}
		
	}

	@Override
	public List<Account> allAccounts(int customerID) {
		Customer dbCustomer = customerRepo.findByCustomerid(customerID);
		
		List<Account> dbAccounts = new ArrayList<>();
		
		if(dbCustomer!=null) {
			dbAccounts = dbCustomer.getAccounts();
		}
		return dbAccounts;
	}

	@Override
	public Page<Account> allAccounts(int customerID, int pageno, int pagesize) {
		Customer dbCustomer = customerRepo.findByCustomerid(customerID);
		
		List<Account> dbAccounts = new ArrayList<>();
		
		if(dbCustomer!=null) {
			dbAccounts = dbCustomer.getAccounts();
		}
		
		    int start = pageno * pagesize;
		    int end = Math.min(start + pagesize, dbAccounts.size());
	
		    
		    List<Account> pageAccounts = dbAccounts.subList(start, end);
		    
		    Pageable pageable = PageRequest.of(pageno, pagesize);
		    
		    Page<Account> accountPage = new PageImpl<>(pageAccounts, pageable, dbAccounts.size());

		    return accountPage;
	}

}
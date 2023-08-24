package com.monocept.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.monocept.entity.Account;
import com.monocept.entity.Customer;
import com.monocept.repository.CustomerRepository;

@Service
public class CustomerServiceIMPL implements CustomerService{
	
	@Autowired
	private CustomerRepository customerRepo;
	
	@Autowired
	private BankService bankService;

	@Override
	public void addCustomerBankAccount(int customerId, String abbrevation ,double balance) {
		Customer dbCustomer = customerRepo.findByCustomerid(customerId);
		
		Account generatedAccount = bankService.addBankAccounts(abbrevation, balance);
		
		if(dbCustomer!=null) {
			List<Account> dbAccounts = dbCustomer.getAccounts();
			dbAccounts.add(generatedAccount);
			dbCustomer.setAccounts(dbAccounts);
			customerRepo.save(dbCustomer);
			
			System.out.println("Bank Account Added to Customer");
		}
	}

	@Override
	public List<Customer> allCustomers() {
		return customerRepo.findAll();
	}

	@Override
	public Page<Customer> allCustomers(int pageno, int pagesize) {
		Pageable pageable = PageRequest.of(pageno, pagesize);
		return customerRepo.findAll(pageable);
	}

}

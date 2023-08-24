package com.monocept.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.monocept.entity.Account;
import com.monocept.entity.AccountDTO;
import com.monocept.entity.DTOConverter;
import com.monocept.service.AccountService;

@RestController
@RequestMapping("/bank")
public class AccountRestController {
	
	@Autowired
	private AccountService accountService;
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/allaccounts")
	public List<AccountDTO> allAccounts(){ 
		return DTOConverter.accountDtoConverter(accountService.allAccounts()); 
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/allaccounts/{pageno}/{pagesize}")
	public Page<AccountDTO> allAccounts(@PathVariable(name = "pageno") int pageno,@PathVariable(name = "pagesize")int pagesize){
		Page<Account> accountPage =  accountService.allAccounts(pageno,pagesize);
		return DTOConverter.convertToAccountDtoPage(accountPage);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/deleteaccount/{accountno}/{abbrv}/{customerId}")
	public void deleteAccount(@PathVariable(name = "accountno") int accountno,@PathVariable(name = "abbrv") String abbrv,@PathVariable(name = "customerId") int customerId) {
		accountService.deleteAccount(accountno,abbrv,customerId);
	}
	
	@PreAuthorize("hasRole('USER')")
	@GetMapping("/account/{customerid}")
	public List<AccountDTO> allAccounts(@PathVariable(name = "customerid") int customerid){
		 return  DTOConverter.accountDtoConverter(accountService.allAccounts(customerid));
	}
	
	@PreAuthorize("hasRole('USER')")
	@GetMapping("/account/{customerid}/{pageno}/{pagesize}")
	public Page<AccountDTO> allAccounts(@PathVariable(name = "customerid") int customerid ,@PathVariable(name = "pageno") int pageno,@PathVariable(name ="pagesize" ) int pagesize){
		 return   DTOConverter.convertToAccountDtoPage(accountService.allAccounts(customerid,pageno,pagesize));
	}
	

}
package com.monocept.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.monocept.entity.Bank;
import com.monocept.entity.BankDTO;
import com.monocept.entity.DTOConverter;
import com.monocept.service.BankService;

@RestController
@RequestMapping("/bank")
@CrossOrigin(origins="http://localhost:3000")
public class BankRestController {
	
	@Autowired
	private BankService bankService;

	
	@PostMapping("/addnewbank")
	public void addNewBank(@RequestBody Bank bank) {
		System.out.println("Add Bank Called");
		bankService.addNewBank(bank);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/allbanks/{pageno}/{pagesize}")
	public Page<BankDTO> allBanks(@PathVariable(name = "pageno") int pageno,@PathVariable(name = "pagesize") int pagesize){	
		Page<Bank> bankPage = bankService.allBank(pageno, pagesize);
		 return DTOConverter.convertToBankDtoPage(bankPage);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/allbanks")
	public List<BankDTO> allBanks(){	
		List<Bank> banks = bankService.allBank();
		List<BankDTO> data = DTOConverter.bankDtoConverter(banks);
		return data;
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/deletebank/{bankid}")
	public void deleteBank(@PathVariable(name = "bankid") int bankid) {
		bankService.deleteBank(bankid);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/update")
	public void updateBank(@RequestBody Bank bank) {
		bankService.updateBank(bank);
	}

	
	
}
package com.monocept.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.monocept.entity.Transaction;
import com.monocept.service.TransactionService;

@RestController
@RequestMapping("/bank/transaction")
public class TransactionRestController {

	@Autowired
	private TransactionService transactionService;
	
	@PreAuthorize("hasRole('USER')")
	@PostMapping("/credit")
	public ResponseEntity<?> credit(@RequestBody Transaction transaction) {
		String status = transactionService.credit(transaction);
		return  ResponseEntity.status(HttpStatus.OK)
				.body(status);
	}
	
	@PreAuthorize("hasRole('USER')")
	@PostMapping("/debit")
	public ResponseEntity<?> debit(@RequestBody Transaction transaction) {
		String status = transactionService.debit(transaction);
		return  ResponseEntity.status(HttpStatus.OK)
				.body(status);
	}
	
	@PreAuthorize("hasRole('USER')")
	@PostMapping("/transfer")
	public ResponseEntity<?> transfer(@RequestBody Transaction transaction) {
		String status = transactionService.transfer(transaction);
		return  ResponseEntity.status(HttpStatus.OK)
				.body(status);
	}
	
//	@PreAuthorize("hasRole('USER')")
	@GetMapping("/{accountno}")
	public List<Transaction> transaction(@PathVariable(name = "accountno") int accountno){
		return transactionService.transaction(accountno);
	}
	
//	@PreAuthorize("hasRole('USER')")
	@GetMapping("/{accountno}/{pageno}/{pagesize}")
	public Page<Transaction> transaction(@PathVariable(name = "accountno") int accountno,@PathVariable(name = "pageno") int pageno,@PathVariable(name = "pagesize") int pagesize){
		return transactionService.transaction(accountno,pageno,pagesize);
	}
	
}
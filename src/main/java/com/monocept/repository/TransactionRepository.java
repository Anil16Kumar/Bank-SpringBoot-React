package com.monocept.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.monocept.entity.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Integer>{
	
	List<Transaction> findByAccountAccountno(int accountno);

}

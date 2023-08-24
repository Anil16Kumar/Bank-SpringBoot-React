package com.monocept.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.monocept.entity.Bank;

public interface BankRepository extends JpaRepository<Bank, Integer>{

	Bank findByAbbrevation(String abbrevation);
	Bank findByBankid(int bankid);
}

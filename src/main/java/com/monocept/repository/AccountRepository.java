package com.monocept.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.monocept.entity.Account;

public interface AccountRepository extends JpaRepository<Account, Integer>{

	Account findByAccountno(int accountno);
}

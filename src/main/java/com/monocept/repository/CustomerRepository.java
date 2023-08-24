package com.monocept.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.monocept.entity.Customer;
import com.monocept.entity.User;

public interface CustomerRepository extends JpaRepository<Customer, Integer>{

	Customer findByCustomerid(int customerid);
	
}

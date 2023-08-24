package com.monocept.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

 
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "account")
@AllArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
public class Account {

	@Column
	@Id
	 @GeneratedValue(strategy = GenerationType.SEQUENCE, generator="account_sequence")
		@SequenceGenerator(name = "account_sequence", sequenceName = "account_sequence", initialValue = 30301)
	private int accountno;
	@Column
	private double balance;
	
	@ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH},fetch = FetchType.EAGER)//CascadeType.PERSIST,
	@JoinColumn(name = "customer_id", referencedColumnName = "customerid")
//	@JsonBackReference
	private Customer customer;
	
	@OneToMany(cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.REFRESH})//,CascadeType.PERSIST
	@JoinColumn(name = "account_no")
	@JsonManagedReference
	private List<Transaction> transactions;
	
	
	@ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE,CascadeType.REFRESH},fetch = FetchType.EAGER)//CascadeType.PERSIST, 
	@JoinColumn(name = "bank_id" ,referencedColumnName = "bankid")
	private Bank bank;
}
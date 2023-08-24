package com.monocept.entity;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "transaction")
@AllArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
public class Transaction {
	@Column
	@Id
	 @GeneratedValue(strategy = GenerationType.SEQUENCE, generator="transaction_sequence")
		@SequenceGenerator(name = "transaction_sequence", sequenceName = "transaction_sequence", initialValue = 40401)
	private int transactionid;
	@Column
	private int senderaccountno;
	@Column
	private int receiveraccountno;
	
	@ManyToOne(cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.REFRESH})
	@JoinColumn(name = "transaction_typeid")
	private TransactionType transactiontype; 
	
	
	@Column
	private double amount;
	@Column
	private Date date;
	@Column
	private String status;
	
	
	@ManyToOne(cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.REFRESH})//CascadeType.PERSIST,
	@JoinColumn(name = "account_no",referencedColumnName = "accountno")
	@JsonBackReference
	private Account account;
	

}
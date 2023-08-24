package com.monocept.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "transactiontype")
@AllArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
public class TransactionType {
	
	@Column
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int typeid;
	@Column
	private String value;

}
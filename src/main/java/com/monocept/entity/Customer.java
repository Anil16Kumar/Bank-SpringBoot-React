package com.monocept.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

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
@Table(name = "customer")
@AllArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
public class Customer {
	
	@Id
	@Column
	 @GeneratedValue(strategy = GenerationType.SEQUENCE, generator="customer_sequence")
		@SequenceGenerator(name = "customer_sequence", sequenceName = "customer_sequence", initialValue = 20201)
	private int customerid;
	@Column
	private String firstname;
	@Column
	private String lastname;
	
	// adding cascade delete
	@OneToMany(cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.REFRESH,CascadeType.PERSIST,CascadeType.REMOVE,CascadeType.ALL},fetch = FetchType.EAGER ,orphanRemoval = true)// persisit nhi tha
	@JoinColumn(name = "customer_id")
	@JsonIgnoreProperties("customer")
//	@JsonManagedReference
	private List<Account> accounts;
	
	
	
}
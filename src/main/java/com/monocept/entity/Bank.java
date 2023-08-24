package com.monocept.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "bank")
@AllArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
@JsonIdentityInfo(generator= ObjectIdGenerators.IntSequenceGenerator.class, property="@id")
public class Bank {
	
	@Id
	@Column
	 @GeneratedValue(strategy = GenerationType.SEQUENCE, generator="bank_sequence")
		@SequenceGenerator(name = "bank_sequence", sequenceName = "bank_sequence", initialValue = 50501)
	private int bankid;
	@Column
	private String bankname;
	@Column
	private String abbrevation;
	
	@OneToMany(cascade = CascadeType.ALL,fetch = FetchType.EAGER,orphanRemoval = true)
	@JoinColumn(name = "bank_id")
	private List<Account> accounts;

	@Override
	public String toString() {
		return "Bank [bankid=" + bankid + ", bankname=" + bankname + ", abbrevation=" + abbrevation + ", accounts="
				+ accounts + "]";
	}
	
}
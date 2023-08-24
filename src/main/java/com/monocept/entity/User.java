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
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="user")
@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
public class User {
	
	@Id
	@Column(name="userid")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int userid;
	
	@Column(name="username")
	private String username;
	
	@Column(name="password")
	private String password;
	
//	@ManyToMany(cascade=CascadeType.ALL ,fetch = FetchType.EAGER)
//	@JoinTable(name="user_roles",
//	           joinColumns=@JoinColumn(name="userid"),
//	           inverseJoinColumns=@JoinColumn(name="roleid"))
//	private List<Role> roles;
	
	
	@ManyToOne(cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.REFRESH})
	@JoinColumn(name = "role_id")
	private Role role;
	
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "customer_id")
	private Customer customer;


	@Override
	public String toString() {
		return "User [userid=" + userid + ", username=" + username + ", password=" + password + ", role=" + role
				+ ", customer=" + customer + "]";
	}


	
}
	
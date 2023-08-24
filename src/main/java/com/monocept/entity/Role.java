package com.monocept.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "role")
@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
public class Role {

	@Id
	@Column
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int roleid;
	
	@Column
	private String rolename;

	@Override
	public String toString() {
		return "Role [roleid=" + roleid + ", rolename=" + rolename + "]";
	}
	
	
	
}
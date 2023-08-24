package com.monocept.service;

import java.util.List;

import com.monocept.entity.User;

public interface UserService {

	void addUser(User user);
	List<User> allUser();
	void deleteUser(int customerId);
	
	User getUser(int customerId);
	
	String updateUser(User user,int customerId);
	
}
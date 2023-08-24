package com.monocept.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.monocept.entity.User;
import com.monocept.repository.UserRepository;

@Service
public class UserServiceIMPL implements UserService {
	
	@Autowired
	private UserRepository userRepo;
	
	private PasswordEncoder passwordEncoder;
	
	

	public UserServiceIMPL(PasswordEncoder passwordEncoder) {
		super();
		this.passwordEncoder = passwordEncoder;
	}

	@Override
	public void addUser(User user) {
		userRepo.save(user);
		System.out.println("New User Added with useeId :" +user.getUserid());
		
	}

	@Override
	public List<User> allUser() {
		return userRepo.findAll();
		}

	@Override
	public void deleteUser(int customerId) {
		User dbUser = userRepo.findByCustomerCustomerid(customerId);
		userRepo.delete(dbUser);
		System.out.println("User Deleted CustomerId : "+customerId);
	}

	@Override
	public User getUser(int customerId) {
		return userRepo.findByCustomerCustomerid(customerId);
	}

	@Override
	public String updateUser(User user, int customerId) {
		
		User dbUser = userRepo.findByCustomerCustomerid(customerId);
		if(dbUser!=null) {
			dbUser.getCustomer().setFirstname(user.getCustomer().getFirstname());
			dbUser.getCustomer().setLastname(user.getCustomer().getLastname());
			
			if(user.getPassword()!=null)
			dbUser.setPassword(passwordEncoder.encode(user.getPassword()));
			
			userRepo.save(dbUser);
			return "User Updated Successfully";
		}
			
		return "User Not Found";
	}
	
	

}
package com.monocept.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.monocept.entity.User;
import com.monocept.service.UserService;

@RestController
@RequestMapping("/bank/user")
@CrossOrigin(origins="http://localhost:3000")
public class UserRestController {
	
	@Autowired
	private UserService userService;
	
	
	@PostMapping("/adduser")
	public void addUser(@RequestBody User user) {
		userService.addUser(user);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/allusers")
	public List<User> allUser(){
		return userService.allUser();
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/{id}")
	void deleteUser(@PathVariable(name = "id") int customerId) {
		userService.deleteUser(customerId);	
	}
	
	@PreAuthorize("hasRole('USER')")
	@GetMapping("/{id}")
	User getUSer(@PathVariable(name = "id") int customerId) {
		return userService.getUser(customerId);
	}
	
	@PostMapping("/update/{id}")
	ResponseEntity<?> updateUser(@RequestBody User user,@PathVariable(name = "id") int customerID){
		String status = userService.updateUser(user, customerID);
		return ResponseEntity.status(HttpStatus.OK).body(status);
	}

}
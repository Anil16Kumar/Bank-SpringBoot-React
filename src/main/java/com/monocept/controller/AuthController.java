package com.monocept.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.monocept.entity.User;
import com.monocept.payload.JwtAuthresponse;
import com.monocept.payload.LoginDto;
import com.monocept.payload.RegisterDto;
import com.monocept.repository.UserRepository;
import com.monocept.service.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
	
	@Autowired
	private AuthService authService;
	
	@Autowired
	private UserRepository userRepo;
	
	@PostMapping(value = {"/login", "/signin"})
	public ResponseEntity<JwtAuthresponse> login(@RequestBody LoginDto loginDto){
	String token = authService.login(loginDto);
	JwtAuthresponse jwtAuthResponse = new JwtAuthresponse();
	jwtAuthResponse.setAccessToken(token);
	
	
	Optional<User> findUser = userRepo.findByUsername(loginDto.getUsername());
	
	if(findUser!=null) {
		jwtAuthResponse.setRoleName(findUser.get().getRole().getRolename());
		jwtAuthResponse.setCustomerid(findUser.get().getCustomer().getCustomerid());
	}
	
	return ResponseEntity.ok(jwtAuthResponse);

	}

	@PostMapping("/register")
	public ResponseEntity<String> register(@RequestBody RegisterDto registerDto){
	String response = authService.register(registerDto);
	return new ResponseEntity<>(response, HttpStatus.CREATED);

	}
	

}
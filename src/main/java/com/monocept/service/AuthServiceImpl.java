package com.monocept.service;

import java.util.ArrayList;
import java.util.List;

//import org.springframework.http.HttpStatus;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;

import com.monocept.entity.Role;
import com.monocept.entity.User;
import com.monocept.exception.UserAPIException;
import com.monocept.payload.LoginDto;
import com.monocept.payload.RegisterDto;
import com.monocept.repository.RoleRepository;
import com.monocept.repository.UserRepository;
import com.monocept.security.JwtTokenProvider;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;





@Service
public class AuthServiceImpl implements AuthService {
	
	private AuthenticationManager authenticationManager;
	private UserRepository userRepository;
	private RoleRepository roleRepository;
	private JwtTokenProvider jwtTokenProvider;
	private PasswordEncoder passwordEncoder;
	
	

	public AuthServiceImpl(AuthenticationManager authenticationManager, UserRepository userRepository,
			RoleRepository roleRepository, JwtTokenProvider jwtTokenProvider, PasswordEncoder passwordEncoder) {
		super();
		this.authenticationManager = authenticationManager;
		this.userRepository = userRepository;
		this.roleRepository = roleRepository;
		this.jwtTokenProvider = jwtTokenProvider;
		this.passwordEncoder = passwordEncoder;
	}

	@Override
	public String login(LoginDto loginDto) {
		Authentication authentication=authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getUsername(),loginDto.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);

		String token=jwtTokenProvider.generateToken(authentication);

		return token;
	}

	@Override
	public String register(RegisterDto registerDto) {
		if(userRepository.existsByUsername(registerDto.getUsername()))
			throw new UserAPIException(HttpStatus.BAD_REQUEST,"User already exists");

			User user= new User();

			user.setUsername(registerDto.getUsername());

			user.setPassword(passwordEncoder.encode(registerDto.getPassword()));

//			List<Role> roles=new ArrayList<Role>();

			Role userRole=roleRepository.findByRolename("ROLE_USER");

//			roles.add(userRole);
		

			user.setRole(userRole);
			user.setCustomer(registerDto.getCustomer());

			userRepository.save(user);

			System.out.println(user);

			return "User registered successfully";
	}

}

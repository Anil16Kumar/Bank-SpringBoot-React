package com.monocept.security;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.monocept.entity.Role;
import com.monocept.entity.User;
import com.monocept.repository.UserRepository;

@Service
public class CustomeUserDetailsService  implements UserDetailsService{

	
	private UserRepository userRepository;
	
	public CustomeUserDetailsService(UserRepository userRepository) {
		super();
		this.userRepository = userRepository;
	}


	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		User user = userRepository.findByUsername(username)
				.orElseThrow(()->new UsernameNotFoundException("User name not found"));
		
		Role role = user.getRole();
		GrantedAuthority authority = new SimpleGrantedAuthority(role.getRolename());
		Set<GrantedAuthority> authorities = new HashSet<>();
		authorities.add(authority);
		
		
	
		
//		Set<GrantedAuthority> authorities = user
//				.getRoles()
//				.stream()
//				.map((role)-> new SimpleGrantedAuthority(role.getRolename())).collect(Collectors.toSet());
 		
		return new org.springframework.security.core
				.userdetails.User(user.getUsername(), user.getPassword(), authorities);
	}

}
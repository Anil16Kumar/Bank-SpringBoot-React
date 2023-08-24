package com.monocept.service;

import com.monocept.payload.LoginDto;
import com.monocept.payload.RegisterDto;

public interface AuthService {

	String login(LoginDto loginDto);
	String register(RegisterDto registerDto);
}
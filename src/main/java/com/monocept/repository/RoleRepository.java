package com.monocept.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.monocept.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Integer>{

	Role findByRolename(String rolename);
}
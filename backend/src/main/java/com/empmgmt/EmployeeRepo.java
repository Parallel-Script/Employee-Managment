package com.empmgmt;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepo extends JpaRepository<Employee, Integer>{

	List<Employee> findAllById(int id);
	List<Employee> findByNameContainingIgnoreCase(String name);


}

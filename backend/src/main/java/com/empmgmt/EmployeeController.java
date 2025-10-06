package com.empmgmt;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/employee")
public class EmployeeController {
	
	@Autowired
	EmployeeRepo employeeRepo;
	
	@PostMapping
	public String saveemployee(@RequestBody Employee employee) {
		employeeRepo.save(employee);
		return "Employee saved";
	}
	
	@GetMapping
	public List<Employee> showemployee(){
		return employeeRepo.findAll();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Employee> showempbyid(@PathVariable("id") int id) {
	    return employeeRepo.findById(id)
	            .map(ResponseEntity::ok)               // if found -> return 200 + Employee
	            .orElseGet(() -> ResponseEntity.notFound().build()); // if not found -> 404
	}
	
	@GetMapping("/search/{name}")
	public List<Employee> searchByName(@PathVariable String name) {
	    return employeeRepo.findByNameContainingIgnoreCase(name);
	}

	
	@PutMapping("/{id}")
	public String updateemployee(@RequestBody Employee employee , @PathVariable("id") int id) {
		Optional<Employee> opt= employeeRepo.findById(id);
		if (opt.isPresent()) {
	        Employee existing = opt.get();
	        existing.setName(employee.getName());
	        existing.setEmail(employee.getEmail());
	        existing.setPosition(employee.getPosition());

	        employeeRepo.save(existing);
	        return "Employee Updated ........";
	    }
	    return "Employee not found!";
	}
	
	@DeleteMapping("/{id}")
	public String deleteemployee(@PathVariable("id") int id) {
		employeeRepo.deleteById(id);
		return "employee deleted";
	}
}

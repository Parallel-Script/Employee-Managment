package com.empmgmt;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class EmployeeRepoTest {

    @Autowired
    private EmployeeRepo employeeRepo;

    @Test
    void testSaveAndFindEmployee() {
        Employee emp = new Employee();
        emp.setName("John Doe");
        emp.setEmail("john@example.com");
        emp.setPosition("Developer");

        Employee saved = employeeRepo.save(emp);

        assertNotNull(saved.getId());
        assertEquals("John Doe", saved.getName());
    }
}

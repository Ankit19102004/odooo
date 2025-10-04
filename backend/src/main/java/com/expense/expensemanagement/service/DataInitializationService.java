package com.expense.expensemanagement.service;

import com.expense.expensemanagement.model.Role;
import com.expense.expensemanagement.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

@Service
public class DataInitializationService implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {
        initializeRoles();
    }

    private void initializeRoles() {
        // Create ADMIN role if it doesn't exist
        if (!roleRepository.findByRoleType(Role.RoleType.ADMIN).isPresent()) {
            Role adminRole = new Role(Role.RoleType.ADMIN, "Administrator with full system access");
            roleRepository.save(adminRole);
        }

        // Create MANAGER role if it doesn't exist
        if (!roleRepository.findByRoleType(Role.RoleType.MANAGER).isPresent()) {
            Role managerRole = new Role(Role.RoleType.MANAGER, "Manager with approval and team management access");
            roleRepository.save(managerRole);
        }

        // Create EMPLOYEE role if it doesn't exist
        if (!roleRepository.findByRoleType(Role.RoleType.EMPLOYEE).isPresent()) {
            Role employeeRole = new Role(Role.RoleType.EMPLOYEE, "Employee with expense submission access");
            roleRepository.save(employeeRole);
        }
    }
}


package com.expense.expensemanagement.repository;

import com.expense.expensemanagement.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByRoleType(Role.RoleType roleType);

    Optional<Role> findByRoleTypeAndIsActiveTrue(Role.RoleType roleType);
}

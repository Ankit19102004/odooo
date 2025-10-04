package com.expense.expensemanagement.repository;

import com.expense.expensemanagement.model.User;
import com.expense.expensemanagement.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    List<User> findByCompanyIdAndIsActiveTrue(Long companyId);

    List<User> findByCompanyIdAndRoleRoleTypeAndIsActiveTrue(Long companyId, Role.RoleType roleType);

    List<User> findByManagerIdAndIsActiveTrue(Long managerId);

    @Query("SELECT u FROM User u WHERE u.company.id = :companyId AND u.role.roleType = :roleType AND u.isActive = true")
    List<User> findActiveUsersByCompanyAndRole(@Param("companyId") Long companyId, @Param("roleType") Role.RoleType roleType);

    @Query("SELECT u FROM User u WHERE u.manager.id = :managerId AND u.isActive = true ORDER BY u.firstName, u.lastName")
    List<User> findActiveSubordinatesByManager(@Param("managerId") Long managerId);

    @Query("SELECT u FROM User u WHERE u.company.id = :companyId AND (u.firstName LIKE %:searchTerm% OR u.lastName LIKE %:searchTerm% OR u.email LIKE %:searchTerm%) AND u.isActive = true")
    List<User> searchUsersInCompany(@Param("companyId") Long companyId, @Param("searchTerm") String searchTerm);
}

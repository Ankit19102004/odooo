package com.expense.expensemanagement.repository;

import com.expense.expensemanagement.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {

    Optional<Company> findByName(String name);

    List<Company> findByIsActiveTrue();

    @Query("SELECT c FROM Company c WHERE c.isActive = true AND (c.name LIKE %:searchTerm% OR c.description LIKE %:searchTerm%)")
    List<Company> searchActiveCompanies(@Param("searchTerm") String searchTerm);

    boolean existsByName(String name);
}

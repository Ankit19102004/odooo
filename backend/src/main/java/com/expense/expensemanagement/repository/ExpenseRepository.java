package com.expense.expensemanagement.repository;

import com.expense.expensemanagement.model.Expense;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    List<Expense> findByEmployeeIdAndIsActiveTrueOrderByCreatedAtDesc(Long employeeId);
    
    Page<Expense> findByEmployeeIdAndIsActiveTrueOrderByCreatedAtDesc(Long employeeId, Pageable pageable);

    List<Expense> findByEmployeeIdAndStatusOrderByCreatedAtDesc(Long employeeId, Expense.ExpenseStatus status);

    List<Expense> findByCompanyIdAndStatusOrderByCreatedAtDesc(Long companyId, Expense.ExpenseStatus status);

    Page<Expense> findByCompanyIdOrderByCreatedAtDesc(Long companyId, Pageable pageable);

    @Query("SELECT e FROM Expense e WHERE e.employee.manager.id = :managerId AND e.status = :status ORDER BY e.createdAt DESC")
    List<Expense> findExpensesForManagerApproval(@Param("managerId") Long managerId, @Param("status") Expense.ExpenseStatus status);

    @Query("SELECT e FROM Expense e WHERE e.employee.company.id = :companyId AND e.status IN (:statuses) ORDER BY e.createdAt DESC")
    Page<Expense> findExpensesByCompanyAndStatuses(@Param("companyId") Long companyId, @Param("statuses") List<Expense.ExpenseStatus> statuses, Pageable pageable);

    @Query("SELECT e FROM Expense e WHERE e.employee.id = :employeeId AND e.expenseDate BETWEEN :startDate AND :endDate ORDER BY e.expenseDate DESC")
    List<Expense> findExpensesByEmployeeAndDateRange(@Param("employeeId") Long employeeId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

    @Query("SELECT e FROM Expense e WHERE e.company.id = :companyId AND e.expenseDate BETWEEN :startDate AND :endDate ORDER BY e.expenseDate DESC")
    Page<Expense> findExpensesByCompanyAndDateRange(@Param("companyId") Long companyId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate, Pageable pageable);

    @Query("SELECT e FROM Expense e WHERE e.employee.company.id = :companyId AND e.category = :category AND e.status = :status ORDER BY e.createdAt DESC")
    List<Expense> findExpensesByCompanyCategoryAndStatus(@Param("companyId") Long companyId, @Param("category") Expense.ExpenseCategory category, @Param("status") Expense.ExpenseStatus status);

    @Query("SELECT COUNT(e) FROM Expense e WHERE e.employee.company.id = :companyId AND e.status = :status")
    Long countExpensesByCompanyAndStatus(@Param("companyId") Long companyId, @Param("status") Expense.ExpenseStatus status);

    @Query("SELECT SUM(e.convertedAmount) FROM Expense e WHERE e.employee.company.id = :companyId AND e.status = :status")
    Double sumExpenseAmountsByCompanyAndStatus(@Param("companyId") Long companyId, @Param("status") Expense.ExpenseStatus status);
}

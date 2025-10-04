package com.expense.expensemanagement.repository;

import com.expense.expensemanagement.model.ApprovalStep;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApprovalStepRepository extends JpaRepository<ApprovalStep, Long> {

    List<ApprovalStep> findByExpenseIdOrderByStepOrderAsc(Long expenseId);

    List<ApprovalStep> findByExpenseIdAndStatusOrderByStepOrderAsc(Long expenseId, ApprovalStep.ApprovalStatus status);

    List<ApprovalStep> findByApproverIdAndStatusOrderByCreatedAtDesc(Long approverId, ApprovalStep.ApprovalStatus status);

    @Query("SELECT a FROM ApprovalStep a WHERE a.approver.id = :approverId AND a.status = 'PENDING' ORDER BY a.createdAt ASC")
    List<ApprovalStep> findPendingApprovalsForUser(@Param("approverId") Long approverId);

    @Query("SELECT a FROM ApprovalStep a WHERE a.expense.id = :expenseId AND a.status = 'PENDING' ORDER BY a.stepOrder ASC")
    List<ApprovalStep> findPendingApprovalStepsForExpense(@Param("expenseId") Long expenseId);

    @Query("SELECT a FROM ApprovalStep a WHERE a.expense.id = :expenseId AND a.status = 'APPROVED' ORDER BY a.stepOrder ASC")
    List<ApprovalStep> findApprovedStepsForExpense(@Param("expenseId") Long expenseId);

    @Query("SELECT a FROM ApprovalStep a WHERE a.expense.id = :expenseId AND a.status = 'REJECTED' ORDER BY a.stepOrder ASC")
    List<ApprovalStep> findRejectedStepsForExpense(@Param("expenseId") Long expenseId);

    @Query("SELECT COUNT(a) FROM ApprovalStep a WHERE a.expense.id = :expenseId AND a.status = 'APPROVED'")
    Long countApprovedStepsForExpense(@Param("expenseId") Long expenseId);

    @Query("SELECT COUNT(a) FROM ApprovalStep a WHERE a.expense.id = :expenseId")
    Long countTotalStepsForExpense(@Param("expenseId") Long expenseId);
}

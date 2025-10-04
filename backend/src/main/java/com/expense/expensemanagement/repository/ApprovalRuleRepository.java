package com.expense.expensemanagement.repository;

import com.expense.expensemanagement.model.ApprovalRule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ApprovalRuleRepository extends JpaRepository<ApprovalRule, Long> {

    List<ApprovalRule> findByCompanyIdAndIsActiveTrueOrderByPriorityOrderAsc(Long companyId);

    @Query("SELECT ar FROM ApprovalRule ar WHERE ar.company.id = :companyId AND ar.isActive = true AND " +
           "(:amount IS NULL OR (ar.minAmount IS NULL OR ar.minAmount <= :amount) AND " +
           "(ar.maxAmount IS NULL OR ar.maxAmount >= :amount)) " +
           "ORDER BY ar.priorityOrder ASC")
    List<ApprovalRule> findApplicableRulesForAmount(@Param("companyId") Long companyId, @Param("amount") BigDecimal amount);

    @Query("SELECT ar FROM ApprovalRule ar WHERE ar.company.id = :companyId AND ar.ruleType = :ruleType AND ar.isActive = true ORDER BY ar.priorityOrder ASC")
    List<ApprovalRule> findByCompanyAndRuleType(@Param("companyId") Long companyId, @Param("ruleType") ApprovalRule.RuleType ruleType);

    @Query("SELECT ar FROM ApprovalRule ar WHERE ar.company.id = :companyId AND ar.approvalFlow = :approvalFlow AND ar.isActive = true ORDER BY ar.priorityOrder ASC")
    List<ApprovalRule> findByCompanyAndApprovalFlow(@Param("companyId") Long companyId, @Param("approvalFlow") ApprovalRule.ApprovalFlow approvalFlow);
}

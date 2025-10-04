package com.expense.expensemanagement.service;

import com.expense.expensemanagement.dto.*;
import com.expense.expensemanagement.model.*;
import com.expense.expensemanagement.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ApprovalService {

    @Autowired
    private ApprovalStepRepository approvalStepRepository;

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ApprovalRuleRepository approvalRuleRepository;

    @Autowired
    private ExpenseService expenseService;

    public ApprovalStepDto processApprovalAction(ApprovalActionRequest actionRequest, Long approverId) {
        ApprovalStep approvalStep = approvalStepRepository.findById(actionRequest.getApprovalStepId())
                .orElseThrow(() -> new RuntimeException("Approval step not found"));

        // Verify the approver has permission to act on this step
        if (!approvalStep.getApprover().getId().equals(approverId)) {
            throw new RuntimeException("You don't have permission to act on this approval step");
        }

        if (approvalStep.getStatus() != ApprovalStep.ApprovalStatus.PENDING) {
            throw new RuntimeException("This approval step has already been processed");
        }

        Expense expense = approvalStep.getExpense();
        
        // Process the action
        switch (actionRequest.getAction().toUpperCase()) {
            case "APPROVE":
                approvalStep.approve(actionRequest.getComments());
                break;
            case "REJECT":
                approvalStep.reject(actionRequest.getComments());
                expense.setStatus(Expense.ExpenseStatus.REJECTED);
                expense.setRejectionReason(actionRequest.getComments());
                break;
            case "SKIP":
                approvalStep.skip(actionRequest.getComments());
                break;
            default:
                throw new RuntimeException("Invalid approval action: " + actionRequest.getAction());
        }

        approvalStep = approvalStepRepository.save(approvalStep);
        expenseRepository.save(expense);

        // Check if approval workflow is complete
        checkAndUpdateExpenseStatus(expense);

        return convertApprovalStepToDto(approvalStep);
    }

    public Page<ExpenseDto> getPendingApprovalsForUser(Long userId, Pageable pageable) {
        List<ApprovalStep> pendingSteps = approvalStepRepository.findPendingApprovalsForUser(userId);
        List<Expense> expenses = pendingSteps.stream()
                .map(ApprovalStep::getExpense)
                .distinct()
                .collect(Collectors.toList());

        List<ExpenseDto> expenseDtos = expenses.stream()
                .map(expenseService::convertToDto)
                .collect(Collectors.toList());

        return new PageImpl<>(expenseDtos, pageable, expenseDtos.size());
    }

    public Page<ApprovalStepDto> getApprovalHistoryForUser(Long userId, Pageable pageable) {
        List<ApprovalStep> approvalSteps = approvalStepRepository.findByApproverIdAndStatusOrderByCreatedAtDesc(
                userId, ApprovalStep.ApprovalStatus.PENDING);
        
        // Get all non-pending approvals for the user
        List<ApprovalStep> allSteps = approvalStepRepository.findByApproverIdAndStatusOrderByCreatedAtDesc(
                userId, ApprovalStep.ApprovalStatus.APPROVED);
        allSteps.addAll(approvalStepRepository.findByApproverIdAndStatusOrderByCreatedAtDesc(
                userId, ApprovalStep.ApprovalStatus.REJECTED));

        List<ApprovalStepDto> stepDtos = allSteps.stream()
                .map(this::convertApprovalStepToDto)
                .collect(Collectors.toList());

        return new PageImpl<>(stepDtos, pageable, stepDtos.size());
    }

    public List<ApprovalStepDto> getExpenseWorkflow(Long expenseId, Long userId) {
        List<ApprovalStep> steps = approvalStepRepository.findByExpenseIdOrderByStepOrderAsc(expenseId);
        
        // Check if user has permission to view this expense workflow
        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!expense.getEmployee().getId().equals(userId) && 
            !user.isAdmin() && 
            !isApproverInWorkflow(user, steps)) {
            throw new RuntimeException("You don't have permission to view this expense workflow");
        }

        return steps.stream()
                .map(this::convertApprovalStepToDto)
                .collect(Collectors.toList());
    }

    public ExpenseDto escalateExpense(Long expenseId, String reason, Long userId) {
        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        // Check if user has permission to escalate
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.isManager() && !user.isAdmin()) {
            throw new RuntimeException("Only managers and admins can escalate expenses");
        }

        // Add escalation comment
        ExpenseComment comment = new ExpenseComment(
                "ESCALATED: " + reason,
                expense,
                user,
                false // Not internal
        );
        // TODO: Save comment

        // TODO: Implement escalation logic (e.g., notify higher-level approvers)

        return expenseService.convertToDto(expense);
    }

    public void startApprovalWorkflow(Expense expense) {
        // Find applicable approval rules
        List<ApprovalRule> applicableRules = approvalRuleRepository.findApplicableRulesForAmount(
                expense.getCompany().getId(), expense.getConvertedAmount());

        if (applicableRules.isEmpty()) {
            // No rules found, auto-approve
            expense.setStatus(Expense.ExpenseStatus.APPROVED);
            expenseRepository.save(expense);
            return;
        }

        // Use the highest priority rule
        ApprovalRule rule = applicableRules.get(0);

        // Create approval steps based on rule
        List<ApprovalStep> approvalSteps = createApprovalSteps(expense, rule);
        
        // Save all approval steps
        approvalStepRepository.saveAll(approvalSteps);

        // Set expense status to pending
        expense.setStatus(Expense.ExpenseStatus.PENDING);
        expenseRepository.save(expense);
    }

    private List<ApprovalStep> createApprovalSteps(Expense expense, ApprovalRule rule) {
        List<ApprovalStep> steps = new ArrayList<>();
        int stepOrder = 1;

        for (ApprovalRuleStep ruleStep : rule.getApprovalRuleSteps()) {
            User approver = determineApprover(expense, ruleStep);
            
            if (approver != null) {
                ApprovalStep approvalStep = new ApprovalStep(stepOrder++, expense, approver);
                approvalStep.setApprovalRuleStep(ruleStep);
                steps.add(approvalStep);
            }
        }

        return steps;
    }

    private User determineApprover(Expense expense, ApprovalRuleStep ruleStep) {
        switch (ruleStep.getStepType()) {
            case MANAGER_APPROVAL:
                return expense.getEmployee().getManager();
            case ROLE_APPROVAL:
                // Find user with required role in the same company
                List<User> roleUsers = userRepository.findByCompanyIdAndRoleRoleTypeAndIsActiveTrue(
                        expense.getCompany().getId(), ruleStep.getRequiredRole().getRoleType());
                return roleUsers.isEmpty() ? null : roleUsers.get(0);
            case USER_APPROVAL:
                return ruleStep.getRequiredUser();
            case FINANCE_APPROVAL:
                // Find finance role users
                List<User> financeUsers = userRepository.findByCompanyIdAndRoleRoleTypeAndIsActiveTrue(
                        expense.getCompany().getId(), Role.RoleType.MANAGER); // Assuming managers handle finance
                return financeUsers.isEmpty() ? null : financeUsers.get(0);
            case ADMIN_APPROVAL:
                List<User> adminUsers = userRepository.findByCompanyIdAndRoleRoleTypeAndIsActiveTrue(
                        expense.getCompany().getId(), Role.RoleType.ADMIN);
                return adminUsers.isEmpty() ? null : adminUsers.get(0);
            default:
                return null;
        }
    }

    private void checkAndUpdateExpenseStatus(Expense expense) {
        List<ApprovalStep> allSteps = approvalStepRepository.findByExpenseIdOrderByStepOrderAsc(expense.getId());
        
        boolean hasRejected = allSteps.stream()
                .anyMatch(step -> step.getStatus() == ApprovalStep.ApprovalStatus.REJECTED);
        
        if (hasRejected) {
            expense.setStatus(Expense.ExpenseStatus.REJECTED);
            expenseRepository.save(expense);
            return;
        }

        boolean allApproved = allSteps.stream()
                .allMatch(step -> step.getStatus() == ApprovalStep.ApprovalStatus.APPROVED || 
                                step.getStatus() == ApprovalStep.ApprovalStatus.SKIPPED);

        if (allApproved) {
            expense.setStatus(Expense.ExpenseStatus.APPROVED);
            expenseRepository.save(expense);
        }
    }

    private boolean isApproverInWorkflow(User user, List<ApprovalStep> steps) {
        return steps.stream()
                .anyMatch(step -> step.getApprover().getId().equals(user.getId()));
    }

    private ApprovalStepDto convertApprovalStepToDto(ApprovalStep step) {
        return new ApprovalStepDto(
                step.getId(),
                step.getStatus(),
                step.getStepOrder(),
                step.getComments(),
                step.getApprovedAt(),
                step.getApprover().getId(),
                step.getApprover().getFullName(),
                step.getApprover().getRole().getRoleType().name()
        );
    }
}

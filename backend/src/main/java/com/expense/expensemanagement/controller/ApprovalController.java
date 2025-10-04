package com.expense.expensemanagement.controller;

import com.expense.expensemanagement.dto.*;
import com.expense.expensemanagement.security.UserPrincipal;
import com.expense.expensemanagement.service.ApprovalService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/approvals")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ApprovalController {

    @Autowired
    private ApprovalService approvalService;

    @PostMapping("/action")
    @PreAuthorize("hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> processApprovalAction(@AuthenticationPrincipal UserPrincipal currentUser,
                                                           @Valid @RequestBody ApprovalActionRequest actionRequest) {
        try {
            ApprovalStepDto approvalStep = approvalService.processApprovalAction(
                    actionRequest, currentUser.getId());
            return ResponseEntity.ok(ApiResponse.success("Approval action processed successfully!", approvalStep));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to process approval action: " + e.getMessage()));
        }
    }

    @GetMapping("/pending")
    @PreAuthorize("hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<Page<ExpenseDto>> getPendingApprovals(@AuthenticationPrincipal UserPrincipal currentUser,
                                                               Pageable pageable) {
        Page<ExpenseDto> expenses = approvalService.getPendingApprovalsForUser(currentUser.getId(), pageable);
        return ResponseEntity.ok(expenses);
    }

    @GetMapping("/history")
    @PreAuthorize("hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<Page<ApprovalStepDto>> getApprovalHistory(@AuthenticationPrincipal UserPrincipal currentUser,
                                                                  Pageable pageable) {
        Page<ApprovalStepDto> approvals = approvalService.getApprovalHistoryForUser(currentUser.getId(), pageable);
        return ResponseEntity.ok(approvals);
    }

    @GetMapping("/workflow/{expenseId}")
    public ResponseEntity<List<ApprovalStepDto>> getExpenseWorkflow(@PathVariable Long expenseId,
                                                                  @AuthenticationPrincipal UserPrincipal currentUser) {
        List<ApprovalStepDto> workflow = approvalService.getExpenseWorkflow(expenseId, currentUser.getId());
        return ResponseEntity.ok(workflow);
    }

    @PostMapping("/escalate/{expenseId}")
    @PreAuthorize("hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> escalateExpense(@PathVariable Long expenseId,
                                                     @RequestParam String reason,
                                                     @AuthenticationPrincipal UserPrincipal currentUser) {
        try {
            ExpenseDto expense = approvalService.escalateExpense(expenseId, reason, currentUser.getId());
            return ResponseEntity.ok(ApiResponse.success("Expense escalated successfully!", expense));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to escalate expense: " + e.getMessage()));
        }
    }
}

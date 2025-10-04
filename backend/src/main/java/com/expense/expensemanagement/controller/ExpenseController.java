package com.expense.expensemanagement.controller;

import com.expense.expensemanagement.dto.*;
import com.expense.expensemanagement.model.Expense;
import com.expense.expensemanagement.security.UserPrincipal;
import com.expense.expensemanagement.service.ExpenseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    @PostMapping
    public ResponseEntity<ApiResponse> createExpense(@AuthenticationPrincipal UserPrincipal currentUser,
                                                   @Valid @RequestBody CreateExpenseRequest createExpenseRequest) {
        try {
            ExpenseDto expense = expenseService.createExpense(currentUser.getId(), createExpenseRequest);
            return ResponseEntity.ok(ApiResponse.success("Expense created successfully!", expense));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to create expense: " + e.getMessage()));
        }
    }

    @PostMapping("/{expenseId}/submit")
    public ResponseEntity<ApiResponse> submitExpense(@PathVariable Long expenseId,
                                                   @AuthenticationPrincipal UserPrincipal currentUser) {
        try {
            ExpenseDto expense = expenseService.submitExpense(expenseId, currentUser.getId());
            return ResponseEntity.ok(ApiResponse.success("Expense submitted successfully!", expense));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to submit expense: " + e.getMessage()));
        }
    }

    @PostMapping("/{expenseId}/receipt")
    public ResponseEntity<ApiResponse> uploadReceipt(@PathVariable Long expenseId,
                                                   @RequestParam("file") MultipartFile file,
                                                   @AuthenticationPrincipal UserPrincipal currentUser) {
        try {
            ExpenseDto expense = expenseService.uploadReceipt(expenseId, file, currentUser.getId());
            return ResponseEntity.ok(ApiResponse.success("Receipt uploaded successfully!", expense));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to upload receipt: " + e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<Page<ExpenseDto>> getMyExpenses(@AuthenticationPrincipal UserPrincipal currentUser,
                                                         Pageable pageable) {
        Page<ExpenseDto> expenses = expenseService.getExpensesByEmployee(currentUser.getId(), pageable);
        return ResponseEntity.ok(expenses);
    }

    @GetMapping("/{expenseId}")
    public ResponseEntity<ExpenseDto> getExpense(@PathVariable Long expenseId,
                                               @AuthenticationPrincipal UserPrincipal currentUser) {
        ExpenseDto expense = expenseService.getExpense(expenseId, currentUser.getId(), currentUser.getCompanyId());
        return ResponseEntity.ok(expense);
    }

    @GetMapping("/pending-approval")
    @PreAuthorize("hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<List<ExpenseDto>> getPendingApprovals(@AuthenticationPrincipal UserPrincipal currentUser) {
        List<ExpenseDto> expenses = expenseService.getPendingApprovalsForUser(currentUser.getId());
        return ResponseEntity.ok(expenses);
    }

    @GetMapping("/team")
    @PreAuthorize("hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<Page<ExpenseDto>> getTeamExpenses(@AuthenticationPrincipal UserPrincipal currentUser,
                                                           Pageable pageable) {
        Page<ExpenseDto> expenses = expenseService.getTeamExpenses(currentUser.getId(), pageable);
        return ResponseEntity.ok(expenses);
    }

    @GetMapping("/company")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Page<ExpenseDto>> getAllCompanyExpenses(@AuthenticationPrincipal UserPrincipal currentUser,
                                                                Pageable pageable) {
        Page<ExpenseDto> expenses = expenseService.getAllCompanyExpenses(currentUser.getCompanyId(), pageable);
        return ResponseEntity.ok(expenses);
    }

    @GetMapping("/search")
    public ResponseEntity<Page<ExpenseDto>> searchExpenses(@AuthenticationPrincipal UserPrincipal currentUser,
                                                          @RequestParam(required = false) String description,
                                                          @RequestParam(required = false) Expense.ExpenseCategory category,
                                                          @RequestParam(required = false) Expense.ExpenseStatus status,
                                                          @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
                                                          @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
                                                          Pageable pageable) {
        Page<ExpenseDto> expenses = expenseService.searchExpenses(
                currentUser.getId(), currentUser.getCompanyId(), currentUser.getRole(),
                description, category, status, startDate, endDate, pageable);
        return ResponseEntity.ok(expenses);
    }

    @PutMapping("/{expenseId}")
    public ResponseEntity<ApiResponse> updateExpense(@PathVariable Long expenseId,
                                                   @Valid @RequestBody ExpenseDto expenseDto,
                                                   @AuthenticationPrincipal UserPrincipal currentUser) {
        try {
            ExpenseDto updatedExpense = expenseService.updateExpense(expenseId, expenseDto, currentUser.getId());
            return ResponseEntity.ok(ApiResponse.success("Expense updated successfully!", updatedExpense));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to update expense: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{expenseId}")
    public ResponseEntity<ApiResponse> deleteExpense(@PathVariable Long expenseId,
                                                   @AuthenticationPrincipal UserPrincipal currentUser) {
        try {
            expenseService.deleteExpense(expenseId, currentUser.getId());
            return ResponseEntity.ok(ApiResponse.success("Expense deleted successfully!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to delete expense: " + e.getMessage()));
        }
    }
}

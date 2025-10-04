package com.expense.expensemanagement.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class ApprovalActionRequest {
    @NotNull
    private Long expenseId;

    @NotNull
    private Long approvalStepId;

    @NotBlank
    private String action; // "APPROVE", "REJECT", "SKIP"

    @Size(max = 500)
    private String comments;

    public ApprovalActionRequest() {}

    public ApprovalActionRequest(Long expenseId, Long approvalStepId, String action, String comments) {
        this.expenseId = expenseId;
        this.approvalStepId = approvalStepId;
        this.action = action;
        this.comments = comments;
    }

    // Getters and Setters
    public Long getExpenseId() {
        return expenseId;
    }

    public void setExpenseId(Long expenseId) {
        this.expenseId = expenseId;
    }

    public Long getApprovalStepId() {
        return approvalStepId;
    }

    public void setApprovalStepId(Long approvalStepId) {
        this.approvalStepId = approvalStepId;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }
}

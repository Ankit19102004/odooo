package com.expense.expensemanagement.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

@Entity
@Table(name = "approval_steps")
public class ApprovalStep extends BaseEntity {

    public enum ApprovalStatus {
        PENDING, APPROVED, REJECTED, SKIPPED
    }

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private ApprovalStatus status = ApprovalStatus.PENDING;

    @Column(name = "step_order", nullable = false)
    private Integer stepOrder;

    @Size(max = 500)
    @Column(name = "comments")
    private String comments;

    @Column(name = "approved_at")
    private LocalDateTime approvedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "expense_id", nullable = false)
    private Expense expense;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "approver_id", nullable = false)
    private User approver;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "approval_rule_step_id")
    private ApprovalRuleStep approvalRuleStep;

    // Constructors
    public ApprovalStep() {}

    public ApprovalStep(Integer stepOrder, Expense expense, User approver) {
        this.stepOrder = stepOrder;
        this.expense = expense;
        this.approver = approver;
        this.status = ApprovalStatus.PENDING;
    }

    // Helper methods
    public boolean isPending() {
        return status == ApprovalStatus.PENDING;
    }

    public boolean isApproved() {
        return status == ApprovalStatus.APPROVED;
    }

    public boolean isRejected() {
        return status == ApprovalStatus.REJECTED;
    }

    public boolean isSkipped() {
        return status == ApprovalStatus.SKIPPED;
    }

    public void approve(String comments) {
        this.status = ApprovalStatus.APPROVED;
        this.comments = comments;
        this.approvedAt = LocalDateTime.now();
    }

    public void reject(String comments) {
        this.status = ApprovalStatus.REJECTED;
        this.comments = comments;
        this.approvedAt = LocalDateTime.now();
    }

    public void skip(String comments) {
        this.status = ApprovalStatus.SKIPPED;
        this.comments = comments;
        this.approvedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public ApprovalStatus getStatus() {
        return status;
    }

    public void setStatus(ApprovalStatus status) {
        this.status = status;
    }

    public Integer getStepOrder() {
        return stepOrder;
    }

    public void setStepOrder(Integer stepOrder) {
        this.stepOrder = stepOrder;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public LocalDateTime getApprovedAt() {
        return approvedAt;
    }

    public void setApprovedAt(LocalDateTime approvedAt) {
        this.approvedAt = approvedAt;
    }

    public Expense getExpense() {
        return expense;
    }

    public void setExpense(Expense expense) {
        this.expense = expense;
    }

    public User getApprover() {
        return approver;
    }

    public void setApprover(User approver) {
        this.approver = approver;
    }

    public ApprovalRuleStep getApprovalRuleStep() {
        return approvalRuleStep;
    }

    public void setApprovalRuleStep(ApprovalRuleStep approvalRuleStep) {
        this.approvalRuleStep = approvalRuleStep;
    }
}

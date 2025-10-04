package com.expense.expensemanagement.dto;

import com.expense.expensemanagement.model.ApprovalStep;

import java.time.LocalDateTime;

public class ApprovalStepDto {
    private Long id;
    private ApprovalStep.ApprovalStatus status;
    private Integer stepOrder;
    private String comments;
    private LocalDateTime approvedAt;
    private Long approverId;
    private String approverName;
    private String approverRole;

    public ApprovalStepDto() {}

    public ApprovalStepDto(Long id, ApprovalStep.ApprovalStatus status, Integer stepOrder, 
                          String comments, LocalDateTime approvedAt, Long approverId, 
                          String approverName, String approverRole) {
        this.id = id;
        this.status = status;
        this.stepOrder = stepOrder;
        this.comments = comments;
        this.approvedAt = approvedAt;
        this.approverId = approverId;
        this.approverName = approverName;
        this.approverRole = approverRole;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ApprovalStep.ApprovalStatus getStatus() {
        return status;
    }

    public void setStatus(ApprovalStep.ApprovalStatus status) {
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

    public Long getApproverId() {
        return approverId;
    }

    public void setApproverId(Long approverId) {
        this.approverId = approverId;
    }

    public String getApproverName() {
        return approverName;
    }

    public void setApproverName(String approverName) {
        this.approverName = approverName;
    }

    public String getApproverRole() {
        return approverRole;
    }

    public void setApproverRole(String approverRole) {
        this.approverRole = approverRole;
    }
}

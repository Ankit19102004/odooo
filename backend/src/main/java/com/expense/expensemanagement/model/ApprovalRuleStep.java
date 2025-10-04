package com.expense.expensemanagement.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "approval_rule_steps")
public class ApprovalRuleStep extends BaseEntity {

    public enum StepType {
        ROLE_APPROVAL,      // Requires approval from specific role
        USER_APPROVAL,      // Requires approval from specific user
        MANAGER_APPROVAL,   // Requires approval from direct manager
        FINANCE_APPROVAL,   // Requires approval from finance team
        ADMIN_APPROVAL      // Requires approval from admin
    }

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "step_type", nullable = false)
    private StepType stepType;

    @Column(name = "step_order", nullable = false)
    private Integer stepOrder;

    @Column(name = "is_required", nullable = false)
    private Boolean isRequired = true;

    @Column(name = "auto_approve", nullable = false)
    private Boolean autoApprove = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "approval_rule_id", nullable = false)
    private ApprovalRule approvalRule;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "required_role_id")
    private Role requiredRole;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "required_user_id")
    private User requiredUser;

    // Constructors
    public ApprovalRuleStep() {}

    public ApprovalRuleStep(StepType stepType, Integer stepOrder, ApprovalRule approvalRule) {
        this.stepType = stepType;
        this.stepOrder = stepOrder;
        this.approvalRule = approvalRule;
        this.isRequired = true;
        this.autoApprove = false;
    }

    // Helper methods
    public boolean isRoleApproval() {
        return stepType == StepType.ROLE_APPROVAL;
    }

    public boolean isUserApproval() {
        return stepType == StepType.USER_APPROVAL;
    }

    public boolean isManagerApproval() {
        return stepType == StepType.MANAGER_APPROVAL;
    }

    public boolean isFinanceApproval() {
        return stepType == StepType.FINANCE_APPROVAL;
    }

    public boolean isAdminApproval() {
        return stepType == StepType.ADMIN_APPROVAL;
    }

    // Getters and Setters
    public StepType getStepType() {
        return stepType;
    }

    public void setStepType(StepType stepType) {
        this.stepType = stepType;
    }

    public Integer getStepOrder() {
        return stepOrder;
    }

    public void setStepOrder(Integer stepOrder) {
        this.stepOrder = stepOrder;
    }

    public Boolean getIsRequired() {
        return isRequired;
    }

    public void setIsRequired(Boolean isRequired) {
        this.isRequired = isRequired;
    }

    public Boolean getAutoApprove() {
        return autoApprove;
    }

    public void setAutoApprove(Boolean autoApprove) {
        this.autoApprove = autoApprove;
    }

    public ApprovalRule getApprovalRule() {
        return approvalRule;
    }

    public void setApprovalRule(ApprovalRule approvalRule) {
        this.approvalRule = approvalRule;
    }

    public Role getRequiredRole() {
        return requiredRole;
    }

    public void setRequiredRole(Role requiredRole) {
        this.requiredRole = requiredRole;
    }

    public User getRequiredUser() {
        return requiredUser;
    }

    public void setRequiredUser(User requiredUser) {
        this.requiredUser = requiredUser;
    }
}

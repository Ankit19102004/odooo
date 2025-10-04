package com.expense.expensemanagement.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "approval_rules")
public class ApprovalRule extends BaseEntity {

    public enum RuleType {
        AMOUNT_BASED,     // Rules based on expense amount
        PERCENTAGE_BASED, // Rules based on percentage of approvers
        ROLE_BASED,       // Rules based on specific roles
        HYBRID           // Combination of multiple rule types
    }

    public enum ApprovalFlow {
        SEQUENTIAL,      // Approvals must happen in sequence
        PARALLEL,        // Approvals can happen in parallel
        CONDITIONAL      // Conditional approval based on criteria
    }

    @NotBlank
    @Size(max = 100)
    @Column(name = "name", nullable = false)
    private String name;

    @Size(max = 500)
    @Column(name = "description")
    private String description;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "rule_type", nullable = false)
    private RuleType ruleType;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "approval_flow", nullable = false)
    private ApprovalFlow approvalFlow;

    @DecimalMin(value = "0.0")
    @Column(name = "min_amount", precision = 19, scale = 2)
    private BigDecimal minAmount;

    @DecimalMin(value = "0.0")
    @Column(name = "max_amount", precision = 19, scale = 2)
    private BigDecimal maxAmount;

    @Column(name = "required_approval_percentage")
    private Integer requiredApprovalPercentage;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @Column(name = "priority_order", nullable = false)
    private Integer priorityOrder = 0;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @OneToMany(mappedBy = "approvalRule", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ApprovalRuleStep> approvalRuleSteps = new ArrayList<>();

    @OneToMany(mappedBy = "approvalRule", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ApprovalRuleCondition> conditions = new ArrayList<>();

    // Constructors
    public ApprovalRule() {}

    public ApprovalRule(String name, RuleType ruleType, ApprovalFlow approvalFlow, Company company) {
        this.name = name;
        this.ruleType = ruleType;
        this.approvalFlow = approvalFlow;
        this.company = company;
        this.isActive = true;
        this.priorityOrder = 0;
    }

    // Helper methods
    public boolean isAmountBased() {
        return ruleType == RuleType.AMOUNT_BASED;
    }

    public boolean isPercentageBased() {
        return ruleType == RuleType.PERCENTAGE_BASED;
    }

    public boolean isRoleBased() {
        return ruleType == RuleType.ROLE_BASED;
    }

    public boolean isHybrid() {
        return ruleType == RuleType.HYBRID;
    }

    public boolean isSequential() {
        return approvalFlow == ApprovalFlow.SEQUENTIAL;
    }

    public boolean isParallel() {
        return approvalFlow == ApprovalFlow.PARALLEL;
    }

    public boolean isConditional() {
        return approvalFlow == ApprovalFlow.CONDITIONAL;
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public RuleType getRuleType() {
        return ruleType;
    }

    public void setRuleType(RuleType ruleType) {
        this.ruleType = ruleType;
    }

    public ApprovalFlow getApprovalFlow() {
        return approvalFlow;
    }

    public void setApprovalFlow(ApprovalFlow approvalFlow) {
        this.approvalFlow = approvalFlow;
    }

    public BigDecimal getMinAmount() {
        return minAmount;
    }

    public void setMinAmount(BigDecimal minAmount) {
        this.minAmount = minAmount;
    }

    public BigDecimal getMaxAmount() {
        return maxAmount;
    }

    public void setMaxAmount(BigDecimal maxAmount) {
        this.maxAmount = maxAmount;
    }

    public Integer getRequiredApprovalPercentage() {
        return requiredApprovalPercentage;
    }

    public void setRequiredApprovalPercentage(Integer requiredApprovalPercentage) {
        this.requiredApprovalPercentage = requiredApprovalPercentage;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public Integer getPriorityOrder() {
        return priorityOrder;
    }

    public void setPriorityOrder(Integer priorityOrder) {
        this.priorityOrder = priorityOrder;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public List<ApprovalRuleStep> getApprovalRuleSteps() {
        return approvalRuleSteps;
    }

    public void setApprovalRuleSteps(List<ApprovalRuleStep> approvalRuleSteps) {
        this.approvalRuleSteps = approvalRuleSteps;
    }

    public List<ApprovalRuleCondition> getConditions() {
        return conditions;
    }

    public void setConditions(List<ApprovalRuleCondition> conditions) {
        this.conditions = conditions;
    }
}

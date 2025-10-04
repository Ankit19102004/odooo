package com.expense.expensemanagement.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "approval_rule_conditions")
public class ApprovalRuleCondition extends BaseEntity {

    public enum ConditionType {
        AMOUNT_RANGE,       // Amount falls within specific range
        CURRENCY_EQUALS,    // Currency matches specific value
        CATEGORY_EQUALS,    // Category matches specific value
        EMPLOYEE_ROLE,      // Employee has specific role
        EMPLOYEE_DEPARTMENT, // Employee belongs to specific department
        CUSTOM_FIELD        // Custom field condition
    }

    public enum Operator {
        EQUALS, NOT_EQUALS, GREATER_THAN, LESS_THAN, 
        GREATER_THAN_OR_EQUAL, LESS_THAN_OR_EQUAL, 
        CONTAINS, NOT_CONTAINS, IN, NOT_IN
    }

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "condition_type", nullable = false)
    private ConditionType conditionType;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "operator", nullable = false)
    private Operator operator;

    @NotBlank
    @Column(name = "field_name", nullable = false)
    private String fieldName;

    @Column(name = "field_value")
    private String fieldValue;

    @Column(name = "condition_order", nullable = false)
    private Integer conditionOrder = 0;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "approval_rule_id", nullable = false)
    private ApprovalRule approvalRule;

    // Constructors
    public ApprovalRuleCondition() {}

    public ApprovalRuleCondition(ConditionType conditionType, Operator operator, 
                                String fieldName, String fieldValue, ApprovalRule approvalRule) {
        this.conditionType = conditionType;
        this.operator = operator;
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;
        this.approvalRule = approvalRule;
        this.isActive = true;
        this.conditionOrder = 0;
    }

    // Helper methods
    public boolean isAmountRange() {
        return conditionType == ConditionType.AMOUNT_RANGE;
    }

    public boolean isCurrencyEquals() {
        return conditionType == ConditionType.CURRENCY_EQUALS;
    }

    public boolean isCategoryEquals() {
        return conditionType == ConditionType.CATEGORY_EQUALS;
    }

    public boolean isEmployeeRole() {
        return conditionType == ConditionType.EMPLOYEE_ROLE;
    }

    public boolean isEmployeeDepartment() {
        return conditionType == ConditionType.EMPLOYEE_DEPARTMENT;
    }

    public boolean isCustomField() {
        return conditionType == ConditionType.CUSTOM_FIELD;
    }

    // Getters and Setters
    public ConditionType getConditionType() {
        return conditionType;
    }

    public void setConditionType(ConditionType conditionType) {
        this.conditionType = conditionType;
    }

    public Operator getOperator() {
        return operator;
    }

    public void setOperator(Operator operator) {
        this.operator = operator;
    }

    public String getFieldName() {
        return fieldName;
    }

    public void setFieldName(String fieldName) {
        this.fieldName = fieldName;
    }

    public String getFieldValue() {
        return fieldValue;
    }

    public void setFieldValue(String fieldValue) {
        this.fieldValue = fieldValue;
    }

    public Integer getConditionOrder() {
        return conditionOrder;
    }

    public void setConditionOrder(Integer conditionOrder) {
        this.conditionOrder = conditionOrder;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public ApprovalRule getApprovalRule() {
        return approvalRule;
    }

    public void setApprovalRule(ApprovalRule approvalRule) {
        this.approvalRule = approvalRule;
    }
}

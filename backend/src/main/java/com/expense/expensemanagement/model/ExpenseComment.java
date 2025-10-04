package com.expense.expensemanagement.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "expense_comments")
public class ExpenseComment extends BaseEntity {

    @NotBlank
    @Size(max = 1000)
    @Column(name = "comment", nullable = false, columnDefinition = "TEXT")
    private String comment;

    @Column(name = "is_internal", nullable = false)
    private Boolean isInternal = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "expense_id", nullable = false)
    private Expense expense;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Constructors
    public ExpenseComment() {}

    public ExpenseComment(String comment, Expense expense, User user) {
        this.comment = comment;
        this.expense = expense;
        this.user = user;
        this.isInternal = false;
    }

    public ExpenseComment(String comment, Expense expense, User user, Boolean isInternal) {
        this.comment = comment;
        this.expense = expense;
        this.user = user;
        this.isInternal = isInternal;
    }

    // Getters and Setters
    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Boolean getIsInternal() {
        return isInternal;
    }

    public void setIsInternal(Boolean isInternal) {
        this.isInternal = isInternal;
    }

    public Expense getExpense() {
        return expense;
    }

    public void setExpense(Expense expense) {
        this.expense = expense;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}

package com.expense.expensemanagement.dto;

import com.expense.expensemanagement.model.Expense;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDate;

public class CreateExpenseRequest {
    @NotBlank
    @Size(max = 255)
    private String description;

    @NotNull
    @DecimalMin(value = "0.01", message = "Amount must be greater than 0")
    private BigDecimal amount;

    @NotBlank
    @Size(max = 3)
    private String currency;

    @NotNull
    private Expense.ExpenseCategory category;

    @NotNull
    private LocalDate expenseDate;

    @Size(max = 500)
    private String notes;

    public CreateExpenseRequest() {}

    public CreateExpenseRequest(String description, BigDecimal amount, String currency, 
                               Expense.ExpenseCategory category, LocalDate expenseDate) {
        this.description = description;
        this.amount = amount;
        this.currency = currency;
        this.category = category;
        this.expenseDate = expenseDate;
    }

    // Getters and Setters
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public Expense.ExpenseCategory getCategory() {
        return category;
    }

    public void setCategory(Expense.ExpenseCategory category) {
        this.category = category;
    }

    public LocalDate getExpenseDate() {
        return expenseDate;
    }

    public void setExpenseDate(LocalDate expenseDate) {
        this.expenseDate = expenseDate;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}

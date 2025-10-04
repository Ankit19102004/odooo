package com.expense.expensemanagement.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "expenses")
public class Expense extends BaseEntity {

    public enum ExpenseStatus {
        DRAFT, SUBMITTED, PENDING, APPROVED, REJECTED, PAID
    }

    public enum ExpenseCategory {
        TRAVEL, MEALS, ACCOMMODATION, TRANSPORTATION, OFFICE_SUPPLIES, 
        ENTERTAINMENT, TRAINING, SOFTWARE, HARDWARE, OTHER
    }

    @NotBlank
    @Size(max = 255)
    @Column(name = "description", nullable = false)
    private String description;

    @NotNull
    @DecimalMin(value = "0.01", message = "Amount must be greater than 0")
    @Column(name = "amount", nullable = false, precision = 19, scale = 2)
    private BigDecimal amount;

    @NotBlank
    @Size(max = 3)
    @Column(name = "currency", nullable = false, length = 3)
    private String currency;

    @NotNull
    @DecimalMin(value = "0.01")
    @Column(name = "converted_amount", nullable = false, precision = 19, scale = 2)
    private BigDecimal convertedAmount;

    @NotBlank
    @Size(max = 3)
    @Column(name = "converted_currency", nullable = false, length = 3)
    private String convertedCurrency;

    @NotNull
    @Column(name = "exchange_rate", nullable = false, precision = 19, scale = 6)
    private BigDecimal exchangeRate;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "category", nullable = false)
    private ExpenseCategory category;

    @NotNull
    @Column(name = "expense_date", nullable = false)
    private LocalDate expenseDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private ExpenseStatus status = ExpenseStatus.DRAFT;

    @Size(max = 255)
    @Column(name = "receipt_filename")
    private String receiptFilename;

    @Size(max = 500)
    @Column(name = "notes")
    private String notes;

    @Size(max = 500)
    @Column(name = "rejection_reason")
    private String rejectionReason;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", nullable = false)
    private User employee;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @OneToMany(mappedBy = "expense", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ApprovalStep> approvalSteps = new ArrayList<>();

    @OneToMany(mappedBy = "expense", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ExpenseComment> comments = new ArrayList<>();

    // Constructors
    public Expense() {}

    public Expense(String description, BigDecimal amount, String currency, 
                   ExpenseCategory category, LocalDate expenseDate, User employee, Company company) {
        this.description = description;
        this.amount = amount;
        this.currency = currency;
        this.category = category;
        this.expenseDate = expenseDate;
        this.employee = employee;
        this.company = company;
        this.status = ExpenseStatus.DRAFT;
    }

    // Helper methods
    public boolean isDraft() {
        return status == ExpenseStatus.DRAFT;
    }

    public boolean isSubmitted() {
        return status == ExpenseStatus.SUBMITTED;
    }

    public boolean isPending() {
        return status == ExpenseStatus.PENDING;
    }

    public boolean isApproved() {
        return status == ExpenseStatus.APPROVED;
    }

    public boolean isRejected() {
        return status == ExpenseStatus.REJECTED;
    }

    public boolean isPaid() {
        return status == ExpenseStatus.PAID;
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

    public BigDecimal getConvertedAmount() {
        return convertedAmount;
    }

    public void setConvertedAmount(BigDecimal convertedAmount) {
        this.convertedAmount = convertedAmount;
    }

    public String getConvertedCurrency() {
        return convertedCurrency;
    }

    public void setConvertedCurrency(String convertedCurrency) {
        this.convertedCurrency = convertedCurrency;
    }

    public BigDecimal getExchangeRate() {
        return exchangeRate;
    }

    public void setExchangeRate(BigDecimal exchangeRate) {
        this.exchangeRate = exchangeRate;
    }

    public ExpenseCategory getCategory() {
        return category;
    }

    public void setCategory(ExpenseCategory category) {
        this.category = category;
    }

    public LocalDate getExpenseDate() {
        return expenseDate;
    }

    public void setExpenseDate(LocalDate expenseDate) {
        this.expenseDate = expenseDate;
    }

    public ExpenseStatus getStatus() {
        return status;
    }

    public void setStatus(ExpenseStatus status) {
        this.status = status;
    }

    public String getReceiptFilename() {
        return receiptFilename;
    }

    public void setReceiptFilename(String receiptFilename) {
        this.receiptFilename = receiptFilename;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getRejectionReason() {
        return rejectionReason;
    }

    public void setRejectionReason(String rejectionReason) {
        this.rejectionReason = rejectionReason;
    }

    public User getEmployee() {
        return employee;
    }

    public void setEmployee(User employee) {
        this.employee = employee;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public List<ApprovalStep> getApprovalSteps() {
        return approvalSteps;
    }

    public void setApprovalSteps(List<ApprovalStep> approvalSteps) {
        this.approvalSteps = approvalSteps;
    }

    public List<ExpenseComment> getComments() {
        return comments;
    }

    public void setComments(List<ExpenseComment> comments) {
        this.comments = comments;
    }
}

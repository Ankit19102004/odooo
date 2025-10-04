package com.expense.expensemanagement.dto;

import com.expense.expensemanagement.model.Expense;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public class ExpenseDto {
    private Long id;

    @NotBlank
    @Size(max = 255)
    private String description;

    @NotNull
    @DecimalMin(value = "0.01", message = "Amount must be greater than 0")
    private BigDecimal amount;

    @NotBlank
    @Size(max = 3)
    private String currency;

    private BigDecimal convertedAmount;

    @NotBlank
    @Size(max = 3)
    private String convertedCurrency;

    private BigDecimal exchangeRate;

    @NotNull
    private Expense.ExpenseCategory category;

    @NotNull
    private LocalDate expenseDate;

    private Expense.ExpenseStatus status;

    private String receiptFilename;

    @Size(max = 500)
    private String notes;

    private String rejectionReason;

    private Long employeeId;
    private String employeeName;

    private Long companyId;
    private String companyName;

    private List<ApprovalStepDto> approvalSteps;

    private List<ExpenseCommentDto> comments;

    public ExpenseDto() {}

    public ExpenseDto(Long id, String description, BigDecimal amount, String currency, 
                     Expense.ExpenseCategory category, LocalDate expenseDate, Expense.ExpenseStatus status) {
        this.id = id;
        this.description = description;
        this.amount = amount;
        this.currency = currency;
        this.category = category;
        this.expenseDate = expenseDate;
        this.status = status;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public Expense.ExpenseStatus getStatus() {
        return status;
    }

    public void setStatus(Expense.ExpenseStatus status) {
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

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public Long getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Long companyId) {
        this.companyId = companyId;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public List<ApprovalStepDto> getApprovalSteps() {
        return approvalSteps;
    }

    public void setApprovalSteps(List<ApprovalStepDto> approvalSteps) {
        this.approvalSteps = approvalSteps;
    }

    public List<ExpenseCommentDto> getComments() {
        return comments;
    }

    public void setComments(List<ExpenseCommentDto> comments) {
        this.comments = comments;
    }
}

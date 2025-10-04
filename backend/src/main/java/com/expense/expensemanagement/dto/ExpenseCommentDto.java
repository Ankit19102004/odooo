package com.expense.expensemanagement.dto;

import java.time.LocalDateTime;

public class ExpenseCommentDto {
    private Long id;
    private String comment;
    private Boolean isInternal;
    private LocalDateTime createdAt;
    private Long userId;
    private String userName;

    public ExpenseCommentDto() {}

    public ExpenseCommentDto(Long id, String comment, Boolean isInternal, 
                           LocalDateTime createdAt, Long userId, String userName) {
        this.id = id;
        this.comment = comment;
        this.isInternal = isInternal;
        this.createdAt = createdAt;
        this.userId = userId;
        this.userName = userName;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}

package com.expense.expensemanagement.repository;

import com.expense.expensemanagement.model.ExpenseComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpenseCommentRepository extends JpaRepository<ExpenseComment, Long> {

    List<ExpenseComment> findByExpenseIdOrderByCreatedAtDesc(Long expenseId);

    List<ExpenseComment> findByExpenseIdAndIsInternalFalseOrderByCreatedAtDesc(Long expenseId);

    List<ExpenseComment> findByExpenseIdAndUserIdOrderByCreatedAtDesc(Long expenseId, Long userId);

    @Query("SELECT ec FROM ExpenseComment ec WHERE ec.expense.id = :expenseId AND (ec.isInternal = false OR ec.user.id = :userId) ORDER BY ec.createdAt DESC")
    List<ExpenseComment> findVisibleCommentsForUser(@Param("expenseId") Long expenseId, @Param("userId") Long userId);
}

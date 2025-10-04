package com.expense.expensemanagement.service;

import com.expense.expensemanagement.dto.*;
import com.expense.expensemanagement.model.*;
import com.expense.expensemanagement.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private ApprovalStepRepository approvalStepRepository;

    @Autowired
    private ExpenseCommentRepository expenseCommentRepository;

    @Autowired
    private CurrencyConversionService currencyConversionService;

    @Value("${file.upload-dir}")
    private String uploadDir;

    public ExpenseDto createExpense(Long employeeId, CreateExpenseRequest createExpenseRequest) {
        User employee = userRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        Company company = employee.getCompany();
        String companyCurrency = company.getDefaultCurrency();

        // Convert currency if needed
        BigDecimal convertedAmount = currencyConversionService.convertCurrency(
                createExpenseRequest.getAmount(),
                createExpenseRequest.getCurrency(),
                companyCurrency
        );

        BigDecimal exchangeRate = currencyConversionService.getExchangeRate(
                createExpenseRequest.getCurrency(),
                companyCurrency
        );

        Expense expense = new Expense(
                createExpenseRequest.getDescription(),
                createExpenseRequest.getAmount(),
                createExpenseRequest.getCurrency(),
                createExpenseRequest.getCategory(),
                createExpenseRequest.getExpenseDate(),
                employee,
                company
        );

        expense.setConvertedAmount(convertedAmount);
        expense.setConvertedCurrency(companyCurrency);
        expense.setExchangeRate(exchangeRate);
        expense.setNotes(createExpenseRequest.getNotes());
        expense.setStatus(Expense.ExpenseStatus.DRAFT);

        expense = expenseRepository.save(expense);
        return convertToDto(expense);
    }

    public ExpenseDto submitExpense(Long expenseId, Long employeeId) {
        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        // Check if user owns the expense
        if (!expense.getEmployee().getId().equals(employeeId)) {
            throw new RuntimeException("You can only submit your own expenses");
        }

        if (expense.getStatus() != Expense.ExpenseStatus.DRAFT) {
            throw new RuntimeException("Only draft expenses can be submitted");
        }

        expense.setStatus(Expense.ExpenseStatus.SUBMITTED);
        expense = expenseRepository.save(expense);

        // TODO: Trigger approval workflow
        // approvalWorkflowService.startApprovalWorkflow(expense);

        return convertToDto(expense);
    }

    public ExpenseDto uploadReceipt(Long expenseId, MultipartFile file, Long employeeId) {
        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        // Check if user owns the expense
        if (!expense.getEmployee().getId().equals(employeeId)) {
            throw new RuntimeException("You can only upload receipts for your own expenses");
        }

        try {
            // Create upload directory if it doesn't exist
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Generate unique filename
            String originalFilename = file.getOriginalFilename();
            String extension = originalFilename != null ? 
                    originalFilename.substring(originalFilename.lastIndexOf(".")) : "";
            String filename = UUID.randomUUID().toString() + extension;

            // Save file
            Path filePath = uploadPath.resolve(filename);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            expense.setReceiptFilename(filename);
            expense = expenseRepository.save(expense);

            return convertToDto(expense);
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload receipt: " + e.getMessage());
        }
    }

    public Page<ExpenseDto> getExpensesByEmployee(Long employeeId, Pageable pageable) {
        Page<Expense> expenses = expenseRepository.findByEmployeeIdAndIsActiveTrueOrderByCreatedAtDesc(employeeId, pageable);
        return expenses.map(this::convertToDto);
    }

    public ExpenseDto getExpense(Long expenseId, Long userId, Long companyId) {
        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        // Check permissions
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!expense.getEmployee().getId().equals(userId) && 
            !user.isAdmin() && 
            !expense.getCompany().getId().equals(companyId)) {
            throw new RuntimeException("You don't have permission to view this expense");
        }

        return convertToDto(expense);
    }

    public List<ExpenseDto> getPendingApprovalsForUser(Long userId) {
        List<ApprovalStep> pendingSteps = approvalStepRepository.findPendingApprovalsForUser(userId);
        return pendingSteps.stream()
                .map(step -> convertToDto(step.getExpense()))
                .collect(Collectors.toList());
    }

    public Page<ExpenseDto> getTeamExpenses(Long managerId, Pageable pageable) {
        List<User> subordinates = userRepository.findActiveSubordinatesByManager(managerId);
        List<Long> subordinateIds = subordinates.stream()
                .map(User::getId)
                .collect(Collectors.toList());

        // This would need a custom query in the repository
        // For now, return empty page
        return Page.empty();
    }

    public Page<ExpenseDto> getAllCompanyExpenses(Long companyId, Pageable pageable) {
        Page<Expense> expenses = expenseRepository.findByCompanyIdOrderByCreatedAtDesc(companyId, pageable);
        return expenses.map(this::convertToDto);
    }

    public Page<ExpenseDto> searchExpenses(Long userId, Long companyId, String role,
                                         String description, Expense.ExpenseCategory category,
                                         Expense.ExpenseStatus status, LocalDate startDate,
                                         LocalDate endDate, Pageable pageable) {
        // This would need custom repository methods based on user role and search criteria
        // For now, return user's own expenses
        return getExpensesByEmployee(userId, pageable);
    }

    public ExpenseDto updateExpense(Long expenseId, ExpenseDto expenseDto, Long userId) {
        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        // Check permissions
        if (!expense.getEmployee().getId().equals(userId)) {
            throw new RuntimeException("You can only update your own expenses");
        }

        if (expense.getStatus() != Expense.ExpenseStatus.DRAFT) {
            throw new RuntimeException("Only draft expenses can be updated");
        }

        expense.setDescription(expenseDto.getDescription());
        expense.setAmount(expenseDto.getAmount());
        expense.setCurrency(expenseDto.getCurrency());
        expense.setCategory(expenseDto.getCategory());
        expense.setExpenseDate(expenseDto.getExpenseDate());
        expense.setNotes(expenseDto.getNotes());

        // Recalculate conversion if currency changed
        if (!expense.getCurrency().equals(expenseDto.getCurrency()) || 
            !expense.getAmount().equals(expenseDto.getAmount())) {
            
            BigDecimal convertedAmount = currencyConversionService.convertCurrency(
                    expenseDto.getAmount(),
                    expenseDto.getCurrency(),
                    expense.getCompany().getDefaultCurrency()
            );

            BigDecimal exchangeRate = currencyConversionService.getExchangeRate(
                    expenseDto.getCurrency(),
                    expense.getCompany().getDefaultCurrency()
            );

            expense.setConvertedAmount(convertedAmount);
            expense.setExchangeRate(exchangeRate);
        }

        expense = expenseRepository.save(expense);
        return convertToDto(expense);
    }

    public void deleteExpense(Long expenseId, Long userId) {
        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        // Check permissions
        if (!expense.getEmployee().getId().equals(userId)) {
            throw new RuntimeException("You can only delete your own expenses");
        }

        if (expense.getStatus() != Expense.ExpenseStatus.DRAFT) {
            throw new RuntimeException("Only draft expenses can be deleted");
        }

        expenseRepository.delete(expense);
    }

    public ExpenseDto convertToDto(Expense expense) {
        ExpenseDto dto = new ExpenseDto(
                expense.getId(),
                expense.getDescription(),
                expense.getAmount(),
                expense.getCurrency(),
                expense.getCategory(),
                expense.getExpenseDate(),
                expense.getStatus()
        );

        dto.setConvertedAmount(expense.getConvertedAmount());
        dto.setConvertedCurrency(expense.getConvertedCurrency());
        dto.setExchangeRate(expense.getExchangeRate());
        dto.setReceiptFilename(expense.getReceiptFilename());
        dto.setNotes(expense.getNotes());
        dto.setRejectionReason(expense.getRejectionReason());
        dto.setEmployeeId(expense.getEmployee().getId());
        dto.setEmployeeName(expense.getEmployee().getFullName());
        dto.setCompanyId(expense.getCompany().getId());
        dto.setCompanyName(expense.getCompany().getName());

        // Convert approval steps
        if (expense.getApprovalSteps() != null) {
            List<ApprovalStepDto> approvalStepDtos = expense.getApprovalSteps().stream()
                    .map(this::convertApprovalStepToDto)
                    .collect(Collectors.toList());
            dto.setApprovalSteps(approvalStepDtos);
        }

        // Convert comments
        if (expense.getComments() != null) {
            List<ExpenseCommentDto> commentDtos = expense.getComments().stream()
                    .map(this::convertCommentToDto)
                    .collect(Collectors.toList());
            dto.setComments(commentDtos);
        }

        return dto;
    }

    private ApprovalStepDto convertApprovalStepToDto(ApprovalStep step) {
        return new ApprovalStepDto(
                step.getId(),
                step.getStatus(),
                step.getStepOrder(),
                step.getComments(),
                step.getApprovedAt(),
                step.getApprover().getId(),
                step.getApprover().getFullName(),
                step.getApprover().getRole().getRoleType().name()
        );
    }

    private ExpenseCommentDto convertCommentToDto(ExpenseComment comment) {
        return new ExpenseCommentDto(
                comment.getId(),
                comment.getComment(),
                comment.getIsInternal(),
                comment.getCreatedAt(),
                comment.getUser().getId(),
                comment.getUser().getFullName()
        );
    }
}

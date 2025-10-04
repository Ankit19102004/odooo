package com.expense.expensemanagement.controller;

import com.expense.expensemanagement.dto.*;
import com.expense.expensemanagement.model.User;
import com.expense.expensemanagement.security.UserPrincipal;
import com.expense.expensemanagement.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserDto> getCurrentUser(@AuthenticationPrincipal UserPrincipal currentUser) {
        UserDto user = userService.getCurrentUser(currentUser.getId());
        return ResponseEntity.ok(user);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    public ResponseEntity<Page<UserDto>> getAllUsers(@AuthenticationPrincipal UserPrincipal currentUser,
                                                   Pageable pageable) {
        Page<UserDto> users = userService.getAllUsersInCompany(currentUser.getCompanyId(), pageable);
        return ResponseEntity.ok(users);
    }

    @GetMapping("/search")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    public ResponseEntity<List<UserDto>> searchUsers(@AuthenticationPrincipal UserPrincipal currentUser,
                                                   @RequestParam String searchTerm) {
        List<UserDto> users = userService.searchUsersInCompany(currentUser.getCompanyId(), searchTerm);
        return ResponseEntity.ok(users);
    }

    @GetMapping("/managers")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    public ResponseEntity<List<UserDto>> getManagers(@AuthenticationPrincipal UserPrincipal currentUser) {
        List<UserDto> managers = userService.getManagersInCompany(currentUser.getCompanyId());
        return ResponseEntity.ok(managers);
    }

    @GetMapping("/subordinates")
    @PreAuthorize("hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<List<UserDto>> getSubordinates(@AuthenticationPrincipal UserPrincipal currentUser) {
        List<UserDto> subordinates = userService.getSubordinates(currentUser.getId());
        return ResponseEntity.ok(subordinates);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> createUser(@AuthenticationPrincipal UserPrincipal currentUser,
                                                @Valid @RequestBody CreateUserRequest createUserRequest) {
        try {
            UserDto user = userService.createUser(currentUser.getCompanyId(), createUserRequest);
            return ResponseEntity.ok(ApiResponse.success("User created successfully!", user));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to create user: " + e.getMessage()));
        }
    }

    @PutMapping("/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> updateUser(@PathVariable Long userId,
                                                @Valid @RequestBody UserDto userDto) {
        try {
            UserDto updatedUser = userService.updateUser(userId, userDto);
            return ResponseEntity.ok(ApiResponse.success("User updated successfully!", updatedUser));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to update user: " + e.getMessage()));
        }
    }

    @PutMapping("/{userId}/role")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> updateUserRole(@PathVariable Long userId,
                                                    @RequestParam String roleType) {
        try {
            UserDto updatedUser = userService.updateUserRole(userId, roleType);
            return ResponseEntity.ok(ApiResponse.success("User role updated successfully!", updatedUser));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to update user role: " + e.getMessage()));
        }
    }

    @PutMapping("/{userId}/manager")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> updateUserManager(@PathVariable Long userId,
                                                       @RequestParam(required = false) Long managerId) {
        try {
            UserDto updatedUser = userService.updateUserManager(userId, managerId);
            return ResponseEntity.ok(ApiResponse.success("User manager updated successfully!", updatedUser));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to update user manager: " + e.getMessage()));
        }
    }

    @PutMapping("/{userId}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> updateUserStatus(@PathVariable Long userId,
                                                      @RequestParam Boolean isActive) {
        try {
            UserDto updatedUser = userService.updateUserStatus(userId, isActive);
            return ResponseEntity.ok(ApiResponse.success("User status updated successfully!", updatedUser));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to update user status: " + e.getMessage()));
        }
    }
}

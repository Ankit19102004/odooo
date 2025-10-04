package com.expense.expensemanagement.service;

import com.expense.expensemanagement.dto.*;
import com.expense.expensemanagement.model.*;
import com.expense.expensemanagement.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserDto getCurrentUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return convertToDto(user);
    }

    public Page<UserDto> getAllUsersInCompany(Long companyId, Pageable pageable) {
        Page<User> users = userRepository.findAll(pageable);
        List<User> companyUsers = users.getContent().stream()
                .filter(user -> user.getCompany().getId().equals(companyId))
                .collect(Collectors.toList());
        
        List<UserDto> userDtos = companyUsers.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
        
        return new PageImpl<>(userDtos, pageable, companyUsers.size());
    }

    public List<UserDto> searchUsersInCompany(Long companyId, String searchTerm) {
        List<User> users = userRepository.searchUsersInCompany(companyId, searchTerm);
        return users.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<UserDto> getManagersInCompany(Long companyId) {
        List<User> managers = userRepository.findByCompanyIdAndRoleRoleTypeAndIsActiveTrue(
                companyId, Role.RoleType.MANAGER);
        return managers.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<UserDto> getSubordinates(Long managerId) {
        List<User> subordinates = userRepository.findActiveSubordinatesByManager(managerId);
        return subordinates.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public UserDto createUser(Long companyId, CreateUserRequest createUserRequest) {
        // Check if username or email already exists
        if (userRepository.existsByUsername(createUserRequest.getUsername())) {
            throw new RuntimeException("Username is already taken!");
        }

        if (userRepository.existsByEmail(createUserRequest.getEmail())) {
            throw new RuntimeException("Email is already in use!");
        }

        // Get company
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));

        // Get role
        Role.RoleType roleType = Role.RoleType.valueOf(createUserRequest.getRoleType());
        Role role = roleRepository.findByRoleType(roleType)
                .orElseThrow(() -> new RuntimeException("Role not found"));

        // Create user
        User user = new User(
                createUserRequest.getUsername(),
                createUserRequest.getEmail(),
                passwordEncoder.encode(createUserRequest.getPassword()),
                createUserRequest.getFirstName(),
                createUserRequest.getLastName(),
                company,
                role
        );
        user.setPhone(createUserRequest.getPhone());

        // Set manager if provided
        if (createUserRequest.getManagerId() != null) {
            User manager = userRepository.findById(createUserRequest.getManagerId())
                    .orElseThrow(() -> new RuntimeException("Manager not found"));
            user.setManager(manager);
        }

        user = userRepository.save(user);
        return convertToDto(user);
    }

    public UserDto updateUser(Long userId, UserDto userDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setPhone(userDto.getPhone());
        user.setIsActive(userDto.getIsActive());

        user = userRepository.save(user);
        return convertToDto(user);
    }

    public UserDto updateUserRole(Long userId, String roleType) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Role.RoleType newRoleType = Role.RoleType.valueOf(roleType);
        Role role = roleRepository.findByRoleType(newRoleType)
                .orElseThrow(() -> new RuntimeException("Role not found"));

        user.setRole(role);
        user = userRepository.save(user);
        return convertToDto(user);
    }

    public UserDto updateUserManager(Long userId, Long managerId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (managerId != null) {
            User manager = userRepository.findById(managerId)
                    .orElseThrow(() -> new RuntimeException("Manager not found"));
            user.setManager(manager);
        } else {
            user.setManager(null);
        }

        user = userRepository.save(user);
        return convertToDto(user);
    }

    public UserDto updateUserStatus(Long userId, Boolean isActive) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setIsActive(isActive);
        user = userRepository.save(user);
        return convertToDto(user);
    }

    private UserDto convertToDto(User user) {
        UserDto dto = new UserDto(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName()
        );
        dto.setPhone(user.getPhone());
        dto.setIsActive(user.getIsActive());
        dto.setCompanyId(user.getCompany().getId());
        dto.setCompanyName(user.getCompany().getName());
        dto.setRoleId(user.getRole().getId());
        dto.setRoleName(user.getRole().getRoleType().name());
        
        if (user.getManager() != null) {
            dto.setManagerId(user.getManager().getId());
            dto.setManagerName(user.getManager().getFullName());
        }

        return dto;
    }
}

package com.expense.expensemanagement.service;

import com.expense.expensemanagement.dto.*;
import com.expense.expensemanagement.model.*;
import com.expense.expensemanagement.repository.*;
import com.expense.expensemanagement.security.JwtTokenProvider;
import com.expense.expensemanagement.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider tokenProvider;

    public JwtAuthenticationResponse authenticateUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsernameOrEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        String jwt = tokenProvider.generateToken(authentication);

        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        JwtAuthenticationResponse.UserSummary userSummary = createUserSummary(user);

        return new JwtAuthenticationResponse(jwt, userSummary);
    }

    public JwtAuthenticationResponse registerUser(SignupRequest signUpRequest) {
        // Check if username or email already exists
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            throw new RuntimeException("Username is already taken!");
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new RuntimeException("Email is already in use!");
        }

        // Create company
        Company company = new Company(
                signUpRequest.getCompanyName(),
                signUpRequest.getDefaultCurrency()
        );
        company.setDescription(signUpRequest.getCompanyDescription());
        company.setAddress(signUpRequest.getCompanyAddress());
        company.setPhone(signUpRequest.getCompanyPhone());
        company.setEmail(signUpRequest.getCompanyEmail());
        company = companyRepository.save(company);

        // Get admin role
        Role adminRole = roleRepository.findByRoleType(Role.RoleType.ADMIN)
                .orElseThrow(() -> new RuntimeException("Admin role not found"));

        // Create admin user
        User user = new User(
                signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                passwordEncoder.encode(signUpRequest.getPassword()),
                signUpRequest.getFirstName(),
                signUpRequest.getLastName(),
                company,
                adminRole
        );
        user.setPhone(signUpRequest.getPhone());
        user = userRepository.save(user);

        // Generate JWT token
        String jwt = tokenProvider.generateTokenFromUserId(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole().getRoleType().name(),
                user.getCompany().getId()
        );

        JwtAuthenticationResponse.UserSummary userSummary = createUserSummary(user);

        return new JwtAuthenticationResponse(jwt, userSummary);
    }

    public JwtAuthenticationResponse refreshToken(String token) {
        if (tokenProvider.validateToken(token)) {
            Long userId = tokenProvider.getUserIdFromToken(token);
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            String newJwt = tokenProvider.generateTokenFromUserId(
                    user.getId(),
                    user.getUsername(),
                    user.getEmail(),
                    user.getRole().getRoleType().name(),
                    user.getCompany().getId()
            );

            JwtAuthenticationResponse.UserSummary userSummary = createUserSummary(user);
            return new JwtAuthenticationResponse(newJwt, userSummary);
        }
        throw new RuntimeException("Invalid token");
    }

    private JwtAuthenticationResponse.UserSummary createUserSummary(User user) {
        return new JwtAuthenticationResponse.UserSummary(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getRole().getRoleType().name(),
                user.getCompany().getId(),
                user.getCompany().getName()
        );
    }
}


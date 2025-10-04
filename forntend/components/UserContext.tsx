import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'admin' | 'manager' | 'employee';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  avatar?: string;
  companyId?: string;
}

export interface ApprovalRule {
  id: string;
  name: string;
  type: 'percentage' | 'specific' | 'hybrid';
  percentageThreshold?: number;
  specificApprovers?: string[];
  amountThreshold?: number;
  isActive: boolean;
  priority: number;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User, token: string) => void;
  approvalRules: ApprovalRule[];
  setApprovalRules: (rules: ApprovalRule[]) => void;
  hasPermission: (permission: string) => boolean;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
  value?: {
    user: User | null;
    setUser: (user: User, token: string) => void;
    logout: () => void;
  };
}

export const UserProvider: React.FC<UserProviderProps> = ({ children, value }) => {
  const [user, setUser] = useState<User | null>(value?.user || null);
  const [approvalRules, setApprovalRules] = useState<ApprovalRule[]>([
    {
      id: '1',
      name: 'Standard Approval',
      type: 'percentage',
      percentageThreshold: 60,
      amountThreshold: 1000,
      isActive: true,
      priority: 1,
    },
    {
      id: '2',
      name: 'CFO Override',
      type: 'specific',
      specificApprovers: ['cfo@company.com'],
      amountThreshold: 5000,
      isActive: true,
      priority: 2,
    },
    {
      id: '3',
      name: 'High Value Hybrid',
      type: 'hybrid',
      percentageThreshold: 75,
      specificApprovers: ['cfo@company.com', 'ceo@company.com'],
      amountThreshold: 10000,
      isActive: true,
      priority: 3,
    },
  ]);

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;

    const permissions = {
      admin: [
        'create_company',
        'manage_users',
        'set_roles',
        'configure_approval_rules',
        'view_all_expenses',
        'override_approvals',
        'view_analytics',
        'manage_settings',
      ],
      manager: [
        'approve_expenses',
        'reject_expenses',
        'view_team_expenses',
        'escalate_expenses',
        'view_analytics',
      ],
      employee: [
        'submit_expenses',
        'view_own_expenses',
        'check_approval_status',
        'edit_draft_expenses',
      ],
    };

    return permissions[user.role]?.includes(permission) || false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser: value?.setUser || setUser,
        approvalRules,
        setApprovalRules,
        hasPermission,
        logout: value?.logout || logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
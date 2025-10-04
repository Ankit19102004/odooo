import React from 'react';
import { Home, Users, FileText, CheckSquare, Settings, Bell, User, Menu, X, Shield, BarChart, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { useUser } from './UserContext';

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  currentView, 
  onViewChange, 
  isMobileMenuOpen, 
  setIsMobileMenuOpen 
}) => {
  const { user, hasPermission, logout } = useUser();

  if (!user) return null;

  const getNavItemsForRole = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Home, permission: null },
    ];

    const roleSpecificItems = {
      admin: [
        { id: 'admin', label: 'Admin Panel', icon: Shield, permission: 'manage_users' },
        { id: 'manager', label: 'Approvals', icon: CheckSquare, permission: 'view_all_expenses' },
        { id: 'employee', label: 'Expenses', icon: FileText, permission: 'view_all_expenses' },
        { id: 'analytics', label: 'Analytics', icon: BarChart, permission: 'view_analytics' },
      ],
      manager: [
        { id: 'manager', label: 'Approvals', icon: CheckSquare, permission: 'approve_expenses' },
        { id: 'employee', label: 'My Expenses', icon: FileText, permission: 'submit_expenses' },
      ],
      employee: [
        { id: 'employee', label: 'My Expenses', icon: FileText, permission: 'submit_expenses' },
      ],
    };

    const settingsItem = { id: 'settings', label: 'Settings', icon: Settings, permission: null };

    return [
      ...baseItems,
      ...roleSpecificItems[user.role],
      settingsItem,
    ].filter(item => !item.permission || hasPermission(item.permission));
  };

  const navItems = getNavItemsForRole();

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 z-50">
        <div className="flex flex-col flex-grow pt-5 bg-white/10 backdrop-blur-xl border-r border-white/20 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-[#174871] to-[#1E88E5] bg-clip-text text-transparent">
              ExpenseFlow
            </h2>
          </div>
          <div className="mt-8 flex-grow flex flex-col">
            <nav className="flex-1 px-2 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onViewChange(item.id)}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200 w-full ${
                      isActive
                        ? 'bg-gradient-to-r from-[#174871] to-[#1E88E5] text-white shadow-lg glow-effect'
                        : 'text-[#0F2D4D] hover:bg-white/20 hover:text-[#174871]'
                    }`}
                  >
                    <Icon
                      className={`mr-3 flex-shrink-0 h-5 w-5 transition-transform duration-200 ${
                        isActive ? 'rotate-3' : 'group-hover:rotate-3'
                      }`}
                    />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden">
        <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-white/20">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#0F2D4D] hover:bg-white/20 rounded-md"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <h2 className="text-xl font-bold bg-gradient-to-r from-[#174871] to-[#1E88E5] bg-clip-text text-transparent">
              ExpenseFlow
            </h2>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="relative p-2">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 text-xs bg-[#E53935] hover:bg-[#E53935]">
                  3
                </Badge>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="p-2 hover:bg-red-50 hover:text-[#E53935] transition-colors"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gradient-to-br from-[#174871] to-[#1E88E5] text-white">
                  {user.avatar}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setIsMobileMenuOpen(false)} />
            <div className="fixed top-16 left-0 bottom-0 w-64 bg-white/90 backdrop-blur-xl overflow-y-auto">
              <nav className="mt-8 px-2 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentView === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onViewChange(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200 w-full ${
                        isActive
                          ? 'bg-gradient-to-r from-[#174871] to-[#1E88E5] text-white shadow-lg'
                          : 'text-[#0F2D4D] hover:bg-white/20 hover:text-[#174871]'
                      }`}
                    >
                      <Icon className="mr-3 flex-shrink-0 h-5 w-5" />
                      {item.label}
                    </button>
                  );
                })}
                
                {/* Logout Button for Mobile */}
                <div className="border-t border-white/20 pt-4 mt-4">
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200 w-full text-[#E53935] hover:bg-red-50 hover:text-[#D32F2F]"
                  >
                    <LogOut className="mr-3 flex-shrink-0 h-5 w-5" />
                    Sign Out
                  </button>
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block lg:pl-64">
        <div className="fixed top-0 right-0 left-64 z-40 bg-white/80 backdrop-blur-xl border-b border-white/20">
          <div className="flex items-center justify-end h-16 px-6">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative p-2 hover:bg-white/20">
                <Bell className="h-5 w-5 text-[#0F2D4D]" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 text-xs bg-[#E53935] hover:bg-[#E53935] border-0">
                  3
                </Badge>
              </Button>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-[#0F2D4D]">{user.name}</p>
                  <p className="text-xs text-[#6B7280]">{user.role.charAt(0).toUpperCase() + user.role.slice(1)} • {user.department}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="p-2 hover:bg-red-50 hover:text-[#E53935] transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
                <Avatar className="h-9 w-9 ring-2 ring-white/20">
                  <AvatarFallback className="bg-gradient-to-br from-[#174871] to-[#1E88E5] text-white">
                    {user.avatar}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;ss
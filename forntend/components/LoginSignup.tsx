import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { User, UserRole } from './UserContext';

interface LoginSignupProps {
  onLogin: (user: User) => void;
}

const LoginSignup: React.FC<LoginSignupProps> = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('employee');
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const [signupForm, setSignupForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'employee' as UserRole,
    department: '',
    company: '',
  });

  // Mock users for demo
  const mockUsers = [
    {
      id: '1',
      name: 'John Admin',
      email: 'admin@company.com',
      role: 'admin' as UserRole,
      department: 'Administration',
      avatar: 'JA',
      companyId: 'comp1',
    },
    {
      id: '2',
      name: 'Sarah Manager',
      email: 'manager@company.com',
      role: 'manager' as UserRole,
      department: 'Marketing',
      avatar: 'SM',
      companyId: 'comp1',
    },
    {
      id: '3',
      name: 'Mike Employee',
      email: 'employee@company.com',
      role: 'employee' as UserRole,
      department: 'Engineering',
      avatar: 'ME',
      companyId: 'comp1',
    },
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login delay
    setTimeout(() => {
      setIsLoading(false);
      // Find mock user or create demo user based on email
      let user = mockUsers.find(u => u.email === loginForm.email);
      
      if (!user) {
        // Create demo user based on role selection
        user = {
          id: Date.now().toString(),
          name: `Demo ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}`,
          email: loginForm.email,
          role: selectedRole,
          department: selectedRole === 'admin' ? 'Administration' : 
                     selectedRole === 'manager' ? 'Management' : 'Operations',
          avatar: loginForm.email.charAt(0).toUpperCase() + (loginForm.email.split('@')[0].charAt(1) || 'U').toUpperCase(),
          companyId: 'demo-company',
        };
      }
      
      onLogin(user);
    }, 1500);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signupForm.password !== signupForm.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate signup delay
    setTimeout(() => {
      setIsLoading(false);
      const user: User = {
        id: Date.now().toString(),
        name: `${signupForm.firstName} ${signupForm.lastName}`,
        email: signupForm.email,
        role: signupForm.role,
        department: signupForm.department,
        avatar: signupForm.firstName.charAt(0).toUpperCase() + signupForm.lastName.charAt(0).toUpperCase(),
        companyId: signupForm.role === 'admin' ? Date.now().toString() : 'demo-company',
      };
      
      onLogin(user);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DED1C6] via-[#F9FAFB] to-[#DED1C6] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-gradient-to-r from-[#A77693]/20 to-[#174871]/20 rounded-full -top-48 -left-48 animate-float"></div>
        <div className="absolute w-80 h-80 bg-gradient-to-r from-[#1E88E5]/20 to-[#A77693]/20 rounded-full -bottom-40 -right-40 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute w-64 h-64 bg-gradient-to-r from-[#174871]/10 to-[#1E88E5]/10 rounded-full top-1/2 left-1/4 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left side - 3D Illustration */}
        <div className="hidden lg:block">
          <div className="floating-card">
            <Card className="card-3d p-8 border-0">
              <div className="relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBkYXNoYm9hcmQlMjBhbmFseXRpY3N8ZW58MXx8fHwxNzU5NDY2NTk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Financial Dashboard"
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#174871]/30 to-transparent rounded-2xl"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white mb-2">Smart Expense Management</h3>
                  <p className="text-white/90 text-sm">Streamline your workflow with AI-powered expense tracking and automated approvals.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Right side - Login/Signup Form */}
        <div className="w-full max-w-md mx-auto">
          <Card className="card-3d p-8 border-0">
            <div className="text-center mb-8">
              <h1 className="mb-2">ExpenseFlow</h1>
              <p className="text-[#6B7280]">Welcome to the future of expense management</p>
            </div>

            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#174871] data-[state=active]:to-[#1E88E5] data-[state=active]:text-white">
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#174871] data-[state=active]:to-[#1E88E5] data-[state=active]:text-white">
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  {/* Demo Role Selection */}
                  <div className="space-y-2">
                    <Label>Demo Role (for testing)</Label>
                    <div className="flex space-x-2">
                      <Button
                        type="button"
                        variant={selectedRole === 'admin' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedRole('admin')}
                        className={selectedRole === 'admin' ? 'bg-[#174871]' : 'border-white/30'}
                      >
                        Admin
                      </Button>
                      <Button
                        type="button"
                        variant={selectedRole === 'manager' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedRole('manager')}
                        className={selectedRole === 'manager' ? 'bg-[#174871]' : 'border-white/30'}
                      >
                        Manager
                      </Button>
                      <Button
                        type="button"
                        variant={selectedRole === 'employee' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedRole('employee')}
                        className={selectedRole === 'employee' ? 'bg-[#174871]' : 'border-white/30'}
                      >
                        Employee
                      </Button>
                    </div>
                  </div>

                  {/* Quick Login Options */}
                  <div className="space-y-2">
                    <Label>Quick Login (Demo Users)</Label>
                    <div className="grid grid-cols-1 gap-2">
                      {mockUsers.map((user) => (
                        <Button
                          key={user.id}
                          type="button"
                          variant="outline"
                          className="justify-start border-white/30 hover:bg-white/20"
                          onClick={() => {
                            setLoginForm({ email: user.email, password: 'demo' });
                            setSelectedRole(user.role);
                          }}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#174871] to-[#1E88E5] flex items-center justify-center text-white text-xs">
                              {user.avatar}
                            </div>
                            <div className="text-left">
                              <div className="font-medium">{user.name}</div>
                              <div className="text-xs text-[#6B7280]">{user.email} • {user.role}</div>
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      placeholder="Enter your email"
                      className="bg-white/50 backdrop-blur-sm border-white/30 focus:border-[#174871] transition-all duration-200"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      placeholder="Enter your password"
                      className="bg-white/50 backdrop-blur-sm border-white/30 focus:border-[#174871] transition-all duration-200"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#174871] to-[#1E88E5] hover:from-[#1E88E5] hover:to-[#174871] text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Signing in...</span>
                      </div>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={signupForm.firstName}
                        onChange={(e) => setSignupForm({ ...signupForm, firstName: e.target.value })}
                        placeholder="John"
                        className="bg-white/50 backdrop-blur-sm border-white/30 focus:border-[#174871] transition-all duration-200"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={signupForm.lastName}
                        onChange={(e) => setSignupForm({ ...signupForm, lastName: e.target.value })}
                        placeholder="Doe"
                        className="bg-white/50 backdrop-blur-sm border-white/30 focus:border-[#174871] transition-all duration-200"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signupEmail">Email</Label>
                    <Input
                      id="signupEmail"
                      type="email"
                      value={signupForm.email}
                      onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                      placeholder="john@company.com"
                      className="bg-white/50 backdrop-blur-sm border-white/30 focus:border-[#174871] transition-all duration-200"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select value={signupForm.role} onValueChange={(value: UserRole) => setSignupForm({ ...signupForm, role: value })}>
                      <SelectTrigger className="bg-white/50 backdrop-blur-sm border-white/30 focus:border-[#174871]">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-[#E53935] hover:bg-[#E53935] text-white">Admin</Badge>
                            <span>Full system access</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="manager">
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-[#1E88E5] hover:bg-[#1E88E5] text-white">Manager</Badge>
                            <span>Approve expenses</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="employee">
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-[#43A047] hover:bg-[#43A047] text-white">Employee</Badge>
                            <span>Submit expenses</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select value={signupForm.department} onValueChange={(value) => setSignupForm({ ...signupForm, department: value })}>
                      <SelectTrigger className="bg-white/50 backdrop-blur-sm border-white/30 focus:border-[#174871]">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Administration">Administration</SelectItem>
                        <SelectItem value="Engineering">Engineering</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Sales">Sales</SelectItem>
                        <SelectItem value="HR">HR</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={signupForm.company}
                      onChange={(e) => setSignupForm({ ...signupForm, company: e.target.value })}
                      placeholder="Your Company"
                      className="bg-white/50 backdrop-blur-sm border-white/30 focus:border-[#174871] transition-all duration-200"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signupPassword">Password</Label>
                    <Input
                      id="signupPassword"
                      type="password"
                      value={signupForm.password}
                      onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                      placeholder="Create a strong password"
                      className="bg-white/50 backdrop-blur-sm border-white/30 focus:border-[#174871] transition-all duration-200"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={signupForm.confirmPassword}
                      onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                      placeholder="Confirm your password"
                      className="bg-white/50 backdrop-blur-sm border-white/30 focus:border-[#174871] transition-all duration-200"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#174871] to-[#1E88E5] hover:from-[#1E88E5] hover:to-[#174871] text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Creating account...</span>
                      </div>
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
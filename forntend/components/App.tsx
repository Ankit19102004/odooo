import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './UserContext';
import LoginSignup from './LoginSignup';
import Dashboard from './Dashboard';
import EmployeeView from './EmployeeView';
import ManagerView from './ManagerView';
import AdminView from './AdminView';
import Settings from './Settings';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData, token) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <UserProvider value={{ user, setUser: handleLogin, logout: handleLogout }}>
      <Router>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route 
              path="/login" 
              element={user ? <Navigate to="/dashboard" replace /> : <LoginSignup />} 
            />
            <Route 
              path="/dashboard" 
              element={user ? <Dashboard /> : <Navigate to="/login" replace />} 
            />
            <Route 
              path="/employee" 
              element={user?.role === 'employee' ? <EmployeeView /> : <Navigate to="/dashboard" replace />} 
            />
            <Route 
              path="/manager" 
              element={user?.role === 'manager' || user?.role === 'admin' ? <ManagerView /> : <Navigate to="/dashboard" replace />} 
            />
            <Route 
              path="/admin" 
              element={user?.role === 'admin' ? <AdminView /> : <Navigate to="/dashboard" replace />} 
            />
            <Route 
              path="/settings" 
              element={user ? <Settings /> : <Navigate to="/login" replace />} 
            />
            <Route 
              path="/" 
              element={<Navigate to={user ? "/dashboard" : "/login"} replace />} 
            />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import InvoiceList from './components/InvoiceList';
import Login from './Login';
import Main from './components/Main';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';

// Protect Routes by Checking Authentication
const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" />;
};

// Wrap the entire app content with AuthProvider
const AppContent: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      
      {/* Protected route for Main page */}
      <Route
        path="/main"
        element={
          <ProtectedRoute>
            <Main />
          </ProtectedRoute>
        }
      />
      
      {/* Protected route for Invoices page */}
      <Route
        path="/invoices"
        element={
          <ProtectedRoute>
            <div>
              <Header showBackButton={true} />
              <InvoiceList />
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
};

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header'; // Header component
import InvoiceList from './components/InvoiceList'; // Invoices page
import Login from './components/Login'; // Login page
import './App.css'; // Global styles

// Main page with a link to invoices
const MainPage: React.FC = () => (
  <div>
    <h1>Welcome to the Invoice Manager App</h1>
    <a href="/invoices">Go to Invoices</a>
  </div>
);

// Protect Routes by Checking Authentication
const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token'); // Check if token exists
  return isAuthenticated ? children : <Navigate to="/" />; // Redirect to login if not authenticated
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Default route (Login) */}
        
        {/* Protected route for Main page */}
        <Route
          path="/main"
          element={
            <ProtectedRoute>
              <div> {/* Wrap the multiple components in a single parent */}
                <Header showBackButton={false} />
                <MainPage />
              </div>
            </ProtectedRoute>
          }
        />
        
        {/* Protected route for Invoices page */}
        <Route
          path="/invoices"
          element={
            <ProtectedRoute>
              <div> {/* Wrap the multiple components in a single parent */}
                <Header showBackButton={true} />
                <InvoiceList />
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

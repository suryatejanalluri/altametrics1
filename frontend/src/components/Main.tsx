import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import '../styles/Main.css';

const Main: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="main-container">
      <Header showBackButton={false} />
      <div className="main-content">
        <h1>Welcome to Invoice Management System</h1>
        <div className="menu-cards">
          <div className="menu-card" onClick={() => navigate('/invoices')}>
            <h2>Invoices</h2>
            <p>View and manage your invoices</p>
          </div>
         
          {/* Add more menu cards for future features
          <div className="menu-card" onClick={() => navigate('/profile')}>
            <h2>Profile</h2>
            <p>Manage your account settings</p>
          </div>
          <div className="menu-card">
            <h2>Reports</h2>
            <p>View financial reports and analytics</p>
          </div>
          <div className="menu-card">
            <h2>Settings</h2>
            <p>Configure system preferences</p>
          </div>
          */}
        </div>
      </div>
    </div>
  );
};

export default Main;

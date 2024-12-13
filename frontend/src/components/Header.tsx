import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  showBackButton: boolean; // Determines if "Back to Main Page" button is shown
}

const Header: React.FC<HeaderProps> = ({ showBackButton }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the user's token from localStorage
    localStorage.removeItem('token');
    // Redirect to the Login page
    navigate('/');
  };

  const handleBackToMain = () => {
    // Redirect to the Main page
    navigate('/main');
  };

  return (
    <header style={{ padding: '1rem', backgroundColor: '#4caf50', color: 'white' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Invoice Manager</h2>
        <div>
          {showBackButton && (
            <button onClick={handleBackToMain} style={{ marginRight: '10px' }}>
              Back to Main Page
            </button>
          )}
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </header>
  );
};

export default Header;

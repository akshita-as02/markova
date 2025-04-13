import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAuthClick = () => {
    if (user) {
      handleLogout();
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Markova
        </Link>
        
        <div className="nav-menu">
          <Link to="/" className="nav-link">
            Home
          </Link>
          {user && (
            <Link to="/results" className="nav-link">
              Results
            </Link>
          )}
          <button onClick={handleAuthClick} className="nav-button">
            {user ? 'Logout' : 'Sign In/Up'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 
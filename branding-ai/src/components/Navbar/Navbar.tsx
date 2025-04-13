import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/home" className="navbar-logo">
          Markova
        </Link>
        
        <div className="nav-menu">
          <Link to="/home" className="nav-link">
            Home
          </Link>
          <Link to="/results" className="nav-link">
            Results
          </Link>
          <button onClick={handleLogout} className="nav-button">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import { useAuth } from '../../contexts/authContext';
import { doSignOut } from '../../firebase/auth';

const Navbar = () => {
    const { userLoggedIn } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        doSignOut()
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                console.error('Logout failed:', error);
            });
    };

    const handleAuthClick = () => {
        if (userLoggedIn) {
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
                    {userLoggedIn && (
                        <Link to="/results" className="nav-link">
                            Results
                        </Link>
                    )}
                    <button onClick={handleAuthClick} className="nav-button">
                        {userLoggedIn ? 'Logout' : 'Sign In/Up'}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 
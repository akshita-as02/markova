import React from 'react';
import './layout.css';
import { useAuth } from '../../contexts/authContext';



const Layout = ({ children }) => {
    const { userLoggedIn } = useAuth();

    return (
        <div className="layout">
            <header className="header">
                <div className="container">
                    <nav className="nav">
                        <div className="nav-brand">
                            <a href="/" className="nav-logo">
                                BrandingAI
                            </a>
                        </div>
                        <div className="nav-menu">
                            <a href="/dashboard" className="nav-link">
                                Dashboard
                            </a>
                            <a href="/brands" className="nav-link">
                                Brands
                            </a>
                            {userLoggedIn ? (
                                <button className="btn btn-secondary">
                                    Logout
                                </button>
                            ) : (
                                <a href="/login" className="btn btn-primary">
                                    Login
                                </a>
                            )}
                        </div>
                    </nav>
                </div>
            </header>
            <main className="main">
                <div className="container">
                    {children}
                </div>
            </main>
            <footer className="footer">
                <div className="container">
                    <p className="footer-text">
                        © {new Date().getFullYear()} BrandingAI. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Layout; 
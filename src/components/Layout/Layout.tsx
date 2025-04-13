import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useAuth();

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
              {user ? (
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
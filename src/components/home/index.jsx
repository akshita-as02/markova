import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import { useAuth } from '../../contexts/authContext';

const Home = () => {
    const { userLoggedIn } = useAuth();

    return (
        <div className="landing-container">
            {/* Hero Section */}
            <section className="hero-section">
                <h1 className="hero-title">Transform Your Brand with AI</h1>
                <p className="hero-subtitle">
                    Create stunning brand identities, logos, and marketing materials powered by artificial intelligence.
                    Stand out in the digital landscape with unique, professional designs.
                </p>
                <div className="hero-buttons">
                    {userLoggedIn ? (
                        <Link to="/generate" className="btn btn-primary">Start Creating</Link>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-primary">Get Started</Link>
                            <Link to="/register" className="btn btn-secondary">Learn More</Link>
                        </>
                    )}
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">🎨</div>
                        <h3 className="feature-title">AI-Powered Design</h3>
                        <p className="feature-description">
                            Generate unique brand identities and logos using advanced AI algorithms.
                            Get professional results in minutes, not days.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">⚡</div>
                        <h3 className="feature-title">Lightning Fast</h3>
                        <p className="feature-description">
                            Create and iterate on designs quickly with our intuitive interface.
                            Save time and focus on what matters most - your business.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🎯</div>
                        <h3 className="feature-title">Customizable</h3>
                        <p className="feature-description">
                            Fine-tune every aspect of your brand identity.
                            From colors to typography, make it uniquely yours.
                        </p>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="how-it-works">
                <div className="steps-container">
                    <div className="step-card">
                        <div className="step-number">1</div>
                        <h3 className="step-title">Describe Your Brand</h3>
                        <p className="step-description">
                            Tell us about your business, target audience, and brand personality.
                            Our AI understands your vision.
                        </p>
                    </div>
                    <div className="step-card">
                        <div className="step-number">2</div>
                        <h3 className="step-title">Generate Designs</h3>
                        <p className="step-description">
                            Get multiple design options tailored to your needs.
                            Each design is unique and professional.
                        </p>
                    </div>
                    <div className="step-card">
                        <div className="step-number">3</div>
                        <h3 className="step-title">Customize & Export</h3>
                        <p className="step-description">
                            Fine-tune your favorite design and export in multiple formats.
                            Ready for any platform or medium.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <h2 className="cta-title">Ready to Transform Your Brand?</h2>
                <p className="cta-description">
                    Join thousands of businesses that have already elevated their brand identity with our AI-powered platform.
                </p>
                <div className="hero-buttons">
                    {userLoggedIn ? (
                        <Link to="/generate" className="btn btn-primary">Start Creating</Link>
                    ) : (
                        <Link to="/register" className="btn btn-primary">Get Started Now</Link>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Home; 
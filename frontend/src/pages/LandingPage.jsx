import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { AlertCircle, Phone } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const LandingPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setSubmitMessage('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');
    
    try {
      const response = await axios.post(`${API}/beta-signup`, { email });
      setSubmitMessage(response.data.message);
      setEmail('');
      setTimeout(() => {
        navigate('/terms');
      }, 1500);
    } catch (error) {
      console.error('Error submitting email:', error);
      setSubmitMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="landing-page">
      {/* Navigation Header */}
      <nav className="nav-header">
        <div className="flex items-center gap-2">
          <div className="logo-text">MindSpace</div>
        </div>
        <div className="flex items-center gap-4">
          <a href="tel:988" className="nav-link">Crisis Support</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Understand Your Patterns.<br />
            Regulate Your System.
          </h1>
          <p className="hero-subtitle">
            MindSpace is a trauma-informed self-reflection tool designed to help you recognize emotional patterns and understand your nervous system responses.
          </p>
          <div className="hero-disclaimer">
            <AlertCircle className="inline-block mr-2" size={18} />
            <span className="body-small">This platform is educational. It is not therapy or medical treatment.</span>
          </div>
        </div>
      </section>

      {/* What It Is Section */}
      <section className="content-section">
        <div className="container">
          <div className="grid-two-col">
            <div className="content-text">
              <h2 className="heading-2">What It Is</h2>
              <p className="body-large">
                MindSpace is a trauma-informed self-reflection tool designed to help you recognize emotional patterns and understand your nervous system responses.
              </p>
              <p className="body-medium">
                This platform is educational. It is not therapy or medical treatment.
              </p>
            </div>
            <div className="content-image">
              <img 
                src="https://images.unsplash.com/photo-1542157565-4607d82cf417?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NDh8MHwxfHNlYXJjaHwyfHxwZWFjZWZ1bCUyMG5hdHVyZXxlbnwwfHx8fDE3NzEyNDA0NDd8MA&ixlib=rb-4.1.0&q=85"
                alt="Peaceful waterfall representing emotional flow"
                className="rounded-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="content-section bg-section">
        <div className="container">
          <h2 className="heading-2 text-center">Who It's For</h2>
          <div className="who-for-grid">
            <div className="feature-card">
              <h3 className="heading-3">Emotional Clarity</h3>
              <p className="body-medium">Individuals wanting to understand their emotional responses better</p>
            </div>
            <div className="feature-card">
              <h3 className="heading-3">Pattern Recognition</h3>
              <p className="body-medium">People noticing repeated stress patterns in their daily life</p>
            </div>
            <div className="feature-card">
              <h3 className="heading-3">Self-Awareness</h3>
              <p className="body-medium">Anyone wanting to build deeper self-awareness and understanding</p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section className="safety-section">
        <div className="container">
          <div className="safety-card">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="text-red-600" size={32} />
              <h2 className="heading-2 mb-0">Important Safety Information</h2>
            </div>
            <p className="body-large mb-4">MindSpace is not crisis support.</p>
            <p className="body-medium mb-6">
              If you are in immediate danger or experiencing suicidal thoughts:
            </p>
            <div className="crisis-links">
              <a href="tel:911" className="crisis-link">
                <Phone size={20} />
                <span>Call 911 (U.S.)</span>
              </a>
              <a href="tel:988" className="crisis-link">
                <Phone size={20} />
                <span>Call or text 988 (U.S.)</span>
              </a>
              <a href="tel:emergency" className="crisis-link">
                <Phone size={20} />
                <span>Local emergency services (Outside U.S.)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="heading-2">Join the Private Beta</h2>
            <p className="body-large mb-6">
              Be among the first to experience MindSpace and help shape the future of trauma-informed self-reflection.
            </p>
            <form onSubmit={handleEmailSubmit} className="email-form">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="email-input"
                disabled={isSubmitting}
              />
              <Button 
                type="submit" 
                className="btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Joining...' : 'Join Beta'}
              </Button>
            </form>
            {submitMessage && (
              <p className={`body-small mt-4 ${submitMessage.includes('Thank') ? 'text-green-600' : 'text-red-600'}`}>
                {submitMessage}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p className="body-small">MindSpace is not therapy or crisis care.</p>
          <p className="caption mt-2">© 2024 MindSpace. Educational purposes only.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

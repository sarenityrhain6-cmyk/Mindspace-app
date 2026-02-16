import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Heart, Phone } from 'lucide-react';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="app-page">
      {/* App Header */}
      <header className="app-header">
        <div className="container flex justify-between items-center">
          <div className="logo-text">MindSpace</div>
          <a href="tel:988" className="crisis-button-small">
            <Phone size={16} />
            <span>988</span>
          </a>
        </div>
      </header>

      {/* Welcome Content */}
      <main className="app-main">
        <div className="container max-w-3xl">
          <div className="welcome-card">
            <div className="welcome-icon">
              <Heart size={64} className="text-accent-primary" />
            </div>
            
            <h1 className="heading-1 text-center mb-6">
              Welcome to MindSpace
            </h1>
            
            <div className="welcome-image mb-8">
              <img 
                src="https://images.unsplash.com/photo-1769238507012-0c98e68582a9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwyfHx0cmFucXVpbCUyMHdlbGxuZXNzfGVufDB8fHx8MTc3MTI0MDQ1Mnww&ixlib=rb-4.1.0&q=85"
                alt="Person in peaceful meditation"
                className="rounded-image"
              />
            </div>
            
            <p className="body-large text-center mb-8">
              This is a trauma-informed educational tool designed to help you explore patterns in your emotional responses.
            </p>
            
            <div className="info-box mb-8">
              <p className="body-medium">
                MindSpace provides a safe space for self-reflection. There are no right or wrong answers—only observations that can help you understand yourself better.
              </p>
            </div>

            <Button 
              className="btn-primary w-full"
              size="lg"
              onClick={() => navigate('/app/safety-consent')}
            >
              Continue
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p className="body-small">MindSpace is not therapy or crisis care.</p>
      </footer>
    </div>
  );
};

export default WelcomePage;

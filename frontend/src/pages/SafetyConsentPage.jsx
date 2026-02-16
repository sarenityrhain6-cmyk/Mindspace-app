import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { AlertCircle, Phone, ArrowLeft } from 'lucide-react';

const SafetyConsentPage = () => {
  const navigate = useNavigate();
  const [understood, setUnderstood] = useState(false);

  const handleAgree = () => {
    setUnderstood(true);
    // For now, navigate to dashboard (will be built in Week 3)
    setTimeout(() => {
      navigate('/app/dashboard');
    }, 300);
  };

  return (
    <div className="app-page">
      {/* App Header */}
      <header className="app-header">
        <div className="container flex justify-between items-center">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/app/welcome')}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </Button>
          <div className="logo-text">MindSpace</div>
          <a href="tel:988" className="crisis-button-small">
            <Phone size={16} />
            <span>988</span>
          </a>
        </div>
      </header>

      {/* Safety Content */}
      <main className="app-main">
        <div className="container max-w-3xl">
          <div className="safety-consent-card">
            <div className="alert-box-large mb-8">
              <AlertCircle className="text-red-600" size={32} />
              <h1 className="heading-2 ml-3 mb-0">Before We Begin</h1>
            </div>

            <div className="space-y-6 mb-8">
              <div className="info-section">
                <h2 className="heading-3 mb-3">Important Information</h2>
                <p className="body-large mb-4">
                  MindSpace does not diagnose or treat mental health conditions.
                </p>
                <p className="body-medium">
                  This tool is for reflection only. It is designed to help you observe patterns in your emotional responses and nervous system activation.
                </p>
              </div>

              <div className="crisis-section">
                <h2 className="heading-3 mb-3 text-red-600">If You Are in Crisis</h2>
                <p className="body-medium mb-4">
                  If you are experiencing suicidal thoughts, self-harm urges, or are in immediate danger, please contact emergency services immediately:
                </p>
                <div className="crisis-links-vertical">
                  <a href="tel:911" className="crisis-link-large">
                    <Phone size={24} />
                    <div>
                      <div className="font-semibold">Call 911</div>
                      <div className="text-sm text-muted">Emergency Services (U.S.)</div>
                    </div>
                  </a>
                  <a href="tel:988" className="crisis-link-large">
                    <Phone size={24} />
                    <div>
                      <div className="font-semibold">Call or Text 988</div>
                      <div className="text-sm text-muted">Suicide & Crisis Lifeline (U.S.)</div>
                    </div>
                  </a>
                  <a href="tel:emergency" className="crisis-link-large">
                    <Phone size={24} />
                    <div>
                      <div className="font-semibold">Local Emergency Services</div>
                      <div className="text-sm text-muted">If outside the U.S.</div>
                    </div>
                  </a>
                </div>
              </div>

              <div className="info-box">
                <p className="body-medium font-semibold">
                  By continuing, you acknowledge that:
                </p>
                <ul className="space-y-2 mt-3 ml-6">
                  <li className="body-medium">• This is an educational tool, not medical treatment</li>
                  <li className="body-medium">• You are responsible for your own wellbeing</li>
                  <li className="body-medium">• You will seek professional help if needed</li>
                  <li className="body-medium">• You are not currently in crisis</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <Button 
                className="btn-primary w-full"
                size="lg"
                onClick={handleAgree}
              >
                I Understand & Agree
              </Button>
              
              <Button 
                variant="outline"
                className="btn-secondary w-full"
                size="lg"
                onClick={() => window.open('https://988lifeline.org', '_blank')}
              >
                Need Immediate Support?
              </Button>
            </div>
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

export default SafetyConsentPage;

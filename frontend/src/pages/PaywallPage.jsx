import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Phone, Lock, Check } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const PaywallPage = () => {
  const navigate = useNavigate();
  const { token, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePayment = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        `${API}/payments/create-checkout`,
        {
          package_id: 'unlock_full_access',
          origin_url: window.location.origin
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      // Redirect to Stripe
      window.location.href = response.data.url;
    } catch (err) {
      console.error('Payment initiation failed:', err);
      setError(err.response?.data?.detail || 'Payment failed. Please try again.');
      setLoading(false);
    }
  };

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

      {/* Paywall Content */}
      <main className="app-main">
        <div className="container max-w-2xl">
          <div className="paywall-card">
            <div className="paywall-icon">
              <Lock size={64} className="text-accent-primary" />
            </div>

            <h1 className="heading-1 text-center mb-4">
              Unlock Full Access
            </h1>

            <p className="body-large text-center mb-8">
              You've used your 1 free reflection.
              <br />
              Unlock unlimited access for just <strong className="text-accent-text">$1</strong>.
            </p>

            <div className="features-list mb-8">
              <div className="feature-item">
                <Check size={24} className="text-accent-primary" />
                <div>
                  <h3 className="heading-3">Unlimited Reflections</h3>
                  <p className="body-medium">Track your patterns over time with no limits</p>
                </div>
              </div>

              <div className="feature-item">
                <Check size={24} className="text-accent-primary" />
                <div>
                  <h3 className="heading-3">Progress Tracking</h3>
                  <p className="body-medium">View your history and see how you've grown</p>
                </div>
              </div>

              <div className="feature-item">
                <Check size={24} className="text-accent-primary" />
                <div>
                  <h3 className="heading-3">Regulation Tools</h3>
                  <p className="body-medium">Access breathing exercises and grounding techniques</p>
                </div>
              </div>

              <div className="feature-item">
                <Check size={24} className="text-accent-primary" />
                <div>
                  <h3 className="heading-3">Lifetime Access</h3>
                  <p className="body-medium">One-time payment, use forever</p>
                </div>
              </div>
            </div>

            {error && (
              <div className="alert-box mb-6">
                <p className="body-medium text-red-600">{error}</p>
              </div>
            )}

            <div className="paywall-actions">
              <Button 
                className="btn-primary w-full mb-4"
                size="lg"
                onClick={handlePayment}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Pay $1 to Unlock'}
              </Button>

              <Button 
                variant="ghost"
                className="btn-secondary w-full"
                onClick={() => navigate('/app/dashboard')}
              >
                Maybe Later
              </Button>
            </div>

            <div className="info-box mt-8">
              <p className="body-small text-center">
                Secure payment powered by Stripe. Your investment supports trauma-informed mental health education.
              </p>
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

export default PaywallPage;

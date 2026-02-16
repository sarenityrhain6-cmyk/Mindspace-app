import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Phone, XCircle } from 'lucide-react';

const PaymentCancelPage = () => {
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

      {/* Cancel Content */}
      <main className="app-main">
        <div className="container max-w-2xl">
          <div className="payment-status-card">
            <XCircle size={64} className="payment-icon text-gray-400" />
            
            <h1 className="heading-1 text-center mb-4">
              Payment Canceled
            </h1>
            
            <p className="body-large text-center mb-8">
              No charges were made to your account.
            </p>

            <div className="info-box mb-8">
              <p className="body-medium text-center">
                Your free reflection is still available. You can unlock full access anytime for just $1.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <Button 
                className="btn-primary w-full"
                size="lg"
                onClick={() => navigate('/app/dashboard')}
              >
                Return to Dashboard
              </Button>
              
              <Button 
                variant="outline"
                className="btn-secondary w-full"
                onClick={() => navigate('/paywall')}
              >
                Try Again
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

export default PaymentCancelPage;

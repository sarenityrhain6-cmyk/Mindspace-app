import React, { useEffect, useState, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Phone, CheckCircle, Loader } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { token, refreshUser } = useContext(AuthContext);
  const [status, setStatus] = useState('checking');
  const [error, setError] = useState('');
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId && token) {
      pollPaymentStatus();
    } else {
      setStatus('error');
      setError('Missing session information');
    }
  }, [sessionId, token]);

  const pollPaymentStatus = async (attempts = 0) => {
    const maxAttempts = 10;
    if (attempts >= maxAttempts) {
      setStatus('timeout');
      setError('Payment verification timed out. Please check your email for confirmation.');
      return;
    }

    try {
      const response = await axios.get(
        `${API}/payments/checkout-status/${sessionId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.payment_status === 'paid') {
        setStatus('success');
        await refreshUser(); // Refresh user to update has_paid status
        setTimeout(() => navigate('/app/dashboard'), 3000);
      } else if (response.data.status === 'expired') {
        setStatus('expired');
        setError('Payment session expired. Please try again.');
      } else {
        // Still pending, continue polling
        setTimeout(() => pollPaymentStatus(attempts + 1), 2000);
      }
    } catch (err) {
      console.error('Payment status check failed:', err);
      setStatus('error');
      setError('Unable to verify payment. Please contact support if charged.');
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

      {/* Payment Status Content */}
      <main className="app-main">
        <div className="container max-w-2xl">
          <div className="payment-status-card">
            {status === 'checking' && (
              <>
                <Loader size={64} className="payment-icon animate-spin" />
                <h1 className="heading-1 text-center mb-4">
                  Verifying Payment...
                </h1>
                <p className="body-large text-center">
                  Please wait while we confirm your payment.
                </p>
              </>
            )}

            {status === 'success' && (
              <>
                <CheckCircle size={64} className="payment-icon text-green-600" />
                <h1 className="heading-1 text-center mb-4">
                  🎉 Payment Successful!
                </h1>
                <p className="body-large text-center mb-6">
                  You now have full access to MindSpace.
                </p>
                <div className="info-box">
                  <p className="body-medium text-center">
                    Unlimited reflections, progress tracking, and regulation tools are now available.
                    <br />
                    Redirecting to dashboard...
                  </p>
                </div>
              </>
            )}

            {(status === 'error' || status === 'expired' || status === 'timeout') && (
              <>
                <div className="payment-icon text-red-600">⚠️</div>
                <h1 className="heading-1 text-center mb-4">
                  Payment Verification Issue
                </h1>
                <p className="body-large text-center mb-6">
                  {error}
                </p>
                <div className="alert-box">
                  <p className="body-medium">
                    If you were charged, your access will be activated within 24 hours.
                    Please check your email for confirmation or contact support.
                  </p>
                </div>
                <button
                  className="btn-primary mt-6"
                  onClick={() => navigate('/app/dashboard')}
                >
                  Return to Dashboard
                </button>
              </>
            )}
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

export default PaymentSuccessPage;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { AlertCircle, Trash2, ArrowLeft } from 'lucide-react';

const DeleteAccountPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send to backend
    // For now, open email client
    window.location.href = `mailto:444mind.space222@gmail.com?subject=Data%20Deletion%20Request&body=Please%20delete%20my%20account%20and%20all%20associated%20data.%0A%0AEmail:%20${encodeURIComponent(email)}`;
    setSubmitted(true);
  };

  return (
    <div className="app-page">
      {/* Header */}
      <header className="app-header">
        <div className="container flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft size={20} />
            <span>Back</span>
          </Link>
          <div className="logo-text">MindSpace</div>
          <div style={{ width: 60 }}></div>
        </div>
      </header>

      {/* Content */}
      <main className="app-main">
        <div className="container max-w-2xl py-12">
          <div className="welcome-card">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-red-100 rounded-full">
                <Trash2 size={32} className="text-red-600" />
              </div>
            </div>

            <h1 className="heading-1 text-center mb-4">Delete Your Account</h1>
            
            <p className="body-large text-center mb-8">
              We're sorry to see you go. If you'd like to delete your MindSpace account 
              and all associated data, please submit a request below.
            </p>

            {!submitted ? (
              <>
                <div className="info-box mb-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="text-amber-600 mt-1" size={20} />
                    <div>
                      <h3 className="heading-3 mb-2">What gets deleted:</h3>
                      <ul className="space-y-1 body-medium">
                        <li>• Your account and login credentials</li>
                        <li>• Email address</li>
                        <li>• Any saved reflection data</li>
                      </ul>
                      <p className="body-small mt-3 text-gray-600">
                        This action cannot be undone. Please allow up to 7 business days 
                        for your request to be processed.
                      </p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="body-medium font-semibold mb-2 block">
                      Confirm your email address
                    </label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="email-input"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                    size="lg"
                  >
                    Request Account Deletion
                  </Button>
                </form>

                <p className="body-small text-center mt-6 text-gray-500">
                  Changed your mind? Simply close this page - no action will be taken.
                </p>
              </>
            ) : (
              <div className="text-center">
                <div className="p-4 bg-green-100 rounded-lg mb-6">
                  <p className="body-large text-green-800">
                    ✓ Your deletion request has been initiated
                  </p>
                </div>
                <p className="body-medium mb-6">
                  An email has been prepared for you to send. Please send the email 
                  to complete your deletion request. We'll process it within 7 business days.
                </p>
                <Link to="/">
                  <Button variant="outline">Return to Home</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Contact Info */}
          <div className="mt-8 text-center">
            <p className="body-small text-gray-500">
              Questions? Contact us at{' '}
              <a href="mailto:444mind.space222@gmail.com" className="link-text">
                444mind.space222@gmail.com
              </a>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="container">
          <p className="body-small">
            <Link to="/privacy" className="link-text">Privacy Policy</Link>
            {' • '}
            <Link to="/terms" className="link-text">Terms of Service</Link>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DeleteAccountPage;

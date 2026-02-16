import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { AlertCircle } from 'lucide-react';

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      await signup(email, password);
      navigate('/app/welcome');
    } catch (err) {
      setError(err.response?.data?.detail || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-page">
      {/* Header */}
      <header className="app-header">
        <div className="container flex justify-between items-center">
          <Link to="/" className="logo-text">MindSpace</Link>
        </div>
      </header>

      {/* Signup Content */}
      <main className="app-main">
        <div className="container max-w-md">
          <div className="welcome-card">
            <h1 className="heading-1 text-center mb-3">Create Your Account</h1>
            <p className="body-medium text-center mb-8">
              Start your journey to understanding your emotional patterns
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="body-medium font-semibold mb-2 block">Email</label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="email-input"
                  required
                />
              </div>

              <div>
                <label className="body-medium font-semibold mb-2 block">Password</label>
                <Input
                  type="password"
                  placeholder="Minimum 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="email-input"
                  required
                  minLength={8}
                />
              </div>

              {error && (
                <div className="alert-box">
                  <AlertCircle size={20} className="text-red-600" />
                  <p className="body-small ml-2 text-red-600">{error}</p>
                </div>
              )}

              <Button 
                type="submit" 
                className="btn-primary w-full" 
                disabled={loading}
                size="lg"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>

            <p className="body-small text-center mt-6">
              Already have an account?{' '}
              <Link to="/login" className="link-text">Log in</Link>
            </p>

            <div className="info-box mt-6">
              <p className="body-small">
                By creating an account, you agree to our{' '}
                <Link to="/terms" className="link-text">Terms of Service</Link>
                {' '}and{' '}
                <Link to="/privacy" className="link-text">Privacy Policy</Link>
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

export default SignupPage;

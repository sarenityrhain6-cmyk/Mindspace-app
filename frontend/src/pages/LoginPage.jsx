import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { AlertCircle } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Safety check for context
  if (!authContext) {
    return <div>Loading...</div>;
  }

  const { login } = authContext;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/app/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed. Please check your credentials.');
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

      {/* Login Content */}
      <main className="app-main">
        <div className="container max-w-md">
          <div className="welcome-card">
            <h1 className="heading-1 text-center mb-3">Welcome Back</h1>
            <p className="body-medium text-center mb-8">
              Log in to continue your reflection journey
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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="email-input"
                  required
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
                {loading ? 'Logging in...' : 'Log In'}
              </Button>
            </form>

            <p className="body-small text-center mt-6">
              Don't have an account?{' '}
              <Link to="/signup" className="link-text">Sign up</Link>
            </p>
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

export default LoginPage;

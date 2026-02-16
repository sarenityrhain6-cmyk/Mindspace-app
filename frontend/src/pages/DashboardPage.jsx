import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Phone, FileText, Heart, AlertCircle, BarChart3, LogOut } from 'lucide-react';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, token, logout, checkAccess } = useContext(AuthContext);
  const [accessInfo, setAccessInfo] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate('/signup');
      return;
    }
    fetchAccessInfo();
  }, [token]);

  const fetchAccessInfo = async () => {
    const info = await checkAccess();
    setAccessInfo(info);
  };

  const handleStartReflection = async () => {
    const info = await checkAccess();
    
    if (info.has_access) {
      navigate('/app/reflection');
    } else {
      navigate('/paywall');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app-page">
      {/* App Header */}
      <header className="app-header">
        <div className="container flex justify-between items-center">
          <div className="logo-text">MindSpace</div>
          <div className="flex items-center gap-4">
            <a href="tel:988" className="crisis-button-small">
              <Phone size={16} />
              <span>988</span>
            </a>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="app-main">
        <div className="container max-w-4xl">
          <div className="dashboard-header mb-8">
            <h1 className="heading-1 mb-3">Welcome back, {user.email.split('@')[0]}!</h1>
            <p className="body-large">Choose an action below to continue your journey.</p>
            
            {accessInfo && (
              <div className="access-status mt-4">
                {accessInfo.has_access && accessInfo.reason === 'beta_tester' && (
                  <div className="info-box">
                    <p className="body-medium">🌟 Beta Tester - Unlimited free access!</p>
                  </div>
                )}
                {accessInfo.has_access && accessInfo.reason === 'paid' && (
                  <div className="info-box">
                    <p className="body-medium">✓ Full Access Unlocked - Thank you for your support!</p>
                  </div>
                )}
                {accessInfo.has_access && accessInfo.reason === 'free_trial' && (
                  <div className="info-box">
                    <p className="body-medium">
                      Free reflections remaining: {accessInfo.free_reflections_remaining}
                    </p>
                  </div>
                )}
                {!accessInfo.has_access && (
                  <div className="alert-box">
                    <AlertCircle size={20} />
                    <p className="body-medium ml-2">
                      You've used your free reflection. Unlock unlimited access for $1!
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="dashboard-grid">
            {/* Start Reflection Card */}
            <div className="dashboard-card">
              <div className="dashboard-card-icon">
                <FileText size={32} className="text-accent-primary" />
              </div>
              <h2 className="heading-3 mb-2">Start Reflection</h2>
              <p className="body-medium mb-6">
                Complete a 10-question reflection to explore your emotional patterns and nervous system responses.
              </p>
              <Button 
                className="btn-primary w-full"
                onClick={handleStartReflection}
              >
                Begin Reflection
              </Button>
            </div>

            {/* View Last Result Card */}
            <div className="dashboard-card">
              <div className="dashboard-card-icon">
                <BarChart3 size={32} className="text-accent-text" />
              </div>
              <h2 className="heading-3 mb-2">View My Results</h2>
              <p className="body-medium mb-6">
                Review your reflection history and track your patterns over time.
              </p>
              <Button 
                variant="outline"
                className="btn-secondary w-full"
                onClick={() => alert('Results history - Coming soon!')}
              >
                View Results
              </Button>
            </div>

            {/* Regulation Tool Card */}
            <div className="dashboard-card">
              <div className="dashboard-card-icon">
                <Heart size={32} className="text-accent-strong" />
              </div>
              <h2 className="heading-3 mb-2">Regulation Tool</h2>
              <p className="body-medium mb-6">
                Access breathing exercises and grounding techniques to help reset your nervous system.
              </p>
              <Button 
                variant="outline"
                className="btn-secondary w-full"
                onClick={() => navigate('/app/regulation')}
              >
                Start Regulation
              </Button>
            </div>

            {/* Emergency Support Card */}
            <div className="dashboard-card emergency-card">
              <div className="dashboard-card-icon">
                <AlertCircle size={32} className="text-red-600" />
              </div>
              <h2 className="heading-3 mb-2">Emergency Support</h2>
              <p className="body-medium mb-6">
                If you're in crisis or need immediate support, access emergency resources right away.
              </p>
              <div className="flex flex-col gap-3">
                <a href="tel:988" className="crisis-button-full">
                  <Phone size={20} />
                  <span>Call 988 (Crisis Lifeline)</span>
                </a>
                <a href="tel:911" className="crisis-button-full">
                  <Phone size={20} />
                  <span>Call 911 (Emergency)</span>
                </a>
              </div>
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

export default DashboardPage;

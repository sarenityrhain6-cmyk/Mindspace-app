import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Phone, FileText, Heart, AlertCircle, BarChart3 } from 'lucide-react';

const DashboardPage = () => {
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

      {/* Dashboard Content */}
      <main className="app-main">
        <div className="container max-w-4xl">
          <div className="dashboard-header mb-8">
            <h1 className="heading-1 mb-3">Your MindSpace Dashboard</h1>
            <p className="body-large">Welcome back. Choose an action below to continue your journey.</p>
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
                onClick={() => alert('Reflection module - Coming in Week 2!')}
              >
                Begin Reflection
              </Button>
            </div>

            {/* View Last Result Card */}
            <div className="dashboard-card">
              <div className="dashboard-card-icon">
                <BarChart3 size={32} className="text-accent-text" />
              </div>
              <h2 className="heading-3 mb-2">View My Last Result</h2>
              <p className="body-medium mb-6">
                Review your most recent reflection results and insights about your activation patterns.
              </p>
              <Button 
                variant="outline"
                className="btn-secondary w-full"
                onClick={() => alert('Results view - Coming in Week 2!')}
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
                onClick={() => alert('Regulation tool - Coming in Week 3!')}
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

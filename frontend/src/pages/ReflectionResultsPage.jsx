import React, { useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Phone } from 'lucide-react';
import { getScoreInterpretation } from '../mockData';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ReflectionResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, token, refreshUser } = useContext(AuthContext);
  const { responses, totalScore } = location.state || { responses: [], totalScore: 0 };

  const interpretation = getScoreInterpretation(totalScore);

  useEffect(() => {
    // Save reflection and increment counter if free user
    saveReflection();
  }, []);

  const saveReflection = async () => {
    if (!token) return;

    try {
      // TODO: Save reflection to backend
      // For now, just increment free_reflections_used if not paid/beta
      if (user && !user.has_paid && !user.is_beta_tester) {
        await axios.post(
          `${API}/reflections/increment-free-usage`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        await refreshUser();
      }
    } catch (error) {
      console.error('Failed to save reflection:', error);
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

      {/* Results Content */}
      <main className="app-main">
        <div className="container max-w-3xl">
          <div className="results-card">
            <h1 className="heading-1 text-center mb-4">Your Reflection Results</h1>
            
            <div className="score-display">
              <div className="score-circle">
                <span className="score-number">{totalScore}</span>
                <span className="score-label">out of 30</span>
              </div>
            </div>

            <div className="interpretation-section">
              <h2 className="heading-2 mb-4">{interpretation.title}</h2>
              <p className="body-large mb-6">{interpretation.message}</p>

              <div className="info-box">
                <p className="body-medium font-semibold mb-2">What This Means:</p>
                <p className="body-medium">
                  This reflection helps you observe patterns in your nervous system responses. 
                  It is educational only and does not diagnose any condition.
                </p>
              </div>
            </div>

            <div className="next-steps-section mt-8">
              <h3 className="heading-3 mb-4">Recommended Next Steps:</h3>
              <ul className="space-y-3">
                <li className="body-medium">
                  ✓ Try our regulation tools to practice calming techniques
                </li>
                <li className="body-medium">
                  ✓ Track patterns over time with regular reflections
                </li>
                <li className="body-medium">
                  ✓ Consider speaking with a mental health professional
                </li>
              </ul>
            </div>

            <div className="action-buttons mt-8">
              <Button 
                className="btn-primary w-full mb-4"
                size="lg"
                onClick={() => navigate('/app/dashboard')}
              >
                Return to Dashboard
              </Button>
              
              <Button 
                variant="outline"
                className="btn-secondary w-full"
                size="lg"
                onClick={() => navigate('/app/regulation')}
              >
                Try Regulation Tools
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

export default ReflectionResultsPage;

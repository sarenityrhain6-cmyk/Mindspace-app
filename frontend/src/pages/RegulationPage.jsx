import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Phone, ArrowLeft, Play, Pause, RotateCcw } from 'lucide-react';

const RegulationPage = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState('inhale'); // inhale, hold, exhale
  const [countdown, setCountdown] = useState(4);
  const [totalTime, setTotalTime] = useState(0);
  const [cycles, setCycles] = useState(0);

  useEffect(() => {
    if (!token) {
      navigate('/signup');
    }
  }, [token]);

  useEffect(() => {
    let interval;
    if (isBreathing) {
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            // Move to next phase
            if (breathPhase === 'inhale') {
              setBreathPhase('hold');
              return 4;
            } else if (breathPhase === 'hold') {
              setBreathPhase('exhale');
              return 6;
            } else {
              setCycles((c) => c + 1);
              setBreathPhase('inhale');
              return 4;
            }
          }
          return prev - 1;
        });

        setTotalTime((t) => t + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isBreathing, breathPhase]);

  const startBreathing = () => {
    setIsBreathing(true);
    setBreathPhase('inhale');
    setCountdown(4);
  };

  const pauseBreathing = () => {
    setIsBreathing(false);
  };

  const resetBreathing = () => {
    setIsBreathing(false);
    setBreathPhase('inhale');
    setCountdown(4);
    setTotalTime(0);
    setCycles(0);
  };

  const getPhaseInstructions = () => {
    switch (breathPhase) {
      case 'inhale':
        return 'Breathe In...';
      case 'hold':
        return 'Hold...';
      case 'exhale':
        return 'Breathe Out...';
      default:
        return 'Ready';
    }
  };

  const getPhaseColor = () => {
    switch (breathPhase) {
      case 'inhale':
        return 'var(--accent-primary)';
      case 'hold':
        return 'var(--accent-text)';
      case 'exhale':
        return 'var(--accent-strong)';
      default:
        return 'var(--border-light)';
    }
  };

  return (
    <div className="app-page">
      {/* App Header */}
      <header className="app-header">
        <div className="container flex justify-between items-center">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/app/dashboard')}
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

      {/* Regulation Content */}
      <main className="app-main">
        <div className="container max-w-3xl">
          <div className="regulation-card">
            <h1 className="heading-1 text-center mb-3">Breathing Exercise</h1>
            <p className="body-large text-center mb-8">
              Reset your nervous system with guided breathing
            </p>

            {/* Breathing Circle */}
            <div className="breathing-container">
              <div 
                className="breathing-circle"
                style={{
                  backgroundColor: getPhaseColor(),
                  transform: breathPhase === 'inhale' && isBreathing ? 'scale(1.3)' : 
                            breathPhase === 'exhale' && isBreathing ? 'scale(0.7)' : 'scale(1)'
                }}
              >
                <div className="breathing-text">
                  <div className="breath-phase">{getPhaseInstructions()}</div>
                  <div className="breath-countdown">{countdown}</div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="breathing-controls">
              {!isBreathing ? (
                <Button 
                  className="btn-primary"
                  size="lg"
                  onClick={startBreathing}
                >
                  <Play size={20} className="mr-2" />
                  Start
                </Button>
              ) : (
                <Button 
                  className="btn-primary"
                  size="lg"
                  onClick={pauseBreathing}
                >
                  <Pause size={20} className="mr-2" />
                  Pause
                </Button>
              )}
              
              <Button 
                variant="outline"
                className="btn-secondary"
                size="lg"
                onClick={resetBreathing}
              >
                <RotateCcw size={20} className="mr-2" />
                Reset
              </Button>
            </div>

            {/* Stats */}
            <div className="breathing-stats">
              <div className="stat-item">
                <span className="stat-label">Time</span>
                <span className="stat-value">{Math.floor(totalTime / 60)}:{(totalTime % 60).toString().padStart(2, '0')}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Cycles</span>
                <span className="stat-value">{cycles}</span>
              </div>
            </div>

            {/* Instructions */}
            <div className="info-box mt-8">
              <h3 className="heading-3 mb-3">4-4-6 Breathing Pattern</h3>
              <ul className="space-y-2">
                <li className="body-medium">• <strong>Inhale</strong> for 4 seconds through your nose</li>
                <li className="body-medium">• <strong>Hold</strong> for 4 seconds</li>
                <li className="body-medium">• <strong>Exhale</strong> for 6 seconds through your mouth</li>
                <li className="body-medium">• Repeat for 5-10 cycles or 2-3 minutes</li>
              </ul>
            </div>
          </div>

          {/* Grounding Exercise */}
          <div className="grounding-card mt-8">
            <h2 className="heading-2 mb-4">5-4-3-2-1 Grounding Technique</h2>
            <p className="body-large mb-6">
              Use your senses to bring yourself back to the present moment:
            </p>

            <div className="grounding-steps">
              <div className="grounding-step">
                <div className="step-number">5</div>
                <div className="step-content">
                  <h3 className="heading-3">Things You Can See</h3>
                  <p className="body-medium">Look around and name 5 things you see</p>
                </div>
              </div>

              <div className="grounding-step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3 className="heading-3">Things You Can Touch</h3>
                  <p className="body-medium">Notice 4 things you can physically feel</p>
                </div>
              </div>

              <div className="grounding-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3 className="heading-3">Things You Can Hear</h3>
                  <p className="body-medium">Listen for 3 sounds around you</p>
                </div>
              </div>

              <div className="grounding-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3 className="heading-3">Things You Can Smell</h3>
                  <p className="body-medium">Notice 2 scents in your environment</p>
                </div>
              </div>

              <div className="grounding-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3 className="heading-3">Thing You Can Taste</h3>
                  <p className="body-medium">Identify 1 taste in your mouth</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p className="body-small">These are educational tools, not medical treatment.</p>
      </footer>
    </div>
  );
};

export default RegulationPage;

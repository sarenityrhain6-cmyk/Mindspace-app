import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Phone, ArrowLeft } from 'lucide-react';
import { reflectionQuestions } from '../mockData';

const ReflectionPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState(Array(10).fill(null));

  const handleResponse = (value) => {
    const newResponses = [...responses];
    newResponses[currentQuestion] = value;
    setResponses(newResponses);

    // Auto-advance to next question
    if (currentQuestion < 9) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    // Calculate total score
    const totalScore = responses.reduce((sum, val) => sum + (val || 0), 0);
    
    // Navigate to results with score
    navigate('/app/reflection-results', { state: { responses, totalScore } });
  };

  const progress = ((currentQuestion + 1) / 10) * 100;
  const isLastQuestion = currentQuestion === 9;
  const canSubmit = responses.every(r => r !== null);

  return (
    <div className="app-page">
      {/* App Header */}
      <header className="app-header">
        <div className="container flex justify-between items-center">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handlePrevious}
            className="flex items-center gap-2"
            disabled={currentQuestion === 0}
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

      {/* Progress Bar */}
      <div className="reflection-progress">
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="body-small text-center mt-2">
          Question {currentQuestion + 1} of 10
        </p>
      </div>

      {/* Reflection Content */}
      <main className="app-main">
        <div className="container max-w-3xl">
          <div className="reflection-card">
            <h2 className="heading-2 text-center mb-8">
              {reflectionQuestions[currentQuestion]}
            </h2>

            <div className="reflection-scale">
              <div className="scale-labels mb-6">
                <span className="body-small">Never</span>
                <span className="body-small">Sometimes</span>
                <span className="body-small">Often</span>
                <span className="body-small">Almost Always</span>
              </div>

              <div className="scale-options">
                {[0, 1, 2, 3].map((value) => (
                  <button
                    key={value}
                    className={`scale-button ${responses[currentQuestion] === value ? 'selected' : ''}`}
                    onClick={() => handleResponse(value)}
                  >
                    <span className="scale-value">{value}</span>
                    <span className="scale-label">
                      {value === 0 && 'Never'}
                      {value === 1 && 'Sometimes'}
                      {value === 2 && 'Often'}
                      {value === 3 && 'Almost Always'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {isLastQuestion && responses[9] !== null && (
              <div className="mt-8 text-center">
                <Button 
                  className="btn-primary"
                  size="lg"
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                >
                  See My Results
                </Button>
              </div>
            )}
          </div>

          {/* Question Navigation */}
          <div className="reflection-nav mt-6">
            <div className="question-dots">
              {reflectionQuestions.map((_, index) => (
                <button
                  key={index}
                  className={`question-dot ${responses[index] !== null ? 'answered' : ''} ${currentQuestion === index ? 'current' : ''}`}
                  onClick={() => setCurrentQuestion(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p className="body-small">Take your time. There are no wrong answers.</p>
      </footer>
    </div>
  );
};

export default ReflectionPage;

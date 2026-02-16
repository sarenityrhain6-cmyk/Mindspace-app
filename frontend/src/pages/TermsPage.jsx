import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Checkbox } from '../components/ui/checkbox';
import { ScrollArea } from '../components/ui/scroll-area';
import { AlertCircle } from 'lucide-react';

const TermsPage = () => {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  const handleContinue = () => {
    if (agreed) {
      navigate('/app/welcome');
    }
  };

  return (
    <div className="terms-page">
      <div className="container max-w-4xl py-12">
        <div className="terms-card">
          <h1 className="heading-1 mb-6">Terms of Use & Safety Notice</h1>
          
          <div className="alert-box mb-6">
            <AlertCircle className="text-red-600" size={24} />
            <p className="body-medium ml-3">
              MindSpace is an educational self-reflection platform. It is not medical care, mental health treatment, or therapy.
            </p>
          </div>

          <ScrollArea className="terms-content h-96 mb-8 pr-4">
            <div className="space-y-6">
              <section>
                <h2 className="heading-3 mb-3">1. Educational Purpose Only</h2>
                <p className="body-medium">
                  MindSpace provides educational content about emotional patterns and nervous system awareness. 
                  It does not diagnose, treat, or prevent any medical or mental health condition.
                </p>
              </section>

              <section>
                <h2 className="heading-3 mb-3">2. Not a Substitute for Professional Care</h2>
                <p className="body-medium">
                  MindSpace does not replace therapy, psychiatric care, medical treatment, or crisis services. 
                  Always seek guidance from a qualified healthcare professional regarding mental or physical health concerns.
                </p>
              </section>

              <section>
                <h2 className="heading-3 mb-3">3. Crisis & Emergency Disclaimer</h2>
                <p className="body-medium mb-4">
                  If you are experiencing suicidal thoughts, self-harm urges, or are in immediate danger:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="body-medium">• Call 911 (U.S.)</li>
                  <li className="body-medium">• Call or text 988 (U.S.)</li>
                  <li className="body-medium">• Contact local emergency services outside the U.S.</li>
                </ul>
                <p className="body-medium mt-4 font-semibold">
                  MindSpace does not provide crisis intervention.
                </p>
              </section>

              <section>
                <h2 className="heading-3 mb-3">4. User Responsibility</h2>
                <p className="body-medium">
                  You understand that you are responsible for how you use the information provided in this app.
                </p>
              </section>

              <section>
                <h2 className="heading-3 mb-3">5. Data & Privacy (Beta Phase)</h2>
                <p className="body-medium mb-3">During beta testing:</p>
                <ul className="space-y-2 ml-6">
                  <li className="body-medium">• Only minimal information (such as nickname or email) may be collected.</li>
                  <li className="body-medium">• Sensitive personal data should not be entered.</li>
                  <li className="body-medium">• Data storage methods may evolve as the platform develops.</li>
                </ul>
              </section>

              <section>
                <h2 className="heading-3 mb-3">6. Changes to Terms</h2>
                <p className="body-medium">
                  MindSpace may update these terms as development progresses. 
                  By continuing to use the platform, you acknowledge and agree to these terms.
                </p>
              </section>
            </div>
          </ScrollArea>

          <div className="agreement-section">
            <div className="flex items-start gap-3 mb-6">
              <Checkbox 
                id="agree-terms" 
                checked={agreed}
                onCheckedChange={setAgreed}
                className="mt-1"
              />
              <label htmlFor="agree-terms" className="body-medium cursor-pointer">
                I have read and understand these terms. I agree that MindSpace is educational only and does not replace professional mental health care or crisis services.
              </label>
            </div>

            <div className="flex gap-4 justify-center">
              <Button 
                variant="secondary" 
                className="btn-secondary"
                onClick={() => navigate('/')}
              >
                Go Back
              </Button>
              <Button 
                className="btn-primary"
                onClick={handleContinue}
                disabled={!agreed}
              >
                Continue to MindSpace
              </Button>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="container">
          <p className="body-small">MindSpace is not therapy or crisis care.</p>
        </div>
      </footer>
    </div>
  );
};

export default TermsPage;

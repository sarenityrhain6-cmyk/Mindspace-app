import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="app-page">
      {/* Header */}
      <header className="app-header">
        <div className="container flex justify-between items-center">
          <div className="logo-text">MindSpace</div>
        </div>
      </header>

      {/* Privacy Policy Content */}
      <main className="app-main">
        <div className="container max-w-4xl">
          <div className="terms-card">
            <h1 className="heading-1 mb-6">Privacy Policy</h1>
            
            <p className="body-medium mb-6">
              <strong>Last Updated:</strong> December 17, 2024
            </p>

            <div className="space-y-6">
              <section>
                <h2 className="heading-3 mb-3">1. Introduction</h2>
                <p className="body-medium">
                  MindSpace ("we," "our," or "us") is committed to protecting your privacy. 
                  This Privacy Policy explains how we collect, use, and protect your information 
                  when you use our educational self-reflection platform.
                </p>
              </section>

              <section>
                <h2 className="heading-3 mb-3">2. Information We Collect</h2>
                <p className="body-medium mb-3">
                  <strong>Beta Phase - Minimal Collection:</strong>
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="body-medium">• Email address (for beta signup)</li>
                  <li className="body-medium">• Nickname (optional, user-provided)</li>
                  <li className="body-medium">• Reflection responses (numerical ratings only)</li>
                  <li className="body-medium">• Usage timestamps</li>
                </ul>
                <p className="body-medium mt-4">
                  <strong>We DO NOT collect:</strong> Full names, addresses, phone numbers, 
                  social security numbers, detailed trauma history, or highly sensitive personal information.
                </p>
              </section>

              <section>
                <h2 className="heading-3 mb-3">3. How We Use Your Information</h2>
                <ul className="space-y-2 ml-6">
                  <li className="body-medium">• To provide the educational reflection service</li>
                  <li className="body-medium">• To store your reflection results for your own review</li>
                  <li className="body-medium">• To improve our platform based on usage patterns</li>
                  <li className="body-medium">• To communicate beta updates (if you signed up)</li>
                </ul>
              </section>

              <section>
                <h2 className="heading-3 mb-3">4. Data Storage & Security</h2>
                <p className="body-medium mb-3">
                  Your data is stored securely using:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="body-medium">• MongoDB Atlas (encrypted database)</li>
                  <li className="body-medium">• HTTPS encryption for all data transmission</li>
                  <li className="body-medium">• Secure cloud infrastructure (Emergent/Kubernetes)</li>
                  <li className="body-medium">• Regular security audits</li>
                </ul>
                <p className="body-medium mt-4">
                  <strong>Mobile App:</strong> When using the mobile app, data may be temporarily 
                  cached on your device for offline access. This data is encrypted and cleared 
                  when you log out or uninstall the app.
                </p>
              </section>

              <section>
                <h2 className="heading-3 mb-3">5. Data Retention</h2>
                <p className="body-medium">
                  • Beta signup emails: Retained until beta completion or user requests deletion
                  <br />• Reflection responses: Retained for your ongoing use unless you request deletion
                  <br />• Inactive accounts: May be deleted after 12 months of inactivity
                </p>
              </section>

              <section>
                <h2 className="heading-3 mb-3">6. Your Rights</h2>
                <p className="body-medium mb-3">You have the right to:</p>
                <ul className="space-y-2 ml-6">
                  <li className="body-medium">• Access your data at any time</li>
                  <li className="body-medium">• Request deletion of your data</li>
                  <li className="body-medium">• Export your reflection history</li>
                  <li className="body-medium">• Opt out of communications</li>
                  <li className="body-medium">• Request data correction</li>
                </ul>
              </section>

              <section>
                <h2 className="heading-3 mb-3">7. Third-Party Services</h2>
                <p className="body-medium mb-3">
                  MindSpace uses the following third-party services:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="body-medium">• MongoDB Atlas (database hosting)</li>
                  <li className="body-medium">• Emergent/Kubernetes (application hosting)</li>
                  <li className="body-medium">• Google Play Services (mobile app distribution)</li>
                </ul>
                <p className="body-medium mt-4">
                  These services have their own privacy policies and security measures.
                </p>
              </section>

              <section>
                <h2 className="heading-3 mb-3">8. Mobile App Permissions</h2>
                <p className="body-medium mb-3">
                  The MindSpace mobile app requests the following permissions:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="body-medium">• <strong>Internet:</strong> To sync data with our servers</li>
                  <li className="body-medium">• <strong>Storage:</strong> To cache reflection data offline</li>
                  <li className="body-medium">• <strong>Vibration (optional):</strong> For haptic feedback during breathing exercises</li>
                </ul>
                <p className="body-medium mt-4">
                  We DO NOT request access to: Camera, microphone, contacts, location, or SMS.
                </p>
              </section>

              <section>
                <h2 className="heading-3 mb-3">9. Children's Privacy</h2>
                <p className="body-medium">
                  MindSpace is not intended for users under 18 years of age. We do not knowingly 
                  collect information from children under 18. If you believe we have inadvertently 
                  collected such information, please contact us immediately.
                </p>
              </section>

              <section>
                <h2 className="heading-3 mb-3">10. Changes to This Policy</h2>
                <p className="body-medium">
                  We may update this Privacy Policy as MindSpace evolves. Any changes will be 
                  posted on this page with an updated "Last Updated" date. Continued use of 
                  MindSpace after changes constitutes acceptance of the updated policy.
                </p>
              </section>

              <section>
                <h2 className="heading-3 mb-3">11. Contact Us</h2>
                <p className="body-medium">
                  For questions about this Privacy Policy or to exercise your data rights, 
                  please contact us at:
                </p>
                <p className="body-medium mt-3">
                  <strong>Email:</strong> privacy@mindspace.app (update with your actual email)
                </p>
              </section>

              <div className="info-box mt-8">
                <p className="body-medium font-semibold">
                  Important Reminder:
                </p>
                <p className="body-medium mt-2">
                  MindSpace is an educational tool, not a substitute for professional mental 
                  health care. Your reflection data is for your personal awareness only and 
                  should not be used for self-diagnosis. If you're experiencing a mental 
                  health crisis, please call 988 (U.S.) or your local emergency services.
                </p>
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

export default PrivacyPolicy;
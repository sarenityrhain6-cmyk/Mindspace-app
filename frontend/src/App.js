import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import TermsPage from "./pages/TermsPage";
import WelcomePage from "./pages/WelcomePage";
import SafetyConsentPage from "./pages/SafetyConsentPage";
import DashboardPage from "./pages/DashboardPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/app/welcome" element={<WelcomePage />} />
          <Route path="/app/safety-consent" element={<SafetyConsentPage />} />
          <Route path="/app/dashboard" element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

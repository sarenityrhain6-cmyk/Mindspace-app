import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import LandingPage from "./pages/LandingPage";
import TermsPage from "./pages/TermsPage";
import WelcomePage from "./pages/WelcomePage";
import SafetyConsentPage from "./pages/SafetyConsentPage";
import DashboardPage from "./pages/DashboardPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ReflectionPage from "./pages/ReflectionPage";
import ReflectionResultsPage from "./pages/ReflectionResultsPage";
import PaywallPage from "./pages/PaywallPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import PaymentCancelPage from "./pages/PaymentCancelPage";
import RegulationPage from "./pages/RegulationPage";
import DeleteAccountPage from "./pages/DeleteAccountPage";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/delete-account" element={<DeleteAccountPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/paywall" element={<PaywallPage />} />
            <Route path="/payment-success" element={<PaymentSuccessPage />} />
            <Route path="/payment-cancel" element={<PaymentCancelPage />} />
            <Route path="/app/welcome" element={<WelcomePage />} />
            <Route path="/app/safety-consent" element={<SafetyConsentPage />} />
            <Route path="/app/dashboard" element={<DashboardPage />} />
            <Route path="/app/reflection" element={<ReflectionPage />} />
            <Route path="/app/reflection-results" element={<ReflectionResultsPage />} />
            <Route path="/app/regulation" element={<RegulationPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;

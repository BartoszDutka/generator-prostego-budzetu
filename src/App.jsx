import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactGA from 'react-ga4';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AnalyticsListener from './components/AnalyticsListener';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import AddOperationPage from './pages/AddOperationPage';
import HistoryPage from './pages/HistoryPage';
import SavingsPlanPage from './pages/SavingsPlanPage';
import ProfilePage from './pages/ProfilePage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import HowItWorksPage from './pages/HowItWorksPage';
import HelpPage from './pages/HelpPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

const GA4_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID;

export default function App() {
  useEffect(() => {
    ReactGA.initialize(GA4_MEASUREMENT_ID);
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <AnalyticsListener />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/jak-to-dziala" element={<HowItWorksPage />} />
          <Route path="/regulamin" element={<TermsPage />} />
          <Route path="/polityka-prywatnosci" element={<PrivacyPage />} />
          <Route path="/pomoc" element={<HelpPage />} />
          <Route path="/kontakt" element={<ContactPage />} />

          {/* Protected routes (require login) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/add" element={<AddOperationPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/plan" element={<SavingsPlanPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          {/* 404 fallback */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

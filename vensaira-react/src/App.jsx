import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import MissionVision from './pages/MissionVision';
import { AuthProvider } from './context/AuthContext';

import SoftwareEngineeringPage from './pages/services/SoftwareEngineeringPage';
import AiMachineLearningPage from './pages/services/AiMachineLearningPage';
import CloudInfrastructurePage from './pages/services/CloudInfrastructurePage';
import DataIntelligencePage from './pages/services/DataIntelligencePage';
import DigitalSolutionsPage from './pages/services/DigitalSolutionsPage';
import AutomationIntegrationPage from './pages/services/AutomationIntegrationPage';

import AiSolutionsLanding from './pages/AiSolutionsLanding';
import GenerativeAiPage from './pages/services/GenerativeAiPage';
import AgenticAiPage from './pages/services/AgenticAiPage';
import AiChatbotsPage from './pages/services/AiChatbotsPage';
import ConversationalAiPage from './pages/services/ConversationalAiPage';
import QuantumMachineLearningPage from './pages/services/QuantumMachineLearningPage';
import AiElearningPage from './pages/services/AiElearningPage';

import HealthcarePage from './pages/industries/HealthcarePage';
import EducationPage from './pages/industries/EducationPage';
import LogisticsPage from './pages/industries/LogisticsPage';
import FinancialServicesPage from './pages/industries/FinancialServicesPage';
import RetailEcommercePage from './pages/industries/RetailEcommercePage';
import ManufacturingPage from './pages/industries/ManufacturingPage';
import TechnologySaasPage from './pages/industries/TechnologySaasPage';
import ProfessionalServicesPage from './pages/industries/ProfessionalServicesPage';

import Courses from './pages/elearning/Courses';
import Projects from './pages/elearning/Projects';
import AboutElearning from './pages/elearning/AboutElearning';
import CourseDetails from './pages/elearning/CourseDetails';
import Login from './pages/elearning/Login';
import Signup from './pages/elearning/Signup';
import Dashboard from './pages/elearning/Dashboard';
import Account from './pages/elearning/Account';
import ElearningContact from './pages/elearning/ElearningContact';
import ElearningHeader from './components/elearning/ElearningHeader';
import ElearningFooter from './components/elearning/ElearningFooter';
import './styles/global.css';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}

// Skip to main content link for accessibility
function SkipLink() {
  return (
    <a
      href="#main-content"
      style={{
        position: 'absolute',
        left: '-9999px',
        top: 'auto',
        width: 1, height: 1,
        overflow: 'hidden',
        zIndex: 9999,
      }}
      onFocus={(e) => {
        e.target.style.left = '16px';
        e.target.style.top = '16px';
        e.target.style.width = 'auto';
        e.target.style.height = 'auto';
      }}
      onBlur={(e) => {
        e.target.style.left = '-9999px';
        e.target.style.width = 1;
        e.target.style.height = 1;
      }}
    >
      Skip to main content
    </a>
  );
}

function AppInner() {
  const { pathname, hash } = useLocation();

  // Handle hash links on homepage (e.g. /#about)
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash.slice(1));
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [pathname, hash]);

  return (
    <>
      <SkipLink />
      {/* Ambient animated background (global, fixed) */}
      <div className="ambient-background" aria-hidden="true">
        <div className="ambient-blob blob-1" />
        <div className="ambient-blob blob-2" />
        <div className="ambient-blob blob-3" />
        <div className="cyber-grid" />
      </div>

      <ScrollToTop />
      {pathname.startsWith('/elearning') ? <ElearningHeader /> : <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mission-vision" element={<MissionVision />} />
        
        {/* Services Routes */}
        <Route path="/services/software-engineering" element={<SoftwareEngineeringPage />} />
        <Route path="/services/ai-machine-learning" element={<Navigate to="/ai-solutions/ai-machine-learning" replace />} />
        <Route path="/services/cloud-infrastructure" element={<CloudInfrastructurePage />} />
        <Route path="/services/data-intelligence" element={<DataIntelligencePage />} />
        <Route path="/services/digital-solutions" element={<DigitalSolutionsPage />} />
        <Route path="/services/automation-integration" element={<AutomationIntegrationPage />} />
        
        {/* AI Solutions Routes */}
        <Route path="/ai-solutions" element={<AiSolutionsLanding />} />
        <Route path="/ai-solutions/ai-machine-learning" element={<AiMachineLearningPage />} />
        <Route path="/ai-solutions/generative-ai-llms" element={<GenerativeAiPage />} />
        <Route path="/ai-solutions/agentic-ai" element={<AgenticAiPage />} />
        <Route path="/ai-solutions/ai-chatbots" element={<AiChatbotsPage />} />
        <Route path="/ai-solutions/conversational-ai" element={<ConversationalAiPage />} />
        <Route path="/ai-solutions/quantum-machine-learning" element={<QuantumMachineLearningPage />} />
        <Route path="/ai-solutions/ai-elearning" element={<AiElearningPage />} />
        
        {/* Industries Routes */}
        <Route path="/industries/healthcare" element={<HealthcarePage />} />
        <Route path="/industries/education" element={<EducationPage />} />
        <Route path="/industries/logistics" element={<LogisticsPage />} />
        <Route path="/industries/financial-services" element={<FinancialServicesPage />} />
        <Route path="/industries/retail-ecommerce" element={<RetailEcommercePage />} />
        <Route path="/industries/manufacturing" element={<ManufacturingPage />} />
        <Route path="/industries/technology-saas" element={<TechnologySaasPage />} />
        <Route path="/industries/professional-services" element={<ProfessionalServicesPage />} />
        
        {/* eLearning Routes */}
        <Route path="/elearning" element={<Navigate to="/elearning/courses" replace />} />
        <Route path="/elearning/courses" element={<Courses />} />
        <Route path="/elearning/courses/:courseId" element={<CourseDetails />} />
        <Route path="/elearning/projects" element={<Projects />} />
        <Route path="/elearning/login" element={<Login />} />
        <Route path="/elearning/signup" element={<Signup />} />
        <Route path="/elearning/dashboard" element={<Dashboard />} />
        <Route path="/elearning/account" element={<Account />} />
        <Route path="/elearning/about" element={<AboutElearning />} />
        <Route path="/elearning/contact" element={<ElearningContact />} />

        {/* Fallback */}
        <Route path="*" element={<Home />} />
      </Routes>

      {pathname.startsWith('/elearning') ? <ElearningFooter /> : <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppInner />
      </AuthProvider>
    </BrowserRouter>
  );
}

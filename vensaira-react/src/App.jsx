import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import MissionVision from './pages/MissionVision';
import { AuthProvider } from './context/AuthContext';
import ELearningHome from './pages/elearning/ELearningHome';
import Courses from './pages/elearning/Courses';
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
        
        {/* eLearning Routes */}
        <Route path="/elearning" element={<ELearningHome />} />
        <Route path="/elearning/courses" element={<Courses />} />
        <Route path="/elearning/about" element={<AboutElearning />} />
        <Route path="/elearning/login" element={<Login />} />
        <Route path="/elearning/signup" element={<Signup />} />
        <Route path="/elearning/dashboard" element={<Dashboard />} />
        <Route path="/elearning/account" element={<Account />} />
        <Route path="/elearning/contact" element={<ElearningContact />} />
        <Route path="/elearning/courses/:courseId" element={<CourseDetails />} />

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

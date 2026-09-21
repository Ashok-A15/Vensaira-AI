import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/elearning.css';

export default function Account() {
  const { user, logout } = useAuth();

  return (
    <div className="elearning-page">
      <section className="el-hero-split">
        <div className="el-animate-fade-up">
          <span className="el-label">Your Learning Account</span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: 'var(--font-heading)', color: 'var(--el-navy)', lineHeight: 1.1, margin: '16px 0 24px' }}>
            Your Learning Journey Starts Here
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#475569', lineHeight: 1.6, maxWidth: '500px', marginBottom: '40px' }}>
            Sign in to access your courses and learning progress, or create an account to get started.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
            {user ? (
              <>
                <div style={{ background: 'white', padding: '32px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--el-border)', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--el-navy)' }}>Welcome back, {user.firstName}!</h3>
                  <p style={{ color: '#475569', marginBottom: '24px' }}>Ready to continue your learning journey?</p>
                  <Link to="/elearning/dashboard" className="btn btn-primary" style={{ display: 'inline-block', padding: '12px 24px', background: 'var(--el-primary)', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>
                    Go to Dashboard &rarr;
                  </Link>
                </div>
                <div style={{ background: 'white', padding: '32px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--el-border)', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--el-navy)' }}>Account Settings</h3>
                  <p style={{ color: '#475569', marginBottom: '24px' }}>Manage your profile and active enrollments.</p>
                  <button onClick={logout} className="btn" style={{ background: '#f8fafc', border: '1px solid #ef4444', color: '#ef4444', padding: '12px 24px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <div style={{ background: 'white', padding: '32px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--el-primary)', boxShadow: '0 8px 24px rgba(8, 120, 201, 0.1)' }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--el-navy)' }}>Already have an account?</h3>
                  <p style={{ color: '#475569', marginBottom: '24px' }}>Sign in to continue your learning journey.</p>
                  <Link to="/elearning/login" className="btn btn-primary" style={{ display: 'inline-block', padding: '12px 24px', background: 'var(--el-primary)', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>
                    Sign In &rarr;
                  </Link>
                </div>
                <div style={{ background: 'white', padding: '32px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--el-border)', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--el-navy)' }}>New to VENSAIRA?</h3>
                  <p style={{ color: '#475569', marginBottom: '24px' }}>Create your account and start exploring our courses.</p>
                  <Link to="/elearning/signup" className="btn" style={{ display: 'inline-block', padding: '12px 24px', background: '#f1f5f9', color: 'var(--el-navy)', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>
                    Create Account &rarr;
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="el-visual-container el-animate-slide-right">
          <div className="el-abstract-visual">
            <div className="el-glow-circle el-glow-1" style={{ background: 'var(--el-indigo)' }}></div>
            <div className="el-glow-circle el-glow-2" style={{ background: 'var(--el-accent)' }}></div>
            
            {/* Floating Course Cards Abstraction */}
            <div style={{ position: 'absolute', width: '200px', height: '120px', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)', top: '20%', left: '10%', animation: 'elFloat 5s ease-in-out infinite' }}></div>
            <div style={{ position: 'absolute', width: '180px', height: '100px', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', top: '50%', right: '10%', animation: 'elFloat 6s ease-in-out infinite reverse' }}></div>
          </div>
        </div>
      </section>

      {/* Feature Strip */}
      <section className="container" style={{ maxWidth: '1200px', margin: '0 auto 80px' }}>
        <h3 style={{ textAlign: 'center', color: '#64748b', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Everything in One Place</h3>
        <div className="el-feature-strip">
          <div className="el-feature-item">
            <span className="el-feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
            </span>
            Courses
          </div>
          <div className="el-feature-item">
            <span className="el-feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
            </span>
            Learning Progress
          </div>
          <div className="el-feature-item">
            <span className="el-feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </span>
            Your Enrollments
          </div>
          <div className="el-feature-item">
            <span className="el-feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </span>
            Future Learning
          </div>
        </div>
      </section>
    </div>
  );
}

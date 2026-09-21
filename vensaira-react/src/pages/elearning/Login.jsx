import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/elearning.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const returnTo = location.state?.returnTo || '/elearning/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    const success = await login(email, password);
    setLoading(false);

    if (success) {
      navigate(returnTo);
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="el-auth-page">
      <div className="el-auth-card">

        <div className="el-auth-header">
          <Link to="/elearning" className="el-auth-brand">
            VENSAIRA AI <span>eLearning</span>
          </Link>
          <h1 className="el-auth-title">Welcome Back</h1>
          <p className="el-auth-subtitle">Sign in to continue your learning journey.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="el-form-group">
            <label className="el-form-label" htmlFor="login-email">Email Address</label>
            <input
              type="email"
              id="login-email"
              className="el-form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>

          <div className="el-form-group">
            <div className="el-form-label-row">
              <label className="el-form-label" htmlFor="login-password">Password</label>
              <Link to="#" className="el-forgot-link">Forgot Password?</Link>
            </div>
            <input
              type="password"
              id="login-password"
              className="el-form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="el-form-error" role="alert">{error}</div>
          )}

          <button
            type="submit"
            className="el-btn el-btn-full"
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="el-auth-switch">
          Don't have an account?{' '}
          <Link to="/elearning/signup">Create an account &rarr;</Link>
        </p>

      </div>
    </div>
  );
}

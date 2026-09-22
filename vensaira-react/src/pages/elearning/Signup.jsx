import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/elearning.css';

export default function Signup() {
  useEffect(() => {
    document.title = 'Sign Up | Vensaira AI eLearning';
  }, []);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { firstName, lastName, email, password, confirmPassword } = formData;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    const success = await signup({ firstName, lastName, email, password });
    setLoading(false);

    if (success) {
      navigate('/elearning/dashboard');
    }
  };

  return (
    <div className="el-auth-page">
      <div className="el-auth-card" style={{ maxWidth: '520px' }}>

        <div className="el-auth-header">
          <Link to="/elearning/courses" className="el-auth-brand">
            VENSAIRA AI <span>eLearning</span>
          </Link>
          <h1 className="el-auth-title">Create Your Learning Account</h1>
          <p className="el-auth-subtitle">
            Start building practical technology skills with Vensaira AI eLearning.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="el-form-row">
            <div className="el-form-group">
              <label className="el-form-label" htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                className="el-form-input"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Jane"
                autoComplete="given-name"
              />
            </div>
            <div className="el-form-group">
              <label className="el-form-label" htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                className="el-form-input"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                autoComplete="family-name"
              />
            </div>
          </div>

          <div className="el-form-group">
            <label className="el-form-label" htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              className="el-form-input"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>

          <div className="el-form-group">
            <label className="el-form-label" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="el-form-input"
              value={formData.password}
              onChange={handleChange}
              placeholder="Choose a strong password"
              autoComplete="new-password"
            />
          </div>

          <div className="el-form-group">
            <label className="el-form-label" htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="el-form-input"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              autoComplete="new-password"
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
            {loading ? 'Creating Account…' : 'Create Account →'}
          </button>
        </form>

        <p className="el-auth-switch">
          Already have an account?{' '}
          <Link to="/elearning/login">Login &rarr;</Link>
        </p>

      </div>
    </div>
  );
}

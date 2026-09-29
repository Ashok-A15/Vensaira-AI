/**
 * Vensaira AI Assistant — CareersScreen Component
 * Dedicated introduction screen for Careers, Application flow, and Candidate Assessment Center.
 */

import { useState } from 'react';

export default function CareersScreen({
  onStartApplication,
  onContinueApplication,
  onBackToChat,
  existingApplication
}) {
  const [showLookup, setShowLookup] = useState(false);
  const [lookupValue, setLookupValue] = useState('');
  const [lookupError, setLookupError] = useState('');
  const [isLookingUp, setIsLookingUp] = useState(false);

  const handleLookupSubmit = async (e) => {
    e.preventDefault();
    if (!lookupValue.trim()) return;
    setIsLookingUp(true);
    setLookupError('');
    try {
      const res = await onContinueApplication(lookupValue.trim());
      if (!res || !res.success) {
        setLookupError(res?.message || 'No application found with that ID or email.');
      }
    } catch {
      setLookupError('Failed to lookup application. Please try again.');
    } finally {
      setIsLookingUp(false);
    }
  };

  return (
    <div className="vensaira-careers-intro cb-fade-in">
      <div className="vensaira-careers-badge">Recruitment & Assessment Portal</div>
      <h3 className="vensaira-careers-title">Careers at Vensaira</h3>
      <p className="vensaira-careers-description">
        Explore career opportunities, complete your candidate assessment, and experience our AI-powered interview process.
      </p>

      <div className="vensaira-careers-actions">
        <button
          type="button"
          className="vensaira-btn-primary"
          onClick={onStartApplication}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="12" y1="18" x2="12" y2="12" />
            <line x1="9" y1="15" x2="15" y2="15" />
          </svg>
          <span>Start Job Application</span>
        </button>

        {existingApplication ? (
          <button
            type="button"
            className="vensaira-btn-secondary"
            onClick={() => onContinueApplication(existingApplication.applicationId)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
            <span>Continue Existing Application ({existingApplication.applicationId})</span>
          </button>
        ) : (
          <button
            type="button"
            className="vensaira-btn-secondary"
            onClick={() => setShowLookup((prev) => !prev)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span>Continue Existing Application</span>
          </button>
        )}

        {showLookup && !existingApplication && (
          <form className="vensaira-careers-lookup-form" onSubmit={handleLookupSubmit}>
            <div className="vensaira-lookup-group">
              <input
                type="text"
                className="vensaira-lookup-input"
                placeholder="Enter Application ID or Email..."
                value={lookupValue}
                onChange={(e) => setLookupValue(e.target.value)}
                autoFocus
              />
              <button
                type="submit"
                className="vensaira-lookup-submit-btn"
                disabled={!lookupValue.trim() || isLookingUp}
              >
                {isLookingUp ? 'Searching...' : 'Find'}
              </button>
            </div>
            {lookupError && <div className="vensaira-lookup-error">{lookupError}</div>}
          </form>
        )}

        <button
          type="button"
          className="vensaira-btn-text"
          onClick={onBackToChat}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          <span>Back to Chat</span>
        </button>
      </div>
    </div>
  );
}

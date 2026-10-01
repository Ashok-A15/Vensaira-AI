/**
 * Vensaira AI Assistant — AiAssessmentStart Component
 * Clean, focused starting screen for the AI Assessment.
 * Replaces the old Candidate Assessment Center dashboard & technical question screens.
 */

import { useState } from 'react';

export default function AiAssessmentStart({
  applicationId,
  candidate,
  onBack,
  onStart
}) {
  const [hasStarted, setHasStarted] = useState(false);

  const appliedRole = candidate?.appliedRole || 'Software Engineer';
  const candidateName = candidate
    ? `${candidate.firstName || ''} ${candidate.lastName || ''}`.trim()
    : '';

  const handleStartClick = () => {
    setHasStarted(true);
    if (onStart) onStart();
  };

  return (
    <div className="vensaira-assessment-start cb-fade-in">
      {/* Top Navigation */}
      <div className="vensaira-assessment-start-nav">
        <button
          type="button"
          className="vensaira-step-back-btn"
          onClick={onBack}
          aria-label="Back to application confirmation"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span>Back</span>
        </button>
      </div>

      <div className="vensaira-assessment-start-body">
        {/* Title */}
        <h3 className="vensaira-assessment-start-title">AI Assessment</h3>

        {/* Short explanation */}
        <p className="vensaira-assessment-start-desc">
          Your application has been received and your technical evaluation is ready to begin. Please review your session details below before proceeding.
        </p>

        {/* Application & Candidate Info */}
        <div className="vensaira-assessment-info-card">
          <div className="vensaira-info-row">
            <span className="vensaira-info-label">Application ID</span>
            <span className="vensaira-info-value vensaira-info-id">{applicationId || 'VA-PENDING'}</span>
          </div>
          {candidateName && (
            <div className="vensaira-info-row">
              <span className="vensaira-info-label">Candidate</span>
              <span className="vensaira-info-value">{candidateName}</span>
            </div>
          )}
          <div className="vensaira-info-row">
            <span className="vensaira-info-label">Applied Position</span>
            <span className="vensaira-info-value">{appliedRole}</span>
          </div>
          <div className="vensaira-info-row">
            <span className="vensaira-info-label">Status</span>
            <span className="vensaira-status-pill ready">Ready to Begin</span>
          </div>
        </div>

        {/* Assessment Information */}
        <div className="vensaira-assessment-guidelines">
          <h4 className="vensaira-guidelines-heading">Assessment Information</h4>
          <ul className="vensaira-guidelines-list">
            <li>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0878C9" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span><strong>Duration:</strong> Approximately 15–20 minutes</span>
            </li>
            <li>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0878C9" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <span><strong>Format:</strong> Role-specific technical evaluation</span>
            </li>
            <li>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0878C9" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span><strong>Environment:</strong> Ensure a stable internet connection</span>
            </li>
          </ul>
        </div>

        {/* Feedback message when user clicks Start Assessment */}
        {hasStarted && (
          <div className="vensaira-assessment-ready-notice cb-fade-in" role="status">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#15803D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
            <span>Assessment session initialized. Evaluation modules will launch shortly.</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="vensaira-assessment-start-actions">
          <button
            type="button"
            className="vensaira-btn-primary"
            onClick={handleStartClick}
            disabled={hasStarted}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            <span>{hasStarted ? 'Assessment Initialized' : 'Start Assessment'}</span>
          </button>

          <button
            type="button"
            className="vensaira-btn-secondary"
            onClick={onBack}
          >
            <span>Back</span>
          </button>
        </div>
      </div>
    </div>
  );
}

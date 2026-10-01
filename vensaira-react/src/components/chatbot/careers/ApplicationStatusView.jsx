/**
 * Vensaira AI Assistant — ApplicationStatusView Component
 * Clean, lightweight application status screen replacing the old Candidate Assessment Center dashboard.
 */

export default function ApplicationStatusView({
  applicationId,
  candidate,
  onStartAssessment,
  onBack,
  onBackToChat
}) {
  const appliedRole = candidate?.appliedRole || 'Software Engineer';
  const candidateName = candidate
    ? `${candidate.firstName || ''} ${candidate.lastName || ''}`.trim()
    : '';

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
        <h3 className="vensaira-assessment-start-title">Application Status</h3>

        <div className="vensaira-app-id-badge" style={{ marginBottom: 16 }}>
          <span className="vensaira-badge-label">Application ID:</span>
          <span className="vensaira-badge-val">{applicationId || 'VA-PENDING'}</span>
        </div>

        {/* Application details */}
        <div className="vensaira-assessment-info-card">
          {candidateName && (
            <div className="vensaira-info-row">
              <span className="vensaira-info-label">Candidate</span>
              <span className="vensaira-info-value">{candidateName}</span>
            </div>
          )}
          {candidate?.email && (
            <div className="vensaira-info-row">
              <span className="vensaira-info-label">Email</span>
              <span className="vensaira-info-value">{candidate.email}</span>
            </div>
          )}
          <div className="vensaira-info-row">
            <span className="vensaira-info-label">Position</span>
            <span className="vensaira-info-value">{appliedRole}</span>
          </div>
          <div className="vensaira-info-row">
            <span className="vensaira-info-label">Application Status</span>
            <span className="vensaira-status-pill submitted">Submitted</span>
          </div>
        </div>

        <p className="vensaira-assessment-start-desc" style={{ marginTop: 14 }}>
          Your application materials have been successfully logged in our recruitment portal. You can proceed with the AI Assessment whenever you are ready.
        </p>

        {/* Action Buttons */}
        <div className="vensaira-assessment-start-actions">
          <button
            type="button"
            className="vensaira-btn-primary"
            onClick={onStartAssessment}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 11 12 14 22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1 2-2h11" />
            </svg>
            <span>Start AI Assessment</span>
          </button>

          <button
            type="button"
            className="vensaira-btn-secondary"
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
    </div>
  );
}

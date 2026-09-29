export default function ApplicationSuccess({
  applicationId,
  candidate,
  onStartAssessment,
  onViewStatus,
  onBackToChat
}) {
  return (
    <div className="vensaira-success-screen cb-fade-in">
      <div className="vensaira-success-icon-wrap" aria-hidden="true">
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      </div>

      <h3 className="vensaira-success-title">Application Submitted Successfully</h3>

      <div className="vensaira-app-id-badge">
        <span className="vensaira-badge-label">Application ID:</span>
        <span className="vensaira-badge-val">{applicationId}</span>
      </div>

      <p className="vensaira-success-message">
        Thank you for applying to Vensaira AI. Your application has been received. You can now continue to the next stage of the recruitment process.
      </p>

      {candidate && (
        <div className="vensaira-success-meta">
          <div className="vensaira-meta-row">
            <span>Candidate:</span>
            <strong>{candidate.firstName} {candidate.lastName}</strong>
          </div>
          <div className="vensaira-meta-row">
            <span>Email:</span>
            <strong>{candidate.email}</strong>
          </div>
          <div className="vensaira-meta-row">
            <span>Position:</span>
            <strong>{candidate.appliedRole || 'Software Engineer'}</strong>
          </div>
        </div>
      )}

      <div className="vensaira-success-actions">
        <button
          type="button"
          className="vensaira-btn-primary"
          onClick={onStartAssessment}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 11 12 14 22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
          <span>Start AI Assessment</span>
        </button>

        <button
          type="button"
          className="vensaira-btn-secondary"
          onClick={onViewStatus}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <span>View Application Status</span>
        </button>

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

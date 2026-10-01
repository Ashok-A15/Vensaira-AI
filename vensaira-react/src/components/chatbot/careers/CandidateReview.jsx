/**
 * Vensaira AI Assistant — CandidateReview Component
 * Candidate Application review screen before final submission.
 * Designed with a scrollable candidate information area and a fixed, non-scrolling bottom action bar.
 */

export default function CandidateReview({
  formData,
  onEditField,
  onBack,
  onSubmit,
  isSubmitting,
  submitError
}) {
  return (
    <div className="vensaira-review-view cb-fade-in">
      {/* Scrollable Candidate Information Area */}
      <div className="vensaira-review-scroll-container">
        <div className="vensaira-review-header">
          <h3 className="vensaira-review-title">Application Review</h3>
          <p className="vensaira-review-subtitle">
            Please review your information before continuing.
          </p>
        </div>

        {/* 1. Job Information */}
        <div className="vensaira-review-section">
          <div className="vensaira-review-section-title">JOB INFORMATION</div>
          <div className="vensaira-review-table">
            <div className="vensaira-review-row">
              <span className="vensaira-review-label">Applied Role</span>
              <span className="vensaira-review-value">{formData.appliedRole || 'Software Engineer'}</span>
            </div>
            <div className="vensaira-review-row">
              <span className="vensaira-review-label">Department</span>
              <span className="vensaira-review-value">Engineering & AI Solutions</span>
            </div>
          </div>
        </div>

        {/* 2. Personal Information */}
        <div className="vensaira-review-section">
          <div className="vensaira-review-section-title">PERSONAL INFORMATION</div>
          <div className="vensaira-review-table">
            <div className="vensaira-review-row">
              <div className="vensaira-review-row-header">
                <span className="vensaira-review-label">First Name</span>
                <button
                  type="button"
                  className="vensaira-btn-edit"
                  onClick={() => onEditField('firstName', 1)}
                  aria-label="Edit first name"
                >
                  Edit
                </button>
              </div>
              <div className="vensaira-review-value">{formData.firstName || '—'}</div>
            </div>

            <div className="vensaira-review-row">
              <div className="vensaira-review-row-header">
                <span className="vensaira-review-label">Last Name</span>
                <button
                  type="button"
                  className="vensaira-btn-edit"
                  onClick={() => onEditField('lastName', 2)}
                  aria-label="Edit last name"
                >
                  Edit
                </button>
              </div>
              <div className="vensaira-review-value">{formData.lastName || '—'}</div>
            </div>
          </div>
        </div>

        {/* 3. Contact Information */}
        <div className="vensaira-review-section">
          <div className="vensaira-review-section-title">CONTACT INFORMATION</div>
          <div className="vensaira-review-table">
            <div className="vensaira-review-row">
              <div className="vensaira-review-row-header">
                <span className="vensaira-review-label">Email</span>
                <button
                  type="button"
                  className="vensaira-btn-edit"
                  onClick={() => onEditField('email', 3)}
                  aria-label="Edit email"
                >
                  Edit
                </button>
              </div>
              <div className="vensaira-review-value">{formData.email || '—'}</div>
            </div>
          </div>
        </div>

        {/* 4. Experience & Education */}
        <div className="vensaira-review-section">
          <div className="vensaira-review-section-title">EXPERIENCE & EDUCATION</div>
          <div className="vensaira-review-table">
            <div className="vensaira-review-row">
              <div className="vensaira-review-row-header">
                <span className="vensaira-review-label">Experience</span>
                <button
                  type="button"
                  className="vensaira-btn-edit"
                  onClick={() => onEditField('experience', 4)}
                  aria-label="Edit experience"
                >
                  Edit
                </button>
              </div>
              <div className="vensaira-review-value">{formData.experience || '—'}</div>
            </div>

            <div className="vensaira-review-row">
              <div className="vensaira-review-row-header">
                <span className="vensaira-review-label">Education</span>
                <button
                  type="button"
                  className="vensaira-btn-edit"
                  onClick={() => onEditField('education', 5)}
                  aria-label="Edit education"
                >
                  Edit
                </button>
              </div>
              <div className="vensaira-review-value">{formData.education || '—'}</div>
            </div>
          </div>
        </div>

        {/* 5. Skills */}
        <div className="vensaira-review-section">
          <div className="vensaira-review-section-title">SKILLS</div>
          <div className="vensaira-review-table">
            <div className="vensaira-review-row">
              <div className="vensaira-review-row-header">
                <span className="vensaira-review-label">Technical Skills</span>
                <button
                  type="button"
                  className="vensaira-btn-edit"
                  onClick={() => onEditField('skills', 6)}
                  aria-label="Edit skills"
                >
                  Edit
                </button>
              </div>
              <div className="vensaira-review-value">
                {Array.isArray(formData.skills) && formData.skills.length > 0
                  ? formData.skills.join(', ')
                  : 'None specified'}
              </div>
            </div>
          </div>
        </div>

        {/* 6. Relocation */}
        <div className="vensaira-review-section">
          <div className="vensaira-review-section-title">RELOCATION</div>
          <div className="vensaira-review-table">
            <div className="vensaira-review-row">
              <div className="vensaira-review-row-header">
                <span className="vensaira-review-label">Willing to Relocate</span>
                <button
                  type="button"
                  className="vensaira-btn-edit"
                  onClick={() => onEditField('relocation', 7)}
                  aria-label="Edit relocation"
                >
                  Edit
                </button>
              </div>
              <div className="vensaira-review-value">{formData.relocation || '—'}</div>
            </div>

            {formData.relocation === 'Yes' && (
              <div className="vensaira-review-row">
                <div className="vensaira-review-row-header">
                  <span className="vensaira-review-label">Preferred Location</span>
                  <button
                    type="button"
                    className="vensaira-btn-edit"
                    onClick={() => onEditField('relocationLocation', 8)}
                    aria-label="Edit preferred location"
                  >
                    Edit
                  </button>
                </div>
                <div className="vensaira-review-value">{formData.relocationLocation || 'Not specified'}</div>
              </div>
            )}
          </div>
        </div>

        {/* 7. Resume */}
        <div className="vensaira-review-section">
          <div className="vensaira-review-section-title">RESUME</div>
          <div className="vensaira-review-table">
            <div className="vensaira-review-row">
              <div className="vensaira-review-row-header">
                <span className="vensaira-review-label">Uploaded File</span>
                <button
                  type="button"
                  className="vensaira-btn-edit"
                  onClick={() => onEditField('resume', 9)}
                  aria-label="Edit resume"
                >
                  Edit
                </button>
              </div>
              <div className="vensaira-review-value">
                {formData.resume?.name ? (
                  <span className="vensaira-review-file-badge">
                    📄 {formData.resume.name}
                  </span>
                ) : (
                  'Uploaded'
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 8. LinkedIn */}
        <div className="vensaira-review-section">
          <div className="vensaira-review-section-title">LINKEDIN</div>
          <div className="vensaira-review-table">
            <div className="vensaira-review-row">
              <div className="vensaira-review-row-header">
                <span className="vensaira-review-label">LinkedIn Profile</span>
                <button
                  type="button"
                  className="vensaira-btn-edit"
                  onClick={() => onEditField('linkedin', 10)}
                  aria-label="Edit LinkedIn profile"
                >
                  Edit
                </button>
              </div>
              <div className="vensaira-review-value">{formData.linkedin || 'Not provided'}</div>
            </div>
          </div>
        </div>

        {/* Error notification if submission failed */}
        {submitError && (
          <div className="vensaira-step-error vensaira-review-error-banner" role="alert">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{submitError}</span>
          </div>
        )}

        {/* Spacer so the last field is never obscured by the bottom action bar */}
        <div className="vensaira-review-bottom-spacer" aria-hidden="true" />
      </div>

      {/* Fixed/Sticky Bottom Action Bar — ALWAYS fully visible outside scrolling content */}
      <div className="vensaira-review-action-bar">
        <button
          type="button"
          className="vensaira-btn-outline vensaira-review-action-back"
          onClick={onBack}
          disabled={isSubmitting}
          aria-label="Return to previous step"
        >
          ← Back
        </button>

        <button
          type="button"
          className="vensaira-step-submit-btn vensaira-review-action-submit"
          disabled={isSubmitting}
          onClick={onSubmit}
          aria-label={submitError ? 'Try again to submit application' : 'Submit Application'}
        >
          {isSubmitting ? (
            <span className="vensaira-btn-content-loading">
              <span className="vensaira-btn-spinner" aria-hidden="true" />
              <span>Submitting application...</span>
            </span>
          ) : submitError ? (
            'Try Again →'
          ) : (
            'Continue to Submit →'
          )}
        </button>
      </div>
    </div>
  );
}

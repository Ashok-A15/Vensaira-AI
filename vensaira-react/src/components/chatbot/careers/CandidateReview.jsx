/**
 * Vensaira AI Assistant — CandidateReview Component
 * Candidate Application review screen before final submission.
 */

export default function CandidateReview({
  formData,
  onEditField,
  onSubmit,
  isSubmitting,
  submitError
}) {
  return (
    <div className="vensaira-review-card cb-fade-in">
      <div className="vensaira-review-header">
        <h3 className="vensaira-review-title">Review your application</h3>
        <p className="vensaira-review-subtitle">
          Please verify your details before submitting your application.
        </p>
      </div>

      <div className="vensaira-review-section">
        <div className="vensaira-review-section-title">JOB INFORMATION</div>
        <div className="vensaira-review-table">
          <div className="vensaira-review-row">
            <span className="vensaira-review-label">Applied Role</span>
            <span className="vensaira-review-value">{formData.appliedRole}</span>
          </div>
          <div className="vensaira-review-row">
            <span className="vensaira-review-label">Department</span>
            <span className="vensaira-review-value">Engineering & AI Solutions</span>
          </div>
        </div>
      </div>

      <div className="vensaira-review-section">
        <div className="vensaira-review-section-title">CANDIDATE INFORMATION</div>
        <div className="vensaira-review-table">
          <div className="vensaira-review-row">
            <div className="vensaira-review-row-header">
              <span className="vensaira-review-label">First Name</span>
              <button
                type="button"
                className="vensaira-btn-edit"
                onClick={() => onEditField('firstName', 1)}
              >
                Edit
              </button>
            </div>
            <div className="vensaira-review-value">{formData.firstName}</div>
          </div>

          <div className="vensaira-review-row">
            <div className="vensaira-review-row-header">
              <span className="vensaira-review-label">Last Name</span>
              <button
                type="button"
                className="vensaira-btn-edit"
                onClick={() => onEditField('lastName', 2)}
              >
                Edit
              </button>
            </div>
            <div className="vensaira-review-value">{formData.lastName}</div>
          </div>

          <div className="vensaira-review-row">
            <div className="vensaira-review-row-header">
              <span className="vensaira-review-label">Email</span>
              <button
                type="button"
                className="vensaira-btn-edit"
                onClick={() => onEditField('email', 3)}
              >
                Edit
              </button>
            </div>
            <div className="vensaira-review-value">{formData.email}</div>
          </div>

          <div className="vensaira-review-row">
            <div className="vensaira-review-row-header">
              <span className="vensaira-review-label">Experience</span>
              <button
                type="button"
                className="vensaira-btn-edit"
                onClick={() => onEditField('experience', 4)}
              >
                Edit
              </button>
            </div>
            <div className="vensaira-review-value">{formData.experience}</div>
          </div>

          <div className="vensaira-review-row">
            <div className="vensaira-review-row-header">
              <span className="vensaira-review-label">Education</span>
              <button
                type="button"
                className="vensaira-btn-edit"
                onClick={() => onEditField('education', 5)}
              >
                Edit
              </button>
            </div>
            <div className="vensaira-review-value">{formData.education}</div>
          </div>

          <div className="vensaira-review-row">
            <div className="vensaira-review-row-header">
              <span className="vensaira-review-label">Skills</span>
              <button
                type="button"
                className="vensaira-btn-edit"
                onClick={() => onEditField('skills', 6)}
              >
                Edit
              </button>
            </div>
            <div className="vensaira-review-value">
              {Array.isArray(formData.skills) ? formData.skills.join(', ') : formData.skills}
            </div>
          </div>

          <div className="vensaira-review-row">
            <div className="vensaira-review-row-header">
              <span className="vensaira-review-label">Relocation</span>
              <button
                type="button"
                className="vensaira-btn-edit"
                onClick={() => onEditField('relocation', 7)}
              >
                Edit
              </button>
            </div>
            <div className="vensaira-review-value">{formData.relocation}</div>
          </div>

          {formData.relocation === 'Yes' && (
            <div className="vensaira-review-row">
              <div className="vensaira-review-row-header">
                <span className="vensaira-review-label">Preferred Location</span>
                <button
                  type="button"
                  className="vensaira-btn-edit"
                  onClick={() => onEditField('relocationLocation', 8)}
                >
                  Edit
                </button>
              </div>
              <div className="vensaira-review-value">{formData.relocationLocation}</div>
            </div>
          )}

          <div className="vensaira-review-row">
            <div className="vensaira-review-row-header">
              <span className="vensaira-review-label">Resume</span>
              <button
                type="button"
                className="vensaira-btn-edit"
                onClick={() => onEditField('resume', 9)}
              >
                Edit
              </button>
            </div>
            <div className="vensaira-review-value">{formData.resume?.name || 'Uploaded'}</div>
          </div>

          <div className="vensaira-review-row">
            <div className="vensaira-review-row-header">
              <span className="vensaira-review-label">LinkedIn</span>
              <button
                type="button"
                className="vensaira-btn-edit"
                onClick={() => onEditField('linkedin', 10)}
              >
                Edit
              </button>
            </div>
            <div className="vensaira-review-value">{formData.linkedin || 'Not provided'}</div>
          </div>
        </div>
      </div>

      {submitError && (
        <div className="vensaira-step-error" style={{ marginTop: '12px' }}>
          {submitError}
        </div>
      )}

      <div className="vensaira-review-actions">
        <button
          type="button"
          className="vensaira-step-submit-btn"
          disabled={isSubmitting}
          onClick={onSubmit}
        >
          {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
        </button>
      </div>
    </div>
  );
}

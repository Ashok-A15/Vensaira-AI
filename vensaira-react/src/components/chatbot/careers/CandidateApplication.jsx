/**
 * Vensaira AI Assistant — CandidateApplication Component
 * Multi-step candidate job application flow.
 */

import { useState } from 'react';
import { useCandidateApplication } from '../hooks/useCandidateApplication';
import FileUpload from '../components/FileUpload';
import CandidateReview from './CandidateReview';
import {
  SKILL_OPTIONS,
  EXPERIENCE_OPTIONS,
  EDUCATION_OPTIONS,
  LOCATION_OPTIONS
} from '../constants/chatbotConfig';

export default function CandidateApplication({
  onSubmitted,
  onCancel,
  onBackToIntro
}) {
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const {
    currentStep,
    setCurrentStep,
    editingField,
    formData,
    inputVal,
    setInputVal,
    inputError,
    setInputError,
    selectedSkills,
    otherSkillText,
    setOtherSkillText,
    isSubmitting,
    submitError,
    handleFirstNameSubmit,
    handleLastNameSubmit,
    handleEmailSubmit,
    handleExperienceSelect,
    handleEducationSelect,
    toggleSkill,
    handleSkillsSubmit,
    handleRelocationSelect,
    handleLocationSelect,
    setResumeData,
    handleRemoveResume,
    handleResumeContinue,
    handleLinkedInChoice,
    handleLinkedInUrlSubmit,
    handleEditField,
    handleFinalSubmit,
    resetApplication
  } = useCandidateApplication({ onSubmitted });

  // Robust back navigation preserving candidate data across all branches
  const handleBackNavigation = () => {
    if (editingField) {
      handleEditField(null, 11);
    } else if (currentStep > 1) {
      if (currentStep === 11) {
        if (formData.linkedinChoice === 'Yes') {
          setCurrentStep(10.5);
        } else {
          setCurrentStep(10);
        }
      } else if (currentStep === 10.5) {
        setCurrentStep(10);
      } else if (currentStep === 10) {
        setCurrentStep(9);
      } else if (currentStep === 9) {
        if (formData.relocation === 'No') {
          setCurrentStep(7);
        } else {
          setCurrentStep(8);
        }
      } else {
        setCurrentStep(currentStep - 1);
      }
    } else {
      onBackToIntro();
    }
  };

  const handleConfirmCancel = () => {
    setShowCancelConfirm(false);
    resetApplication();
    onCancel();
  };

  return (
    <div className="vensaira-app-flow cb-fade-in">
      {/* Cancel Confirmation Modal */}
      {showCancelConfirm && (
        <div className="vensaira-confirm-overlay cb-fade-in" role="alertdialog" aria-modal="true" aria-label="Cancel Application Confirmation">
          <div className="vensaira-confirm-card">
            <div className="vensaira-confirm-icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h4 className="vensaira-confirm-title">Cancel Application?</h4>
            <p className="vensaira-confirm-desc">
              Are you sure you want to leave your application? Your current progress may be lost.
            </p>
            <div className="vensaira-confirm-actions">
              <button
                type="button"
                className="vensaira-btn-outline"
                onClick={() => setShowCancelConfirm(false)}
              >
                Continue Application
              </button>
              <button
                type="button"
                className="vensaira-btn-primary vensaira-btn-danger"
                onClick={handleConfirmCancel}
              >
                Cancel Application
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top flow indicator */}
      <div className="vensaira-flow-header">
        <button
          type="button"
          className="vensaira-flow-back-btn"
          onClick={handleBackNavigation}
          aria-label="Back"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span>Back</span>
        </button>

        <span className="vensaira-flow-step-label">
          {editingField
            ? `Editing ${editingField}`
            : currentStep === 11
            ? 'Application Review'
            : `Step ${currentStep} of 10`}
        </span>

        <button
          type="button"
          className="vensaira-flow-cancel-btn"
          onClick={() => setShowCancelConfirm(true)}
          title="Cancel Application"
        >
          Cancel
        </button>
      </div>

      {currentStep === 11 ? (
        <CandidateReview
          formData={formData}
          onEditField={handleEditField}
          onBack={handleBackNavigation}
          onSubmit={handleFinalSubmit}
          isSubmitting={isSubmitting}
          submitError={submitError}
        />
      ) : (
        <div className="vensaira-flow-body">
        {/* Step 1: First Name */}
        {currentStep === 1 && (
          <div className="vensaira-step-card cb-fade-in">
            <div className="vensaira-step-prompt">What is your first name?</div>
            <form onSubmit={handleFirstNameSubmit} className="vensaira-step-form">
              <input
                type="text"
                className="vensaira-step-input"
                placeholder="Enter your first name"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                autoFocus
                aria-label="First Name"
              />
              {inputError && <div className="vensaira-step-error">{inputError}</div>}
              <button type="submit" className="vensaira-step-submit-btn">Continue</button>
            </form>
          </div>
        )}

        {/* Step 2: Last Name */}
        {currentStep === 2 && (
          <div className="vensaira-step-card cb-fade-in">
            <div className="vensaira-step-prompt">What is your last name?</div>
            <form onSubmit={handleLastNameSubmit} className="vensaira-step-form">
              <input
                type="text"
                className="vensaira-step-input"
                placeholder="Enter your last name"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                autoFocus
                aria-label="Last Name"
              />
              {inputError && <div className="vensaira-step-error">{inputError}</div>}
              <button type="submit" className="vensaira-step-submit-btn">Continue</button>
            </form>
          </div>
        )}

        {/* Step 3: Email Input -> Advances directly without OTP */}
        {currentStep === 3 && (
          <div className="vensaira-step-card cb-fade-in">
            <div className="vensaira-step-prompt">What is your email address?</div>
            <form onSubmit={handleEmailSubmit} className="vensaira-step-form">
              <input
                type="email"
                className="vensaira-step-input"
                placeholder="candidate@example.com"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                autoFocus
                aria-label="Email Address"
              />
              {inputError && <div className="vensaira-step-error">{inputError}</div>}
              <button type="submit" className="vensaira-step-submit-btn">
                Continue
              </button>
            </form>
          </div>
        )}

        {/* Step 4: Experience */}
        {currentStep === 4 && (
          <div className="vensaira-step-card cb-fade-in">
            <div className="vensaira-step-prompt">How many years of experience do you have?</div>
            <div className="vensaira-options-grid">
              {EXPERIENCE_OPTIONS.map((exp) => (
                <button
                  key={exp}
                  type="button"
                  className={`vensaira-option-pill ${formData.experience === exp ? 'selected' : ''}`}
                  onClick={() => handleExperienceSelect(exp)}
                >
                  {exp}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Education */}
        {currentStep === 5 && (
          <div className="vensaira-step-card cb-fade-in">
            <div className="vensaira-step-prompt">What is your highest level of education?</div>
            <div className="vensaira-options-grid">
              {EDUCATION_OPTIONS.map((edu) => (
                <button
                  key={edu}
                  type="button"
                  className={`vensaira-option-pill ${formData.education === edu ? 'selected' : ''}`}
                  onClick={() => handleEducationSelect(edu)}
                >
                  {edu}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 6: Skills (with functional "Other" custom skill text input) */}
        {currentStep === 6 && (
          <div className="vensaira-step-card cb-fade-in">
            <div className="vensaira-step-prompt">Which skills do you have?</div>
            <p className="vensaira-step-subprompt">Select all that apply to your technical profile:</p>
            <div className="vensaira-multiselect-grid">
              {SKILL_OPTIONS.map((skill) => {
                const isSelected = selectedSkills.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    className={`vensaira-skill-pill ${isSelected ? 'selected' : ''}`}
                    onClick={() => toggleSkill(skill)}
                  >
                    <span className="vensaira-pill-check">{isSelected ? '✓' : '+'}</span>
                    <span>{skill}</span>
                  </button>
                );
              })}
            </div>

            {/* Display text input when "Other" is selected */}
            {selectedSkills.includes('Other') && (
              <div className="vensaira-other-skill-wrap cb-fade-in">
                <label className="vensaira-other-skill-label" htmlFor="cb-other-skills-input">
                  Enter your other skills:
                </label>
                <input
                  id="cb-other-skills-input"
                  type="text"
                  className="vensaira-step-input"
                  placeholder="Enter your other skills"
                  value={otherSkillText}
                  onChange={(e) => setOtherSkillText(e.target.value)}
                  autoFocus
                />
              </div>
            )}

            {inputError && <div className="vensaira-step-error">{inputError}</div>}
            <button
              type="button"
              className="vensaira-step-submit-btn"
              onClick={handleSkillsSubmit}
            >
              Continue ({selectedSkills.length} selected)
            </button>
          </div>
        )}

        {/* Step 7: Relocation */}
        {currentStep === 7 && (
          <div className="vensaira-step-card cb-fade-in">
            <div className="vensaira-step-prompt">Are you willing to relocate for this position?</div>
            <div className="vensaira-options-grid two-col">
              <button
                type="button"
                className={`vensaira-option-pill ${formData.relocation === 'Yes' ? 'selected' : ''}`}
                onClick={() => handleRelocationSelect('Yes')}
              >
                Yes
              </button>
              <button
                type="button"
                className={`vensaira-option-pill ${formData.relocation === 'No' ? 'selected' : ''}`}
                onClick={() => handleRelocationSelect('No')}
              >
                No
              </button>
            </div>
          </div>
        )}

        {/* Step 8: Relocation Location */}
        {currentStep === 8 && (
          <div className="vensaira-step-card cb-fade-in">
            <div className="vensaira-step-prompt">Which location(s) are you open to relocating to?</div>
            <div className="vensaira-options-grid">
              {LOCATION_OPTIONS.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  className={`vensaira-option-pill ${formData.relocationLocation === loc ? 'selected' : ''}`}
                  onClick={() => handleLocationSelect(loc)}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 9: Resume Upload */}
        {currentStep === 9 && (
          <div className="vensaira-step-card cb-fade-in">
            <div className="vensaira-step-prompt">Please upload your latest resume.</div>
            <p className="vensaira-step-subprompt">Supported formats: PDF, DOC, DOCX (Max 5 MB)</p>

            <FileUpload
              file={formData.resume}
              onFileSelect={setResumeData}
              onFileRemove={handleRemoveResume}
              onError={setInputError}
            />

            {inputError && <div className="vensaira-step-error">{inputError}</div>}
            <button
              type="button"
              className="vensaira-step-submit-btn"
              disabled={!formData.resume}
              onClick={handleResumeContinue}
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 10: LinkedIn Choice */}
        {currentStep === 10 && (
          <div className="vensaira-step-card cb-fade-in">
            <div className="vensaira-step-prompt">Do you have a LinkedIn profile you would like to share?</div>
            <div className="vensaira-options-grid two-col">
              <button
                type="button"
                className={`vensaira-option-pill ${formData.linkedinChoice === 'Yes' ? 'selected' : ''}`}
                onClick={() => handleLinkedInChoice('Yes')}
              >
                Yes
              </button>
              <button
                type="button"
                className={`vensaira-option-pill ${formData.linkedinChoice === 'No' ? 'selected' : ''}`}
                onClick={() => handleLinkedInChoice('No')}
              >
                No
              </button>
            </div>
          </div>
        )}

        {/* Step 10.5: LinkedIn URL */}
        {currentStep === 10.5 && (
          <div className="vensaira-step-card cb-fade-in">
            <div className="vensaira-step-prompt">Please provide your LinkedIn profile URL:</div>
            <form onSubmit={handleLinkedInUrlSubmit} className="vensaira-step-form">
              <input
                type="url"
                className="vensaira-step-input"
                placeholder="https://linkedin.com/in/username"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                autoFocus
                aria-label="LinkedIn URL"
              />
              {inputError && <div className="vensaira-step-error">{inputError}</div>}
              <button type="submit" className="vensaira-step-submit-btn">Review Application</button>
            </form>
          </div>
        )}

        </div>
      )}
    </div>
  );
}

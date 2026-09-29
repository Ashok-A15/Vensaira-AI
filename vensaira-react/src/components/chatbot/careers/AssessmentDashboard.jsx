/**
 * Vensaira AI Assistant — AssessmentDashboard Component
 * Candidate Assessment Center dashboard for managing technical assessments and AI voice interview stages.
 */

import { useState } from 'react';

export default function AssessmentDashboard({
  candidate,
  assessment,
  interview,
  onStartTechnicalAssessment,
  onStartVoiceInterview,
  onBack,
  initialTab = 'overview'
}) {
  const [activeTab, setActiveTab] = useState(initialTab);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <span className="vensaira-status-badge completed">✓ Completed</span>;
      case 'in_progress':
        return <span className="vensaira-status-badge in-progress">⏳ In Progress</span>;
      default:
        return <span className="vensaira-status-badge not-started">Not Started</span>;
    }
  };

  const candidateName = candidate
    ? `${candidate.firstName || ''} ${candidate.lastName || ''}`.trim() || 'Candidate'
    : 'Candidate';

  return (
    <div className="vensaira-dashboard cb-fade-in">
      {/* Dashboard Header */}
      <div className="vensaira-dash-top">
        <button
          type="button"
          className="vensaira-dash-back-btn"
          onClick={onBack}
          aria-label="Back"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span>Back</span>
        </button>
        <h3 className="vensaira-dash-header-title">Candidate Assessment Center</h3>
      </div>

      {/* Navigation Tabs */}
      <div className="vensaira-dash-nav" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'overview'}
          className={`vensaira-dash-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'assessment'}
          className={`vensaira-dash-tab ${activeTab === 'assessment' ? 'active' : ''}`}
          onClick={() => setActiveTab('assessment')}
        >
          Technical Assessment
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'interview'}
          className={`vensaira-dash-tab ${activeTab === 'interview' ? 'active' : ''}`}
          onClick={() => setActiveTab('interview')}
        >
          AI Voice Interview
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'results'}
          className={`vensaira-dash-tab ${activeTab === 'results' ? 'active' : ''}`}
          onClick={() => setActiveTab('results')}
        >
          Results
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'status'}
          className={`vensaira-dash-tab ${activeTab === 'status' ? 'active' : ''}`}
          onClick={() => setActiveTab('status')}
        >
          Application Status
        </button>
      </div>

      <div className="vensaira-dash-content">
        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="vensaira-tab-pane cb-fade-in">
            {/* Application Overview Card */}
            <div className="vensaira-card">
              <div className="vensaira-card-header">
                <span className="vensaira-card-eyebrow">STAGE 1 — APPLICATION OVERVIEW</span>
                <h4 className="vensaira-card-title">{candidateName}</h4>
              </div>

              <div className="vensaira-card-grid">
                <div className="vensaira-grid-cell">
                  <span className="vensaira-cell-label">Applied Position</span>
                  <span className="vensaira-cell-val">{candidate?.appliedRole || 'Software Engineer'}</span>
                </div>
                <div className="vensaira-grid-cell">
                  <span className="vensaira-cell-label">Application ID</span>
                  <span className="vensaira-cell-val code">{candidate?.applicationId || 'N/A'}</span>
                </div>
                <div className="vensaira-grid-cell">
                  <span className="vensaira-cell-label">Application Status</span>
                  <span className="vensaira-cell-val">
                    <span className="vensaira-status-badge completed">Submitted</span>
                  </span>
                </div>
                <div className="vensaira-grid-cell">
                  <span className="vensaira-cell-label">Assessment Status</span>
                  <span className="vensaira-cell-val">
                    {getStatusBadge(assessment?.status || 'not_started')}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions to Stages */}
            <div className="vensaira-overview-stages">
              {/* Technical Assessment Card */}
              <div className="vensaira-card stage-card">
                <div className="vensaira-card-badge">Step 1 of 2</div>
                <h4 className="vensaira-card-title">Technical Skills Assessment</h4>
                <p className="vensaira-card-desc">
                  Evaluate your technical knowledge and problem-solving skills through a role-specific assessment.
                </p>
                <div className="vensaira-meta-pills">
                  <span className="vensaira-meta-pill">5 Questions</span>
                  <span className="vensaira-meta-pill">10 Min Limit</span>
                  <span className="vensaira-meta-pill">Data Structures & Architecture</span>
                </div>
                <div className="vensaira-stage-footer">
                  <div>Status: {getStatusBadge(assessment?.status || 'not_started')}</div>
                  {assessment?.status === 'completed' ? (
                    <button
                      type="button"
                      className="vensaira-btn-outline"
                      onClick={() => setActiveTab('results')}
                    >
                      View Results
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="vensaira-btn-primary"
                      onClick={onStartTechnicalAssessment}
                    >
                      Start Assessment
                    </button>
                  )}
                </div>
              </div>

              {/* AI Voice Interview Card */}
              <div className="vensaira-card stage-card">
                <div className="vensaira-card-badge">Step 2 of 2</div>
                <h4 className="vensaira-card-title">AI Voice Interview</h4>
                <p className="vensaira-card-desc">
                  Participate in an AI-powered voice interview designed to understand your experience, technical knowledge, communication, and problem-solving approach.
                </p>
                <div className="vensaira-meta-pills">
                  <span className="vensaira-meta-pill">Voice & Text</span>
                  <span className="vensaira-meta-pill">4 Questions</span>
                  <span className="vensaira-meta-pill">Interactive AI Assistant</span>
                </div>
                <div className="vensaira-stage-footer">
                  <div>Status: {getStatusBadge(interview?.status || 'not_started')}</div>
                  {interview?.status === 'completed' ? (
                    <button
                      type="button"
                      className="vensaira-btn-outline"
                      onClick={() => setActiveTab('results')}
                    >
                      View Interview Summary
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="vensaira-btn-primary"
                      onClick={onStartVoiceInterview}
                    >
                      Start AI Interview
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Technical Assessment Card */}
        {activeTab === 'assessment' && (
          <div className="vensaira-tab-pane cb-fade-in">
            <div className="vensaira-card">
              <div className="vensaira-card-header">
                <span className="vensaira-card-eyebrow">ASSESSMENT CENTER</span>
                <h4 className="vensaira-card-title">Technical Skills Assessment</h4>
                <p className="vensaira-card-desc">
                  Evaluate your technical knowledge and problem-solving skills through a role-specific assessment.
                </p>
              </div>

              <div className="vensaira-instructions-box">
                <h5 className="vensaira-box-heading">Assessment Instructions</h5>
                <ul className="vensaira-instructions-list">
                  <li>This assessment consists of <strong>5 role-specific questions</strong> covering core programming fundamentals, data structures, algorithms, and software architecture.</li>
                  <li>Configured time limit: <strong>10 minutes</strong>.</li>
                  <li>Select the single best answer for each multiple-choice question.</li>
                  <li>Your calculated score and detailed explanations will be provided immediately upon submission.</li>
                  <li>Assessment results serve as decision-support information for our human recruitment team.</li>
                </ul>
              </div>

              <div className="vensaira-status-row">
                <span>Current Status:</span>
                {getStatusBadge(assessment?.status || 'not_started')}
              </div>

              {assessment?.status === 'completed' ? (
                <div className="vensaira-completed-actions">
                  <div className="vensaira-score-display">
                    Score: <strong>{assessment.score} / {assessment.totalQuestions} ({assessment.percentage}%)</strong>
                  </div>
                  <button
                    type="button"
                    className="vensaira-btn-primary"
                    onClick={() => setActiveTab('results')}
                  >
                    View Detailed Results & Explanations
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="vensaira-btn-primary full-width"
                  onClick={onStartTechnicalAssessment}
                >
                  Start Assessment Now
                </button>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: AI Voice Interview Card */}
        {activeTab === 'interview' && (
          <div className="vensaira-tab-pane cb-fade-in">
            <div className="vensaira-card">
              <div className="vensaira-card-header">
                <span className="vensaira-card-eyebrow">INTERVIEW CENTER</span>
                <h4 className="vensaira-card-title">AI Voice Interview</h4>
                <p className="vensaira-card-desc">
                  Participate in an AI-powered voice interview designed to understand your experience, technical knowledge, communication, and problem-solving approach.
                </p>
              </div>

              <div className="vensaira-instructions-box">
                <h5 className="vensaira-box-heading">Interview Instructions</h5>
                <ul className="vensaira-instructions-list">
                  <li>The AI Interview Assistant will ask one question at a time using spoken audio and text.</li>
                  <li>You can answer using your microphone or the text fallback area.</li>
                  <li>Please grant browser microphone permission when requested.</li>
                  <li>Audio input and output controls let you listen, pause, resume, or replay each question.</li>
                  <li>The AI interviewer is an intelligent assistant and does not claim to be a human recruiter.</li>
                </ul>
              </div>

              <div className="vensaira-status-row">
                <span>Interview Status:</span>
                {getStatusBadge(interview?.status || 'not_started')}
              </div>

              {interview?.status === 'completed' ? (
                <div className="vensaira-completed-actions">
                  <p className="vensaira-completed-note">
                    Your interview transcript and evaluated skills have been recorded.
                  </p>
                  <button
                    type="button"
                    className="vensaira-btn-primary"
                    onClick={() => setActiveTab('results')}
                  >
                    View Interview Summary & Feedback
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="vensaira-btn-primary full-width"
                  onClick={onStartVoiceInterview}
                >
                  Start AI Voice Interview
                </button>
              )}
            </div>
          </div>
        )}

        {/* Tab 4: Results */}
        {activeTab === 'results' && (
          <div className="vensaira-tab-pane cb-fade-in">
            {/* Technical Assessment Results */}
            <div className="vensaira-card">
              <h4 className="vensaira-card-title">Technical Assessment Results</h4>
              {assessment?.status === 'completed' ? (
                <div className="vensaira-results-body">
                  <div className="vensaira-score-banner">
                    <div className="vensaira-score-circle">
                      <span className="vensaira-score-num">{assessment.percentage}%</span>
                      <span className="vensaira-score-label">Score</span>
                    </div>
                    <div className="vensaira-score-summary">
                      <div className="vensaira-score-count">
                        <strong>{assessment.score}</strong> of <strong>{assessment.totalQuestions}</strong> questions answered correctly.
                      </div>
                      <p className="vensaira-score-feedback">{assessment.feedback}</p>
                    </div>
                  </div>

                  {/* Answers review */}
                  <div className="vensaira-qa-list">
                    <h5 className="vensaira-qa-heading">Questions & Answers Review</h5>
                    {assessment.questions?.map((q, idx) => {
                      const userAns = assessment.answers?.find((a) => a.questionId === q.id);
                      const isCorrect = userAns ? userAns.isCorrect : false;
                      return (
                        <div key={q.id} className={`vensaira-qa-item ${isCorrect ? 'correct' : 'incorrect'}`}>
                          <div className="vensaira-qa-item-header">
                            <span className="vensaira-qa-idx">Q{idx + 1}</span>
                            <span className="vensaira-qa-cat">{q.category}</span>
                            <span className={`vensaira-qa-badge ${isCorrect ? 'correct' : 'incorrect'}`}>
                              {isCorrect ? '✓ Correct' : '✕ Incorrect'}
                            </span>
                          </div>
                          <div className="vensaira-qa-text">{q.question}</div>
                          <div className="vensaira-qa-user-ans">
                            <strong>Your Answer:</strong> {userAns ? q.options[userAns.selectedAnswer] : 'No answer'}
                          </div>
                          {!isCorrect && (
                            <div className="vensaira-qa-correct-ans">
                              <strong>Correct Answer:</strong> {q.options[q.correctAnswer]}
                            </div>
                          )}
                          {q.explanation && (
                            <div className="vensaira-qa-explanation">
                              <em>Explanation:</em> {q.explanation}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="vensaira-empty-state">
                  <p>Technical assessment has not been completed yet.</p>
                  <button
                    type="button"
                    className="vensaira-btn-primary"
                    onClick={onStartTechnicalAssessment}
                  >
                    Take Assessment
                  </button>
                </div>
              )}
            </div>

            {/* AI Voice Interview Results */}
            <div className="vensaira-card" style={{ marginTop: '16px' }}>
              <h4 className="vensaira-card-title">AI Voice Interview Summary</h4>
              {interview?.status === 'completed' ? (
                <div className="vensaira-interview-results-body">
                  <div className="vensaira-interview-summary-card">
                    <div className="vensaira-summary-title">Interview Summary</div>
                    <p className="vensaira-summary-text">{interview.summary}</p>
                  </div>

                  {interview.skillsEvaluated && interview.skillsEvaluated.length > 0 && (
                    <div className="vensaira-skills-eval-section">
                      <h5 className="vensaira-qa-heading">Evaluated Competencies</h5>
                      <div className="vensaira-skills-eval-grid">
                        {interview.skillsEvaluated.map((skillItem, i) => (
                          <div key={i} className="vensaira-skill-eval-card">
                            <div className="vensaira-skill-eval-header">
                              <span className="vensaira-skill-name">{skillItem.skill}</span>
                              <span className="vensaira-skill-rating">{skillItem.rating}</span>
                            </div>
                            <div className="vensaira-skill-assessment">{skillItem.assessment}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {interview.feedback && (
                    <div className="vensaira-feedback-section">
                      <div className="vensaira-feedback-block">
                        <h6 className="vensaira-fb-title strengths">Strengths Demonstrated</h6>
                        <ul>
                          {interview.feedback.strengths?.map((s, idx) => (
                            <li key={idx}>{s}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="vensaira-feedback-block">
                        <h6 className="vensaira-fb-title suggestions">Areas for Improvement</h6>
                        <ul>
                          {interview.feedback.areasOfImprovement?.map((a, idx) => (
                            <li key={idx}>{a}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  <div className="vensaira-next-steps-notice">
                    <strong>Next Steps:</strong> {interview.feedback?.nextSteps || 'Your profile and evaluation data are being reviewed by the Vensaira recruitment team.'}
                  </div>
                </div>
              ) : (
                <div className="vensaira-empty-state">
                  <p>AI Voice Interview has not been completed yet.</p>
                  <button
                    type="button"
                    className="vensaira-btn-primary"
                    onClick={onStartVoiceInterview}
                  >
                    Start AI Interview
                  </button>
                </div>
              )}
            </div>

            <div className="vensaira-human-review-note">
              ℹ️ <strong>Recruitment Decision Support:</strong> All assessments and AI interview results provide objective decision-support context for human recruiters. No candidate is automatically rejected or selected solely through AI algorithms.
            </div>
          </div>
        )}

        {/* Tab 5: Application Status */}
        {activeTab === 'status' && (
          <div className="vensaira-tab-pane cb-fade-in">
            <div className="vensaira-card">
              <div className="vensaira-card-header">
                <span className="vensaira-card-eyebrow">STATUS TRACKER</span>
                <h4 className="vensaira-card-title">Recruitment Pipeline Progress</h4>
              </div>

              <div className="vensaira-timeline">
                <div className="vensaira-timeline-step completed">
                  <div className="vensaira-step-marker">✓</div>
                  <div className="vensaira-step-content">
                    <div className="vensaira-step-name">Application Submitted</div>
                    <div className="vensaira-step-desc">Application received and registered under ID {candidate?.applicationId}.</div>
                  </div>
                </div>

                <div className={`vensaira-timeline-step ${assessment?.status === 'completed' ? 'completed' : 'active'}`}>
                  <div className="vensaira-step-marker">{assessment?.status === 'completed' ? '✓' : '2'}</div>
                  <div className="vensaira-step-content">
                    <div className="vensaira-step-name">Technical Skills Assessment</div>
                    <div className="vensaira-step-desc">
                      {assessment?.status === 'completed'
                        ? `Completed with score of ${assessment.percentage}%.`
                        : 'Pending completion by candidate.'}
                    </div>
                  </div>
                </div>

                <div className={`vensaira-timeline-step ${interview?.status === 'completed' ? 'completed' : (assessment?.status === 'completed' ? 'active' : 'upcoming')}`}>
                  <div className="vensaira-step-marker">{interview?.status === 'completed' ? '✓' : '3'}</div>
                  <div className="vensaira-step-content">
                    <div className="vensaira-step-name">AI Voice Interview</div>
                    <div className="vensaira-step-desc">
                      {interview?.status === 'completed'
                        ? 'Completed. Transcript and evaluation summary recorded.'
                        : 'AI-assisted structured technical screening interview.'}
                    </div>
                  </div>
                </div>

                <div className={`vensaira-timeline-step ${assessment?.status === 'completed' && interview?.status === 'completed' ? 'active' : 'upcoming'}`}>
                  <div className="vensaira-step-marker">4</div>
                  <div className="vensaira-step-content">
                    <div className="vensaira-step-name">Recruiter Review & Decision</div>
                    <div className="vensaira-step-desc">
                      Human talent acquisition specialist evaluates candidate profile, resume, and assessment results.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

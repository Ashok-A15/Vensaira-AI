/**
 * Vensaira AI Assistant — AssessmentResults Component
 * Displays technical assessment scores, answers review, evaluated competencies, and interview feedback.
 */

export default function AssessmentResults({
  assessment,
  interview,
  onStartTechnicalAssessment,
  onStartVoiceInterview
}) {
  return (
    <div className="vensaira-assessment-results cb-fade-in">
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
            {onStartTechnicalAssessment && (
              <button
                type="button"
                className="vensaira-btn-primary"
                onClick={onStartTechnicalAssessment}
              >
                Take Assessment
              </button>
            )}
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
            {onStartVoiceInterview && (
              <button
                type="button"
                className="vensaira-btn-primary"
                onClick={onStartVoiceInterview}
              >
                Start AI Interview
              </button>
            )}
          </div>
        )}
      </div>

      <div className="vensaira-human-review-note">
        ℹ️ <strong>Recruitment Decision Support:</strong> All assessments and AI interview results provide objective decision-support context for human recruiters. No candidate is automatically rejected or selected solely through AI algorithms.
      </div>
    </div>
  );
}

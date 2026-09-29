/**
 * Vensaira AI Assistant — InterviewControls Component
 * Controls for advancing interview questions, toggling pause, and submitting interview session.
 */

export default function InterviewControls({
  isPaused,
  onTogglePause,
  isLastQuestion,
  isSubmitting,
  hasAnswer,
  onNextQuestion
}) {
  return (
    <div className="vensaira-interview-controls">
      <button
        type="button"
        className="vensaira-btn-outline"
        onClick={onTogglePause}
      >
        {isPaused ? 'Resume Interview' : 'Pause Interview'}
      </button>

      {isLastQuestion ? (
        <button
          type="button"
          className="vensaira-btn-primary"
          disabled={isSubmitting || !hasAnswer}
          onClick={onNextQuestion}
        >
          {isSubmitting ? 'Evaluating...' : 'Complete & Submit Interview'}
        </button>
      ) : (
        <button
          type="button"
          className="vensaira-btn-primary"
          disabled={!hasAnswer}
          onClick={onNextQuestion}
        >
          Submit Answer & Next Question →
        </button>
      )}
    </div>
  );
}

/**
 * Vensaira AI Assistant — TechnicalAssessment Component
 * Role-specific technical multiple-choice skills assessment with countdown timer and instant evaluation.
 */

import { useState, useEffect } from 'react';
import { AssessmentApi } from '../services/assessmentApi';

const DEFAULT_QUESTIONS = [
  {
    id: 1,
    category: 'Data Structures & Algorithms',
    question: 'What is the average time complexity of searching for an element in a Hash Table (Hash Map)?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    correctAnswer: 0,
    explanation: 'Hash tables offer O(1) constant average time complexity for lookups using direct key hash indexing.'
  },
  {
    id: 2,
    category: 'Software Architecture & System Design',
    question: 'Which design pattern is best suited for decoupling an abstraction from its implementation so both can vary independently?',
    options: ['Singleton Pattern', 'Bridge Pattern', 'Observer Pattern', 'Factory Method'],
    correctAnswer: 1,
    explanation: 'The Bridge pattern decouples an abstraction from its implementation, allowing both to be extended independently.'
  },
  {
    id: 3,
    category: 'Asynchronous Programming & Concurrency',
    question: 'In event-driven architectures and the JavaScript Event Loop, which queue has the highest execution priority?',
    options: ['Macro-task Queue (setTimeout)', 'Micro-task Queue (Promises / process.nextTick)', 'I/O Callback Queue', 'Idle/Prepare Queue'],
    correctAnswer: 1,
    explanation: 'The microtask queue (Promises, queueMicrotask) executes immediately after the current operation finishes and before the next macrotask.'
  },
  {
    id: 4,
    category: 'Data Management & Database Principles',
    question: 'In database transaction management, what does the "I" in ACID stand for?',
    options: ['Integrity', 'Idempotency', 'Isolation', 'Indexability'],
    correctAnswer: 2,
    explanation: 'Isolation ensures that concurrent transactions execute without interfering with one another.'
  },
  {
    id: 5,
    category: 'Web Security & Engineering Best Practices',
    question: 'Which of the following is the most effective defense against SQL Injection attacks?',
    options: ['Client-side regex validation', 'Parameterized queries and Prepared Statements', 'Input character capitalization', 'Disabling database logging'],
    correctAnswer: 1,
    explanation: 'Parameterized queries and prepared statements ensure user input is treated strictly as data rather than executable SQL code.'
  }
];

export default function TechnicalAssessment({
  applicationId,
  existingAssessment,
  onCompleted,
  onBack
}) {
  const questions = existingAssessment?.questions && existingAssessment.questions.length > 0
    ? existingAssessment.questions
    : DEFAULT_QUESTIONS;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(10 * 60);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const currentQ = questions[currentIndex];
  const total = questions.length;
  const isLastQuestion = currentIndex === total - 1;

  const handleSelectOption = (optIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optIndex
    }));
  };

  const handleNext = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError('');

    const answersPayload = questions.map((q) => ({
      questionId: q.id,
      selectedAnswer: selectedAnswers[q.id] !== undefined ? selectedAnswers[q.id] : -1
    }));

    try {
      const res = await AssessmentApi.submitAssessment(applicationId, answersPayload);
      if (res && res.success) {
        onCompleted(res.assessment);
      } else {
        setSubmitError(res?.message || 'Failed to submit assessment.');
      }
    } catch (err) {
      setSubmitError(err.message || 'Error submitting assessment results.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="vensaira-assessment-screen cb-fade-in">
      {/* Top Header */}
      <div className="vensaira-assessment-header">
        <button
          type="button"
          className="vensaira-dash-back-btn"
          onClick={onBack}
          aria-label="Back to dashboard"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span>Exit</span>
        </button>

        <div className="vensaira-assessment-timer">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span>{formatTimer(timeLeft)}</span>
        </div>

        <div className="vensaira-q-tracker">
          Question {currentIndex + 1} of {total}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="vensaira-progress-track">
        <div
          className="vensaira-progress-fill"
          style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="vensaira-assessment-card cb-fade-in" key={currentQ.id}>
        <div className="vensaira-q-category">{currentQ.category}</div>
        <h4 className="vensaira-q-title">{currentQ.question}</h4>

        <div className="vensaira-options-list">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedAnswers[currentQ.id] === idx;
            return (
              <button
                key={idx}
                type="button"
                className={`vensaira-q-option ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSelectOption(idx)}
              >
                <span className="vensaira-opt-letter">{String.fromCharCode(65 + idx)}</span>
                <span className="vensaira-opt-text">{opt}</span>
              </button>
            );
          })}
        </div>
      </div>

      {submitError && <div className="vensaira-step-error">{submitError}</div>}

      {/* Bottom Controls */}
      <div className="vensaira-assessment-footer">
        <button
          type="button"
          className="vensaira-btn-outline"
          disabled={currentIndex === 0 || isSubmitting}
          onClick={handlePrev}
        >
          Previous
        </button>

        {isLastQuestion ? (
          <button
            type="button"
            className="vensaira-btn-primary"
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? 'Evaluating...' : 'Submit Assessment'}
          </button>
        ) : (
          <button
            type="button"
            className="vensaira-btn-primary"
            onClick={handleNext}
          >
            Next Question
          </button>
        )}
      </div>
    </div>
  );
}

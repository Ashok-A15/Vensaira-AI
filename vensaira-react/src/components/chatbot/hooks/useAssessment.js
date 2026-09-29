/**
 * Vensaira AI Assistant — useAssessment Hook
 * Manages assessment countdown, answers map, scoring evaluation, and interview sessions.
 */

import { useState, useEffect, useCallback } from 'react';
import { AssessmentApi } from '../services/assessmentApi';
import { InterviewApi } from '../services/interviewApi';

export function useAssessment({ applicationId, existingAssessment, onCompleted }) {
  const questions = existingAssessment?.questions && existingAssessment.questions.length > 0
    ? existingAssessment.questions
    : [];

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

  const formatTimer = useCallback((seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }, []);

  const handleSelectOption = useCallback((questionId, optIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optIndex
    }));
  }, []);

  const handleNext = useCallback((total) => {
    setCurrentIndex((prev) => (prev < total - 1 ? prev + 1 : prev));
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const submitTechnicalAssessment = useCallback(async (allQuestions) => {
    setIsSubmitting(true);
    setSubmitError('');

    const answersPayload = (allQuestions || questions).map((q) => ({
      questionId: q.id,
      selectedAnswer: selectedAnswers[q.id] !== undefined ? selectedAnswers[q.id] : -1
    }));

    try {
      const res = await AssessmentApi.submitAssessment(applicationId, answersPayload);
      if (res && res.success) {
        if (onCompleted) {
          onCompleted(res.assessment);
        }
        return { success: true, assessment: res.assessment };
      } else {
        const msg = res?.message || 'Failed to submit assessment.';
        setSubmitError(msg);
        return { success: false, message: msg };
      }
    } catch (err) {
      const msg = err.message || 'Error submitting assessment results.';
      setSubmitError(msg);
      return { success: false, message: msg };
    } finally {
      setIsSubmitting(false);
    }
  }, [applicationId, questions, selectedAnswers, onCompleted]);

  // Submit interview transcript
  const submitInterviewEvaluation = useCallback(async (transcript) => {
    setIsSubmitting(true);
    try {
      const res = await InterviewApi.evaluateInterview(applicationId, transcript);
      return res;
    } catch (err) {
      console.error('[Interview Evaluation Error]', err);
      return { success: false, message: err.message };
    } finally {
      setIsSubmitting(false);
    }
  }, [applicationId]);

  return {
    currentIndex,
    setCurrentIndex,
    selectedAnswers,
    setSelectedAnswers,
    timeLeft,
    formatTimer,
    isSubmitting,
    submitError,
    handleSelectOption,
    handleNext,
    handlePrev,
    submitTechnicalAssessment,
    submitInterviewEvaluation
  };
}

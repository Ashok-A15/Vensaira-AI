/**
 * Vensaira AI Assistant — VoiceInterview Component
 * AI-powered Voice Screening Interview with SpeechSynthesis, SpeechRecognition, and automated evaluation.
 */

import { useState, useEffect, useRef } from 'react';
import { InterviewApi } from '../services/interviewApi';
import InterviewControls from './InterviewControls';

const DEFAULT_INTERVIEW_QUESTIONS = [
  'Could you please introduce yourself and walk us through a complex software engineering or AI project you recently developed?',
  'How do you approach designing scalable systems and handling errors or unexpected failures in production services?',
  'Can you describe a challenging technical bug or bottleneck you encountered, how you diagnosed it, and how you resolved it?',
  'How do you keep your technical skills current with modern advancements in Artificial Intelligence and cloud architectures?'
];

export default function VoiceInterview({
  applicationId,
  candidate,
  onCompleted,
  onBack
}) {
  const [questions, setQuestions] = useState(DEFAULT_INTERVIEW_QUESTIONS);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [candidateAnswer, setCandidateAnswer] = useState('');
  const [transcript, setTranscript] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [micPermission, setMicPermission] = useState('prompt');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis || null);

  // Check speech recognition support
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setMicPermission('unsupported');
    }
  }, []);

  // Speak active question using SpeechSynthesis
  const speakText = (text) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  // Start Speech Recognition
  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setMicPermission('unsupported');
      return;
    }

    try {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setMicPermission('granted');
      };

      recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript + ' ';
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        setCandidateAnswer((prev) => {
          const base = finalTranscript ? prev + ' ' + finalTranscript : prev;
          return (base + (interimTranscript ? ' ' + interimTranscript : '')).trim();
        });
      };

      recognition.onerror = (event) => {
        console.warn('[Speech Recognition Warning]', event.error);
        if (event.error === 'not-allowed' || event.error === 'permission-denied') {
          setMicPermission('denied');
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.warn('[Speech Rec Error]', err);
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  // Cleanup audio & recognition on unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
      stopListening();
    };
  }, []);

  const handleStartInterview = () => {
    setInterviewStarted(true);
    setCurrentQIndex(0);
    setTimeout(() => {
      speakText(questions[0]);
    }, 400);
  };

  const handleTogglePause = () => {
    if (isPaused) {
      setIsPaused(false);
      speakText(questions[currentQIndex]);
    } else {
      setIsPaused(true);
      stopSpeaking();
      stopListening();
    }
  };

  const currentQ = questions[currentQIndex];
  const isLastQuestion = currentQIndex === questions.length - 1;

  const handleNextQuestion = async () => {
    if (!candidateAnswer.trim()) {
      setErrorMsg('Please provide a response before moving to the next question.');
      return;
    }

    setErrorMsg('');
    stopSpeaking();
    stopListening();

    const updatedTranscript = [
      ...transcript,
      { speaker: 'interviewer', text: currentQ, questionIndex: currentQIndex },
      { speaker: 'candidate', text: candidateAnswer.trim(), questionIndex: currentQIndex }
    ];
    setTranscript(updatedTranscript);
    setCandidateAnswer('');

    if (!isLastQuestion) {
      const nextIndex = currentQIndex + 1;
      setCurrentQIndex(nextIndex);
      setTimeout(() => {
        speakText(questions[nextIndex]);
      }, 300);
    } else {
      await handleCompleteInterview(updatedTranscript);
    }
  };

  const handleCompleteInterview = async (finalTranscript) => {
    setIsSubmitting(true);
    try {
      const res = await InterviewApi.evaluateInterview(applicationId, finalTranscript || transcript);
      if (res && res.success) {
        onCompleted(res.interviewSession);
      } else {
        setErrorMsg(res?.message || 'Failed to complete interview evaluation.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Error processing interview results.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="vensaira-interview-screen cb-fade-in">
      {/* Header */}
      <div className="vensaira-interview-header">
        <button
          type="button"
          className="vensaira-dash-back-btn"
          onClick={() => {
            stopSpeaking();
            stopListening();
            onBack();
          }}
          aria-label="Back to dashboard"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span>Exit Interview</span>
        </button>

        <div className="vensaira-interview-title-badge">
          AI Voice Screening Interview
        </div>

        {interviewStarted && (
          <div className="vensaira-interview-q-count">
            Question {currentQIndex + 1} of {questions.length}
          </div>
        )}
      </div>

      {/* Intro State */}
      {!interviewStarted ? (
        <div className="vensaira-interview-intro cb-fade-in">
          <div className="vensaira-interviewer-card">
            <div className="vensaira-interviewer-avatar" aria-hidden="true">
              <img
                src="/assets/va-symbol-dark.png"
                alt="VA"
                className="vensaira-avatar-img"
                onError={(e) => {
                  e.target.style.display = 'none';
                  if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                }}
              />
              <span className="vensaira-avatar-fallback" style={{ display: 'none' }}>
                VA
              </span>
            </div>
            <div className="vensaira-interviewer-info">
              <h4 className="vensaira-interviewer-name">Vensaira AI Interview Assistant</h4>
              <div className="vensaira-interviewer-role">Automated Technical Screening Agent</div>
            </div>
          </div>

          <div className="vensaira-ai-disclaimer">
            ℹ️ <strong>Notice:</strong> This interview is conducted by an automated AI screening assistant to evaluate core technical competencies and communication. It does not replace our human talent acquisition team.
          </div>

          <div className="vensaira-interview-instructions">
            <h5 className="vensaira-instructions-title">What to Expect:</h5>
            <ul>
              <li>The AI interviewer will ask <strong>{questions.length} structured questions</strong> one at a time.</li>
              <li>Spoken audio will play automatically for each question, accompanied by text.</li>
              <li>You can speak your answers via microphone or type them directly into the response area.</li>
              <li>Take your time to structure your responses clearly before continuing.</li>
            </ul>
          </div>

          <div className="vensaira-mic-status-box">
            <div className="vensaira-mic-status-header">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0878C9" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
              <span>Microphone & Voice Setup</span>
            </div>
            <p className="vensaira-mic-desc">
              {micPermission === 'unsupported'
                ? 'Web Speech API is not supported in this browser. You can seamlessly participate using the text response fallback.'
                : micPermission === 'denied'
                ? 'Microphone permission was denied. You can participate using the text response box, or enable microphone in browser settings.'
                : 'Microphone access will be requested when you begin speaking. Both voice and text answers are supported.'}
            </p>
          </div>

          <button
            type="button"
            className="vensaira-btn-primary full-width vensaira-start-interview-btn"
            onClick={handleStartInterview}
          >
            Start AI Voice Interview
          </button>
        </div>
      ) : (
        /* Active Interview Interface */
        <div className="vensaira-active-interview cb-fade-in">
          {/* Progress Indicator */}
          <div className="vensaira-progress-track">
            <div
              className="vensaira-progress-fill"
              style={{ width: `${((currentQIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* AI Question Bubble */}
          <div className="vensaira-ai-question-card">
            <div className="vensaira-question-header">
              <div className="vensaira-interviewer-mini">
                <div className="vensaira-mini-avatar" aria-hidden="true">VA</div>
                <span className="vensaira-mini-label">AI Interviewer</span>
              </div>

              <div className="vensaira-audio-controls">
                {isSpeaking ? (
                  <button
                    type="button"
                    className="vensaira-audio-btn speaking"
                    onClick={stopSpeaking}
                    title="Stop audio playback"
                  >
                    <span className="vensaira-audio-wave" aria-hidden="true">
                      <span /><span /><span />
                    </span>
                    <span>Speaking...</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="vensaira-audio-btn"
                    onClick={() => speakText(currentQ)}
                    title="Replay spoken question"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                    <span>Replay Audio</span>
                  </button>
                )}
              </div>
            </div>

            <div className="vensaira-question-text">{currentQ}</div>
          </div>

          {/* Candidate Response & Microphone Area */}
          <div className="vensaira-candidate-response-area">
            <div className="vensaira-response-header">
              <span className="vensaira-response-label">Your Response</span>

              {micPermission !== 'unsupported' && micPermission !== 'denied' && (
                <div className="vensaira-voice-toggle-group">
                  {isListening ? (
                    <button
                      type="button"
                      className="vensaira-mic-btn active"
                      onClick={stopListening}
                    >
                      <span className="vensaira-pulsing-dot" aria-hidden="true" />
                      <span>Listening... (Click to Pause)</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="vensaira-mic-btn"
                      onClick={startListening}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                      </svg>
                      <span>Speak with Mic</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Editable Response Text Area */}
            <textarea
              className="vensaira-response-textarea"
              placeholder="Speak using your microphone or type your answer here..."
              rows={4}
              value={candidateAnswer}
              onChange={(e) => setCandidateAnswer(e.target.value)}
            />

            <div className="vensaira-fallback-hint">
              💡 You can speak into your microphone or edit/type your response directly in the text area above.
            </div>
          </div>

          {errorMsg && <div className="vensaira-step-error">{errorMsg}</div>}

          {/* Action Controls */}
          <InterviewControls
            isPaused={isPaused}
            onTogglePause={handleTogglePause}
            isLastQuestion={isLastQuestion}
            isSubmitting={isSubmitting}
            hasAnswer={Boolean(candidateAnswer.trim())}
            onNextQuestion={handleNextQuestion}
          />
        </div>
      )}
    </div>
  );
}

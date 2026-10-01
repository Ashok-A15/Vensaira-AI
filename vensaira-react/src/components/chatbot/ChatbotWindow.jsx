/**
 * Vensaira AI Assistant — ChatbotWindow Component
 * Main modal container managing views, navigation, header, chat stream, and sub-views.
 */

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatbotHeader from './components/ChatbotHeader';
import ChatbotMessages from './components/ChatbotMessages';
import ChatbotInput from './components/ChatbotInput';

import CareersScreen from './careers/CareersScreen';
import CandidateApplication from './careers/CandidateApplication';
import ApplicationSuccess from './careers/ApplicationSuccess';
import AiAssessmentStart from './careers/AiAssessmentStart';
import ApplicationStatusView from './careers/ApplicationStatusView';

export default function ChatbotWindow({
  isOpen,
  onClose,
  currentView,
  setCurrentView,
  candidate,
  setCandidate,
  assessment,
  setAssessment,
  interview,
  setInterview,
  applicationId,
  setApplicationId,
  messages,
  inputText,
  setInputText,
  onSendMessage,
  onQuickAction,
  onSelectInterestOption,
  onContinueLookup,
  onClearChat
}) {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Auto-scroll to bottom of messages when in chat view
  useEffect(() => {
    if (isOpen && currentView === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      const timer = setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [messages, isOpen, currentView]);

  // Focus input when opened in chat view
  useEffect(() => {
    if (isOpen && currentView === 'chat') {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen, currentView]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleRouteClick = (route) => {
    if (route.startsWith('/#')) {
      const id = route.slice(2);
      if (window.location.pathname === '/') {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', route);
      } else {
        navigate(route);
      }
    } else {
      navigate(route);
    }
  };

  const handleActionClick = (btn) => {
    if (btn.action === 'careers_intro') {
      setCurrentView('careers_intro');
    } else if (btn.route) {
      handleRouteClick(btn.route);
    }
  };

  const handleClearChatClick = () => {
    const isUnsavedSession = currentView === 'application_flow';

    if (isUnsavedSession) {
      setShowClearConfirm(true);
    } else {
      onClearChat();
    }
  };

  const isConversationActive = messages.length > 1;

  return (
    <div
      className={`vensaira-chat-window ${currentView !== 'chat' ? 'wide-view' : ''}`}
      role="dialog"
      aria-label="Vensaira AI Assistant Chat"
      aria-modal="true"
    >
      {/* Clear Chat Confirmation Modal for active sessions */}
      {showClearConfirm && (
        <div className="vensaira-confirm-overlay cb-fade-in" role="alertdialog" aria-modal="true" aria-label="Confirm Clear Chat">
          <div className="vensaira-confirm-card">
            <div className="vensaira-confirm-icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h4 className="vensaira-confirm-title">Clear Active Session?</h4>
            <p className="vensaira-confirm-desc">
              You have an active {currentView === 'application_flow' ? 'job application' : 'assessment / interview session'} in progress. Clearing the chat will reset your unsaved progress and return to the main welcome screen.
            </p>
            <div className="vensaira-confirm-actions">
              <button
                type="button"
                className="vensaira-btn-outline"
                onClick={() => setShowClearConfirm(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="vensaira-btn-primary vensaira-btn-danger"
                onClick={() => {
                  setShowClearConfirm(false);
                  onClearChat();
                }}
              >
                Clear Chat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <ChatbotHeader
        currentView={currentView}
        setCurrentView={setCurrentView}
        isConversationActive={isConversationActive}
        onClearChatClick={handleClearChatClick}
        onClose={onClose}
      />

      {/* Sub-View: Careers Intro */}
      {currentView === 'careers_intro' && (
        <CareersScreen
          onStartApplication={() => setCurrentView('application_flow')}
          onContinueApplication={async (query) => {
            const res = await onContinueLookup(query);
            if (res && res.success) {
              setCurrentView('application_status');
            }
            return res;
          }}
          onBackToChat={() => setCurrentView('chat')}
          existingApplication={candidate}
        />
      )}

      {/* Sub-View: Candidate Application Flow */}
      {currentView === 'application_flow' && (
        <CandidateApplication
          onSubmitted={(newAppId, newCandidate) => {
            setApplicationId(newAppId);
            setCandidate(newCandidate);
            setCurrentView('application_success');
          }}
          onCancel={() => setCurrentView('careers_intro')}
          onBackToIntro={() => setCurrentView('careers_intro')}
        />
      )}

      {/* Sub-View: Application Success Screen */}
      {currentView === 'application_success' && (
        <ApplicationSuccess
          applicationId={applicationId}
          candidate={candidate}
          onStartAssessment={() => setCurrentView('ai_assessment_start')}
          onViewStatus={() => setCurrentView('application_status')}
          onBackToChat={() => setCurrentView('chat')}
        />
      )}

      {/* Sub-View: AI Assessment Start Screen */}
      {currentView === 'ai_assessment_start' && (
        <AiAssessmentStart
          applicationId={applicationId}
          candidate={candidate}
          onBack={() => setCurrentView('application_success')}
        />
      )}

      {/* Sub-View: Application Status View */}
      {currentView === 'application_status' && (
        <ApplicationStatusView
          applicationId={applicationId}
          candidate={candidate}
          onStartAssessment={() => setCurrentView('ai_assessment_start')}
          onBack={() => setCurrentView('application_success')}
          onBackToChat={() => setCurrentView('chat')}
        />
      )}

      {/* Default Chat View */}
      {currentView === 'chat' && (
        <>
          <ChatbotMessages
            messages={messages}
            messagesEndRef={messagesEndRef}
            onQuickAction={onQuickAction}
            onSelectInterestOption={onSelectInterestOption}
            onActionClick={handleActionClick}
          />

          <ChatbotInput
            inputRef={inputRef}
            inputText={inputText}
            setInputText={setInputText}
            onSubmit={() => onSendMessage(inputText)}
          />
        </>
      )}
    </div>
  );
}

/**
 * Vensaira AI Assistant — ChatbotHeader Component
 * Top solid blue header bar with avatar, title, status indicator, and navigation controls.
 */

import ClearChatButton from './ClearChatButton';

export default function ChatbotHeader({
  currentView,
  setCurrentView,
  isConversationActive,
  onClearChatClick,
  onClose
}) {
  const getHeaderSubtitle = () => {
    switch (currentView) {
      case 'careers_intro':
        return 'Careers & AI Interview';
      case 'application_flow':
        return 'Job Application';
      case 'application_success':
        return 'Application Received';
      case 'assessment_dashboard':
        return 'Candidate Assessment Center';
      case 'technical_assessment':
        return 'Technical Skills Assessment';
      case 'voice_interview':
        return 'AI Voice Interview';
      default:
        return isConversationActive ? (
          <>
            <span className="vensaira-status-dot" aria-hidden="true" />
            <span>Online</span>
          </>
        ) : (
          'How can we help you today?'
        );
    }
  };

  return (
    <div className="vensaira-chat-header">
      <div className="vensaira-chat-header-info">
        <div className="vensaira-chat-header-avatar" aria-hidden="true">
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
        <div className="vensaira-chat-title-group">
          <h2 className="vensaira-chat-title">Vensaira AI Assistant</h2>
          <div className="vensaira-chat-subtitle">
            {getHeaderSubtitle()}
          </div>
        </div>
      </div>

      <div className="vensaira-chat-header-controls">
        {currentView !== 'chat' && (
          <button
            type="button"
            className="vensaira-chat-header-btn"
            onClick={() => setCurrentView('chat')}
            aria-label="Return to chat"
            title="Return to Chat"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </button>
        )}

        {/* Clear Chat Button */}
        <ClearChatButton onClick={onClearChatClick} />

        {/* Minimize Button */}
        <button
          type="button"
          className="vensaira-chat-header-btn"
          onClick={onClose}
          aria-label="Minimize Vensaira AI Assistant"
          title="Minimize"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>

        {/* Close Button */}
        <button
          type="button"
          className="vensaira-chat-header-btn"
          onClick={onClose}
          aria-label="Close Vensaira AI Assistant"
          title="Close"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  );
}

import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function QuickActionIcon({ type }) {
  switch (type) {
    case 'sparkle':
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
        </svg>
      );
    case 'grid':
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
        </svg>
      );
    case 'building':
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 2L2 7h20L12 2z" />
        </svg>
      );
    case 'book':
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      );
    case 'users':
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case 'mail':
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <polyline points="3 7 12 13 21 7" />
        </svg>
      );
    default:
      return null;
  }
}

export default function ChatbotWindow({
  isOpen,
  onClose,
  messages,
  inputText,
  setInputText,
  onSendMessage,
  onQuickAction,
  onSelectInterestOption
}) {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      const timer = setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [messages, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSendMessage(inputText);
    }
  };

  // Determine whether conversation is active or initial welcome
  const isConversationActive = messages.length > 1;

  return (
    <div
      className="vensaira-chat-window"
      role="dialog"
      aria-label="Vensaira AI Assistant Chat"
      aria-modal="true"
    >
      {/* Header: Solid Vensaira Blue */}
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
              {isConversationActive ? (
                <>
                  <span className="vensaira-status-dot" aria-hidden="true" />
                  <span>Online</span>
                </>
              ) : (
                'How can we help you today?'
              )}
            </div>
          </div>
        </div>

        <div className="vensaira-chat-header-controls">
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

      {/* Messages Stream */}
      <div className="vensaira-chat-body">
        {messages.map((msg) => (
          <div key={msg.id} className={`vensaira-chat-msg-row ${msg.sender}`}>
            {msg.sender === 'assistant' && (
              <div className="vensaira-chat-msg-avatar" aria-hidden="true">
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
            )}

            <div className="vensaira-chat-msg-content">
              <div className="vensaira-chat-bubble">{msg.text}</div>

              {/* 6 Quick Action Buttons (2-column layout matching screenshot) */}
              {msg.quickActions && msg.quickActions.length > 0 && (
                <div
                  className="vensaira-chat-quick-actions"
                  role="group"
                  aria-label="Suggested quick actions"
                >
                  {msg.quickActions.map((qa) => (
                    <button
                      key={qa.id}
                      type="button"
                      className="vensaira-chat-quick-btn"
                      onClick={() => onQuickAction(qa.action, qa.label)}
                    >
                      <span className="vensaira-quick-icon">
                        <QuickActionIcon type={qa.icon} />
                      </span>
                      <span className="vensaira-quick-label">{qa.label}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Selectable chips (e.g. Enquiry Interest Options) */}
              {msg.chips && msg.chips.length > 0 && (
                <div
                  className="vensaira-chat-chips"
                  role="group"
                  aria-label="Area of interest options"
                >
                  {msg.chips.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className="vensaira-chat-chip"
                      onClick={() => onSelectInterestOption(option)}
                      disabled={msg.chipsDisabled}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}

              {/* Action buttons (e.g. Explore AI Solutions →, Continue to Contact Us →) */}
              {msg.buttons && msg.buttons.length > 0 && (
                <div className="vensaira-chat-actions">
                  {msg.buttons.map((btn, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="vensaira-chat-action-btn"
                      onClick={() => handleRouteClick(btn.route)}
                    >
                      <span>{btn.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Footer */}
      <form className="vensaira-chat-footer" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          className="vensaira-chat-input"
          placeholder="Ask about Vensaira..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          aria-label="Ask about Vensaira"
        />
        <button
          type="submit"
          className="vensaira-chat-send-btn"
          disabled={!inputText.trim()}
          aria-label="Send message"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </form>
    </div>
  );
}

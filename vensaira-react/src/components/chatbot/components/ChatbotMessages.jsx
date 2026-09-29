/**
 * Vensaira AI Assistant — ChatbotMessages Component
 * Displays the conversation stream, assistant/user bubbles, quick actions, chips, and links.
 */

import { QuickActionIcon } from './QuickActions';

export default function ChatbotMessages({
  messages,
  messagesEndRef,
  onQuickAction,
  onSelectInterestOption,
  onActionClick
}) {
  return (
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

            {/* Quick Action Buttons */}
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

            {/* Action buttons (e.g. Explore links or Careers) */}
            {msg.buttons && msg.buttons.length > 0 && (
              <div className="vensaira-chat-actions">
                {msg.buttons.map((btn, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="vensaira-chat-action-btn"
                    onClick={() => onActionClick(btn)}
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
  );
}

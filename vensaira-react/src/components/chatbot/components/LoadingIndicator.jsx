/**
 * Vensaira AI Assistant — LoadingIndicator Component
 * Renders typing status and animated loading indicators.
 */

export default function LoadingIndicator({ type = 'typing', text = '' }) {
  if (type === 'spinner') {
    return (
      <div className="vensaira-loading-spinner-wrap" role="status" aria-label="Loading">
        <div className="vensaira-loading-spinner" />
        {text && <span className="vensaira-loading-text">{text}</span>}
      </div>
    );
  }

  return (
    <div className="vensaira-typing-indicator" role="status" aria-label="Assistant is typing">
      <span className="vensaira-typing-dot" />
      <span className="vensaira-typing-dot" />
      <span className="vensaira-typing-dot" />
    </div>
  );
}

/**
 * Vensaira AI Assistant — ChatbotInput Component
 * Bottom text input form with submit button.
 */

export default function ChatbotInput({
  inputRef,
  inputText,
  setInputText,
  onSubmit,
  placeholder = 'Ask about Vensaira...'
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSubmit(e);
    }
  };

  return (
    <form className="vensaira-chat-footer" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        className="vensaira-chat-input"
        placeholder={placeholder}
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
  );
}

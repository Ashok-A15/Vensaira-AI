/**
 * Vensaira AI Assistant — ChatbotLauncher Component
 * Floating circular button to toggle the chatbot window open and closed.
 * Exact original approved design with speech bubble & 3 inner dots.
 */

export default function ChatbotLauncher({ isOpen, onClick }) {
  return (
    <button
      type="button"
      className="vensaira-chatbot-btn"
      onClick={onClick}
      aria-label={isOpen ? "Close Vensaira AI Assistant" : "Open Vensaira AI Assistant"}
      aria-expanded={isOpen}
      aria-haspopup="dialog"
    >
      {isOpen ? (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      ) : (
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          <circle cx="8.5" cy="12" r="1" fill="currentColor" stroke="none" />
          <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
          <circle cx="15.5" cy="12" r="1" fill="currentColor" stroke="none" />
        </svg>
      )}
    </button>
  );
}

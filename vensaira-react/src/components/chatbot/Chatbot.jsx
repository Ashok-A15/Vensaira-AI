/**
 * Vensaira AI Assistant — Chatbot Root Component
 * Single entry component integrating state, floating launcher, and window container.
 */

import { useChatbot } from './hooks/useChatbot';
import ChatbotLauncher from './ChatbotLauncher';
import ChatbotWindow from './ChatbotWindow';
import './styles/chatbot.css';

export default function Chatbot() {
  const {
    isOpen,
    toggleOpen,
    handleClose,
    currentView,
    setCurrentView,
    applicationId,
    setApplicationId,
    candidate,
    setCandidate,
    assessment,
    setAssessment,
    interview,
    setInterview,
    messages,
    inputText,
    setInputText,
    handleSendMessage,
    handleQuickAction,
    handleSelectInterestOption,
    handleContinueLookup,
    handleClearChat
  } = useChatbot();

  return (
    <>
      <ChatbotWindow
        isOpen={isOpen}
        onClose={handleClose}
        currentView={currentView}
        setCurrentView={setCurrentView}
        candidate={candidate}
        setCandidate={setCandidate}
        assessment={assessment}
        setAssessment={setAssessment}
        interview={interview}
        setInterview={setInterview}
        applicationId={applicationId}
        setApplicationId={setApplicationId}
        messages={messages}
        inputText={inputText}
        setInputText={setInputText}
        onSendMessage={handleSendMessage}
        onQuickAction={handleQuickAction}
        onSelectInterestOption={handleSelectInterestOption}
        onContinueLookup={handleContinueLookup}
        onClearChat={handleClearChat}
      />
      <ChatbotLauncher isOpen={isOpen} onClick={toggleOpen} />
    </>
  );
}

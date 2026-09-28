import { useState, useCallback, useEffect } from 'react';
import ChatbotButton from './ChatbotButton';
import ChatbotWindow from './ChatbotWindow';
import {
  INITIAL_MESSAGES,
  ENQUIRY_INTEREST_OPTIONS,
  PRESET_RESPONSES,
  getResponseForQuery
} from './chatbotData';
import '../../styles/chatbot.css';

const STORAGE_KEY_MESSAGES = 'vensaira_chatbot_messages';
const STORAGE_KEY_INQUIRY = 'vensaira_chatbot_inquiry_state';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY_MESSAGES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Ignore sessionStorage error
    }
    return INITIAL_MESSAGES;
  });

  const [inputText, setInputText] = useState('');
  const [inquiryState, setInquiryState] = useState(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEY_INQUIRY) || 'idle';
    } catch {
      return 'idle';
    }
  });

  // Preserve chat messages when navigating between website pages
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(messages));
    } catch {
      // Ignore storage error
    }
  }, [messages]);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY_INQUIRY, inquiryState);
    } catch {
      // Ignore storage error
    }
  }, [inquiryState]);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const addMessage = (msg) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
        ...msg
      }
    ]);
  };

  const handleQuickAction = (action, label) => {
    // Add user message
    addMessage({
      sender: 'user',
      text: label
    });

    if (action === 'expert_enquiry') {
      setTimeout(() => {
        addMessage({
          sender: 'assistant',
          text: 'Sure. I can help you start a business enquiry. What are you interested in?',
          chips: ENQUIRY_INTEREST_OPTIONS
        });
        setInquiryState('awaiting_interest');
      }, 250);
      return;
    }

    const preset = PRESET_RESPONSES[action];
    if (preset) {
      setTimeout(() => {
        addMessage({
          sender: 'assistant',
          text: preset.text,
          buttons: preset.buttons
        });
      }, 250);
    }
  };

  const handleSelectInterestOption = (option) => {
    // Disable chips on last message once selected
    setMessages((prev) =>
      prev.map((msg, idx) =>
        idx === prev.length - 1 ? { ...msg, chipsDisabled: true } : msg
      )
    );

    // Add user selection as message
    addMessage({
      sender: 'user',
      text: option
    });

    setTimeout(() => {
      addMessage({
        sender: 'assistant',
        text: 'Please tell us briefly about your requirement.'
      });
      setInquiryState('awaiting_requirement');
    }, 250);
  };

  const handleSendMessage = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    // Handle "clear" command to reset the chat
    const lower = trimmed.toLowerCase();
    if (lower === 'clear' || lower === 'clear chat' || lower === '/clear' || lower === 'cls') {
      setInputText('');
      setMessages(INITIAL_MESSAGES);
      setInquiryState('idle');
      try {
        sessionStorage.removeItem(STORAGE_KEY_MESSAGES);
        sessionStorage.removeItem(STORAGE_KEY_INQUIRY);
      } catch {
        // Ignore storage error
      }
      return;
    }

    // Add user message
    addMessage({
      sender: 'user',
      text: trimmed
    });
    setInputText('');

    // If in enquiry flow awaiting requirement text
    if (inquiryState === 'awaiting_requirement') {
      setTimeout(() => {
        addMessage({
          sender: 'assistant',
          text: 'Thank you! You can continue through our Contact Us page to send your complete enquiry to the Vensaira team.',
          buttons: [
            { label: 'Continue to Contact Us →', route: '/contact' }
          ]
        });
        setInquiryState('idle');
      }, 300);
      return;
    }

    // Standard query matching
    const response = getResponseForQuery(trimmed);

    if (response.type === 'expert_enquiry') {
      setTimeout(() => {
        addMessage({
          sender: 'assistant',
          text: 'Sure. I can help you start a business enquiry. What are you interested in?',
          chips: ENQUIRY_INTEREST_OPTIONS
        });
        setInquiryState('awaiting_interest');
      }, 300);
      return;
    }

    setTimeout(() => {
      addMessage({
        sender: 'assistant',
        text: response.text,
        buttons: response.buttons
      });
    }, 300);
  };

  return (
    <>
      <ChatbotWindow
        isOpen={isOpen}
        onClose={handleClose}
        messages={messages}
        inputText={inputText}
        setInputText={setInputText}
        onSendMessage={handleSendMessage}
        onQuickAction={handleQuickAction}
        onSelectInterestOption={handleSelectInterestOption}
      />
      <ChatbotButton isOpen={isOpen} onClick={toggleOpen} />
    </>
  );
}

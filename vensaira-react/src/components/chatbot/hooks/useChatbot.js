/**
 * Vensaira AI Assistant — useChatbot Hook
 * Core state management for chat session, messages, active views, and hydration.
 */

import { useState, useCallback, useEffect } from 'react';
import { ChatbotApi } from '../services/chatbotApi';
import {
  INITIAL_MESSAGES,
  ENQUIRY_INTEREST_OPTIONS,
  STORAGE_KEYS
} from '../constants/chatbotConfig';
import { getResponseForQuery, createMessage } from '../utils/chatHelpers';

export function useChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentView, setCurrentView] = useState('chat');

  // Application & Assessment State
  const [applicationId, setApplicationId] = useState(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEYS.APP_ID) || '';
    } catch {
      return '';
    }
  });

  const [candidate, setCandidate] = useState(null);
  const [assessment, setAssessment] = useState(null);
  const [interview, setInterview] = useState(null);

  const [messages, setMessages] = useState(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEYS.MESSAGES);
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
      return sessionStorage.getItem(STORAGE_KEYS.INQUIRY) || 'idle';
    } catch {
      return 'idle';
    }
  });

  // Preserve chat messages across website navigation
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
    } catch {
      // Ignore storage error
    }
  }, [messages]);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEYS.INQUIRY, inquiryState);
    } catch {
      // Ignore storage error
    }
  }, [inquiryState]);

  // Synchronize active application ID in sessionStorage
  useEffect(() => {
    if (applicationId) {
      try {
        sessionStorage.setItem(STORAGE_KEYS.APP_ID, applicationId);
      } catch {
        // Ignore storage error
      }
    }
  }, [applicationId]);

  // Hydrate candidate, assessment, and interview data from backend on startup or when applicationId changes
  useEffect(() => {
    if (!applicationId) return;

    let isMounted = true;
    async function loadCandidateData() {
      try {
        const [appRes, assessRes, intRes] = await Promise.all([
          ChatbotApi.getApplication(applicationId),
          ChatbotApi.getAssessment(applicationId),
          ChatbotApi.getInterview(applicationId)
        ]);

        if (isMounted) {
          if (appRes && appRes.success && appRes.candidate) {
            setCandidate(appRes.candidate);
          }
          if (assessRes && assessRes.success && assessRes.assessment) {
            setAssessment(assessRes.assessment);
          }
          if (intRes && intRes.success && intRes.interviewSession) {
            setInterview(intRes.interviewSession);
          }
        }
      } catch (err) {
        console.warn('[Chatbot Hydration Warning]', err);
      }
    }

    loadCandidateData();
    return () => {
      isMounted = false;
    };
  }, [applicationId]);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleClearChat = useCallback(() => {
    setMessages(INITIAL_MESSAGES);
    setInputText('');
    setInquiryState('idle');
    setCurrentView('chat');
    try {
      sessionStorage.removeItem(STORAGE_KEYS.MESSAGES);
      sessionStorage.removeItem(STORAGE_KEYS.INQUIRY);
    } catch {
      // Ignore storage error
    }
  }, []);

  const addMessage = useCallback((msg) => {
    setMessages((prev) => [
      ...prev,
      createMessage(msg)
    ]);
  }, []);

  const handleQuickAction = useCallback((action, label) => {
    addMessage({
      sender: 'user',
      text: label
    });

    if (action === 'careers_intro') {
      setTimeout(() => {
        setCurrentView('careers_intro');
      }, 200);
      return;
    }

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

    const response = getResponseForQuery(action);
    setTimeout(() => {
      addMessage({
        sender: 'assistant',
        text: response.text,
        buttons: response.buttons
      });
    }, 250);
  }, [addMessage]);

  const handleSelectInterestOption = useCallback((option) => {
    addMessage({
      sender: 'user',
      text: option
    });

    setTimeout(() => {
      addMessage({
        sender: 'assistant',
        text: `Thank you for your interest in ${option}. You can share your project requirements directly through our Contact page or connect with our team.`,
        buttons: [
          { label: 'Go to Contact Page →', route: '/contact' }
        ]
      });
      setInquiryState('idle');
    }, 300);
  }, [addMessage]);

  const handleSendMessage = useCallback((text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    addMessage({
      sender: 'user',
      text: trimmed
    });
    setInputText('');

    if (inquiryState === 'awaiting_interest') {
      setTimeout(() => {
        addMessage({
          sender: 'assistant',
          text: `Thank you. You can discuss your project requirements in detail through our Contact page or schedule a consultation.`,
          buttons: [
            { label: 'Go to Contact Page →', route: '/contact' }
          ]
        });
        setInquiryState('idle');
      }, 300);
      return;
    }

    const response = getResponseForQuery(trimmed);

    if (response.type === 'careers_intro') {
      setTimeout(() => {
        addMessage({
          sender: 'assistant',
          text: response.text,
          buttons: response.buttons
        });
      }, 300);
      return;
    }

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
  }, [addMessage, inquiryState]);

  // Lookup existing application by ID or Email
  const handleContinueLookup = useCallback(async (query) => {
    const trimmed = query.trim();
    let res = null;
    if (trimmed.includes('@')) {
      res = await ChatbotApi.getApplicationByEmail(trimmed);
    } else {
      res = await ChatbotApi.getApplication(trimmed);
    }

    if (res && res.success && res.candidate) {
      setApplicationId(res.candidate.applicationId);
      setCandidate(res.candidate);

      const [assessRes, intRes] = await Promise.all([
        ChatbotApi.getAssessment(res.candidate.applicationId),
        ChatbotApi.getInterview(res.candidate.applicationId)
      ]);

      if (assessRes && assessRes.success) setAssessment(assessRes.assessment);
      if (intRes && intRes.success) setInterview(intRes.interviewSession);

      return { success: true };
    }

    return {
      success: false,
      message: res?.message || 'No application found with that ID or email.'
    };
  }, []);

  return {
    isOpen,
    setIsOpen,
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
    inquiryState,
    handleSendMessage,
    handleQuickAction,
    handleSelectInterestOption,
    handleContinueLookup,
    handleClearChat
  };
}

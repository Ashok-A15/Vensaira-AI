/**
 * Vensaira AI Assistant — Chatbot Configuration & Knowledge Base Constants
 */

export const STORAGE_KEYS = {
  MESSAGES: 'vensaira_chatbot_messages',
  INQUIRY: 'vensaira_chatbot_inquiry_state',
  APP_ID: 'vensaira_active_app_id'
};

export const QUICK_ACTIONS = [
  { id: 'qa-careers', label: 'Careers & AI Interview', action: 'careers_intro', icon: 'briefcase' },
  { id: 'qa-ai', label: 'Explore AI Solutions', action: 'ai_solutions', icon: 'sparkle' },
  { id: 'qa-services', label: 'Explore Services', action: 'services', icon: 'grid' },
  { id: 'qa-industries', label: 'Industries We Serve', action: 'industries', icon: 'building' },
  { id: 'qa-elearning', label: 'eLearning', action: 'elearning', icon: 'book' },
  { id: 'qa-expert', label: 'Talk to Our Experts', action: 'expert_enquiry', icon: 'users' }
];

export const INITIAL_MESSAGES = [
  {
    id: 'msg-init-welcome',
    sender: 'assistant',
    text: "Hi! I'm Vensaira AI Assistant.\nHow can I help you today?",
    quickActions: QUICK_ACTIONS
  }
];

export const ENQUIRY_INTEREST_OPTIONS = [
  'AI & Machine Learning',
  'Software Engineering',
  'Cloud & Infrastructure',
  'Data & Analytics',
  'Digital Solutions',
  'Automation & Integration',
  'Other'
];

export const SKILL_OPTIONS = [
  'JavaScript',
  'Python',
  'Java',
  'React',
  'Node.js',
  'AI / ML',
  'Data Science',
  'Cloud / DevOps',
  'UI/UX',
  'Other'
];

export const EXPERIENCE_OPTIONS = [
  'Fresher',
  'Less than 1 year',
  '1–3 years',
  '3–5 years',
  '5+ years'
];

export const EDUCATION_OPTIONS = [
  'Diploma',
  "Bachelor's Degree",
  "Master's Degree",
  'PhD',
  'Other'
];

export const LOCATION_OPTIONS = [
  'Bangalore',
  'Hyderabad',
  'Pune',
  'Mumbai',
  'Remote / Flexible',
  'Other'
];

export const PRESET_RESPONSES = {
  ai_solutions: {
    text: 'Vensaira AI Innovations provides AI and Machine Learning solutions including AI integration and automation, custom AI application development, conversational AI and smart assistants, and data intelligence and analytics.\n\nWould you like to explore our AI Solutions?',
    buttons: [
      { label: 'Explore AI Solutions →', route: '/ai-solutions' }
    ]
  },
  services: {
    text: 'Our technology services include Software Engineering, AI & Machine Learning, Cloud & Infrastructure, Data & Analytics, Digital Solutions, and Automation & Integration.',
    buttons: [
      { label: 'Explore Services →', route: '/services/software-engineering' }
    ]
  },
  industries: {
    text: 'Vensaira AI Innovations develops technology solutions for industries such as Healthcare, Education & eLearning, Logistics & Transportation, Financial Services, Retail & E-Commerce, Manufacturing, Technology & SaaS, and Professional Services.',
    buttons: [
      { label: 'Explore Industries →', route: '/#industries' }
    ]
  },
  elearning: {
    text: 'Yes. Vensaira eLearning provides structured learning experiences covering technologies such as AI, software engineering, cloud computing, data and modern digital technologies.',
    buttons: [
      { label: 'Explore eLearning →', route: '/elearning/courses' }
    ]
  },
  contact: {
    text: 'You can connect directly with our specialists or share your project requirements through our Contact Us page.',
    buttons: [
      { label: 'Go to Contact Page →', route: '/contact' }
    ]
  }
};

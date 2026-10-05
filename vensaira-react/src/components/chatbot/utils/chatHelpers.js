/**
 * Vensaira AI Assistant — Chat Helper Utilities & Response Engine
 */

import { PRESET_RESPONSES } from '../constants/chatbotConfig';

/**
 * Creates a normalized message object with unique ID and timestamp
 * @param {Object} params
 * @returns {Object}
 */
export function createMessage({ sender, text, quickActions, chips, buttons }) {
  return {
    id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    sender,
    text,
    ...(quickActions && { quickActions }),
    ...(chips && { chips }),
    ...(buttons && { buttons })
  };
}

/**
 * Matches user query string with local knowledge engine
 * @param {string} rawQuery
 * @returns {Object}
 */
export function getResponseForQuery(rawQuery) {
  const query = rawQuery.toLowerCase().trim();

  /*
  // Careers & Job application
  if (
    query.includes('career') ||
    query.includes('job') ||
    query.includes('hiring') ||
    query.includes('apply') ||
    query.includes('interview') ||
    query.includes('assessment') ||
    query.includes('vacancy') ||
    query.includes('openings') ||
    query.includes('work with us')
  ) {
    return {
      type: 'careers_intro',
      text: 'Explore career opportunities, complete your candidate assessment, and experience our AI-powered interview process.',
      buttons: [
        { label: 'Careers & AI Interview →', action: 'careers_intro' }
      ]
    };
  }
  */

  // Enquiry / Talk to experts / Contact initiation
  if (
    query.includes('talk to expert') ||
    query.includes('talk to our experts') ||
    query.includes('i want to contact you') ||
    query.includes('want to contact') ||
    query.includes('contact you') ||
    query.includes('start enquiry') ||
    query.includes('business enquiry') ||
    query.includes('enquiry') ||
    query.includes('inquiry') ||
    query.includes('consultation') ||
    query.includes('hire') ||
    query.includes('quote') ||
    query.includes('proposal')
  ) {
    return {
      type: 'expert_enquiry',
      text: 'Sure. I can help you start a business enquiry. What are you interested in?'
    };
  }

  // Direct Contact / Reach out
  if (
    query.includes('contact') ||
    query.includes('reach') ||
    query.includes('email') ||
    query.includes('phone') ||
    query.includes('call') ||
    query.includes('touch') ||
    query.includes('location') ||
    query.includes('office') ||
    query.includes('address')
  ) {
    return {
      text: PRESET_RESPONSES.contact.text,
      buttons: PRESET_RESPONSES.contact.buttons
    };
  }

  // AI & Machine Learning specific queries
  if (
    query.includes('what ai services') ||
    query.includes('ai services') ||
    query.includes('ai solutions') ||
    query.includes('machine learning') ||
    query.includes('ml') ||
    query.includes('llm') ||
    query.includes('generative') ||
    query.includes('genai') ||
    query.includes('agentic') ||
    query.includes('quantum') ||
    query.includes('artificial intelligence') ||
    query === 'ai'
  ) {
    return {
      text: PRESET_RESPONSES.ai_solutions.text,
      buttons: PRESET_RESPONSES.ai_solutions.buttons
    };
  }

  // Chatbot / Conversational AI
  if (
    query.includes('chatbot') ||
    query.includes('conversational') ||
    query.includes('assistant') ||
    query.includes('virtual agent')
  ) {
    return {
      text: 'We develop intelligent conversational AI and smart assistant solutions tailored to streamline customer engagement and automate repetitive enterprise interactions.',
      buttons: [
        { label: 'Explore AI Chatbots →', route: '/ai-solutions/ai-chatbots' }
      ]
    };
  }

  // Software Engineering
  if (
    query.includes('software') ||
    query.includes('engineering') ||
    query.includes('web development') ||
    query.includes('application') ||
    query.includes('app development') ||
    query.includes('frontend') ||
    query.includes('backend') ||
    query.includes('fullstack')
  ) {
    return {
      text: 'Our Software Engineering practice delivers custom full-stack web applications, scalable microservices, mobile architectures, and resilient enterprise software systems.',
      buttons: [
        { label: 'Explore Software Engineering →', route: '/services/software-engineering' }
      ]
    };
  }

  // Cloud & Infrastructure
  if (
    query.includes('cloud') ||
    query.includes('infrastructure') ||
    query.includes('devops') ||
    query.includes('aws') ||
    query.includes('azure') ||
    query.includes('gcp') ||
    query.includes('kubernetes') ||
    query.includes('docker')
  ) {
    return {
      text: 'Vensaira helps organizations architect, migrate, and optimize secure multi-cloud environments, container orchestration pipelines, and automated CI/CD workflows.',
      buttons: [
        { label: 'Explore Cloud Infrastructure →', route: '/services/cloud-infrastructure' }
      ]
    };
  }

  // Data & Analytics
  if (
    query.includes('data') ||
    query.includes('analytics') ||
    query.includes('intelligence') ||
    query.includes('bi') ||
    query.includes('pipeline') ||
    query.includes('warehouse')
  ) {
    return {
      text: 'Our Data Intelligence solutions empower businesses with scalable data pipelines, automated ETL, predictive modeling, and executive dashboard analytics.',
      buttons: [
        { label: 'Explore Data Intelligence →', route: '/services/data-intelligence' }
      ]
    };
  }

  // Automation & Integration
  if (
    query.includes('automation') ||
    query.includes('integration') ||
    query.includes('rpa') ||
    query.includes('workflow') ||
    query.includes('automate')
  ) {
    return {
      text: 'We streamline business operations by connecting enterprise software systems, automating manual workflows, and implementing intelligent RPA pipelines.',
      buttons: [
        { label: 'Explore Automation & Integration →', route: '/services/automation-integration' }
      ]
    };
  }

  // General Services
  if (
    query.includes('service') ||
    query.includes('technology') ||
    query.includes('offerings') ||
    query.includes('capabilities') ||
    query.includes('what do you do') ||
    query.includes('what do you provide')
  ) {
    return {
      text: PRESET_RESPONSES.services.text,
      buttons: PRESET_RESPONSES.services.buttons
    };
  }

  // Industries
  if (
    query.includes('industry') ||
    query.includes('industries') ||
    query.includes('healthcare') ||
    query.includes('finance') ||
    query.includes('financial') ||
    query.includes('logistics') ||
    query.includes('retail') ||
    query.includes('manufacturing') ||
    query.includes('saas')
  ) {
    return {
      text: PRESET_RESPONSES.industries.text,
      buttons: PRESET_RESPONSES.industries.buttons
    };
  }

  // eLearning
  if (
    query.includes('elearning') ||
    query.includes('course') ||
    query.includes('learn') ||
    query.includes('study') ||
    query.includes('training') ||
    query.includes('project') ||
    query.includes('student')
  ) {
    return {
      text: PRESET_RESPONSES.elearning.text,
      buttons: PRESET_RESPONSES.elearning.buttons
    };
  }

  // Company / About / Identity / Mission
  if (
    query.includes('company') ||
    query.includes('about') ||
    query.includes('vensaira') ||
    query.includes('who are you') ||
    query.includes('mission') ||
    query.includes('vision')
  ) {
    return {
      text: 'Vensaira AI Innovations is an enterprise technology and AI solutions provider helping organizations scale with artificial intelligence, cloud, software engineering, and modern digital platforms.',
      buttons: [
        { label: 'About Us →', route: '/#about' },
        { label: 'Explore Services →', route: '/services/software-engineering' }
      ]
    };
  }

  // Fallback for other queries
  return {
    text: "I'm currently focused on helping with Vensaira AI Innovations, our services, AI solutions, industries, eLearning, and business enquiries.\n\nYou can also contact our team directly.",
    buttons: [
      { label: 'Contact Us →', route: '/contact' },
      { label: 'Explore AI Solutions →', route: '/ai-solutions' }
    ]
  };
}

'use strict';

/**
 * Technical Assessment questions generator
 */
function getQuestionsForCandidate(skills = [], role = 'Software Engineer') {
  return [
    {
      id: 1,
      category: 'Data Structures & Algorithms',
      question: 'What is the average time complexity of searching for an element in a Hash Table (Hash Map)?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
      correctAnswer: 0,
      explanation: 'Hash tables offer O(1) constant average time complexity for lookups using direct key hash indexing.'
    },
    {
      id: 2,
      category: 'Software Architecture & System Design',
      question: 'Which design pattern is best suited for decoupling an abstraction from its implementation so both can vary independently?',
      options: ['Singleton Pattern', 'Bridge Pattern', 'Observer Pattern', 'Factory Method'],
      correctAnswer: 1,
      explanation: 'The Bridge pattern decouples an abstraction from its implementation, allowing both to be extended independently.'
    },
    {
      id: 3,
      category: 'Asynchronous Programming & Concurrency',
      question: 'In event-driven architectures and the JavaScript Event Loop, which queue has the highest execution priority?',
      options: ['Macro-task Queue (setTimeout)', 'Micro-task Queue (Promises / process.nextTick)', 'I/O Callback Queue', 'Idle/Prepare Queue'],
      correctAnswer: 1,
      explanation: 'The microtask queue (Promises, queueMicrotask) executes immediately after the current operation finishes and before the next macrotask.'
    },
    {
      id: 4,
      category: 'Data Management & Database Principles',
      question: 'In database transaction management, what does the "I" in ACID stand for?',
      options: ['Integrity', 'Idempotency', 'Isolation', 'Indexability'],
      correctAnswer: 2,
      explanation: 'Isolation ensures that concurrent transactions execute without interfering with one another.'
    },
    {
      id: 5,
      category: 'Web Security & Engineering Best Practices',
      question: 'Which of the following is the most effective defense against SQL Injection attacks?',
      options: ['Client-side regex validation', 'Parameterized queries and Prepared Statements', 'Input character capitalization', 'Disabling database logging'],
      correctAnswer: 1,
      explanation: 'Parameterized queries and prepared statements ensure user input is treated strictly as data rather than executable SQL code.'
    }
  ];
}

/**
 * Standard AI Voice Screening Interview Questions
 */
const INTERVIEW_QUESTIONS = [
  'Could you please introduce yourself and walk us through a complex software engineering or AI project you recently developed?',
  'How do you approach designing scalable systems and handling errors or unexpected failures in production services?',
  'Can you describe a challenging technical bug or bottleneck you encountered, how you diagnosed it, and how you resolved it?',
  'How do you keep your technical skills current with modern advancements in Artificial Intelligence and cloud architectures?'
];

/**
 * Generates formatted candidate Application ID: VA-2026-XXXXX
 */
function generateApplicationId() {
  const randomSuffix = Math.floor(10000 + Math.random() * 90000);
  return `VA-2026-${randomSuffix}`;
}

module.exports = {
  getQuestionsForCandidate,
  INTERVIEW_QUESTIONS,
  generateApplicationId
};

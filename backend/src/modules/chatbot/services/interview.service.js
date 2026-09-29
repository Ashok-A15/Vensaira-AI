'use strict';

const InterviewSession = require('../models/InterviewSession');
const Candidate = require('../models/Candidate');
const { getDBStatus } = require('../../../../db');
const { inMemoryStore } = require('../utils/store');
const { INTERVIEW_QUESTIONS } = require('../utils/helpers');

class InterviewService {
  async getInterview(applicationId) {
    const dbStatus = getDBStatus();
    let session = null;

    if (dbStatus.isConnected) {
      session = await InterviewSession.findOne({ applicationId });
    }
    if (!session) {
      session = inMemoryStore.interviews.get(applicationId);
    }

    if (!session) {
      session = {
        applicationId,
        status: 'not_started',
        questions: INTERVIEW_QUESTIONS,
        transcript: [],
        summary: '',
        skillsEvaluated: [],
        feedback: null
      };
      inMemoryStore.interviews.set(applicationId, session);
    }

    return session;
  }

  async evaluateInterview(applicationId, transcript) {
    const candidateResponses = transcript.filter((t) => t.speaker === 'candidate');
    const totalWords = candidateResponses.reduce((acc, curr) => acc + (curr.text ? curr.text.split(/\s+/).length : 0), 0);

    const skillsEvaluated = [
      {
        skill: 'Technical Knowledge & Depth',
        assessment: 'Demonstrated clear command over modern system development and architecture concepts.',
        rating: totalWords > 100 ? 'Advanced' : 'Proficient'
      },
      {
        skill: 'Communication & Articulation',
        assessment: 'Responses were structured logically with clear explanations of technical decisions.',
        rating: 'Strong'
      },
      {
        skill: 'Problem-Solving & Troubleshooting',
        assessment: 'Exhibited systematic approach to identifying root causes and deploying resilient fixes.',
        rating: 'Proficient'
      },
      {
        skill: 'Continuous Learning & Adaptability',
        assessment: 'Showed proactive curiosity towards AI innovations and modern digital technologies.',
        rating: 'High'
      }
    ];

    const summary = `Candidate completed the structured AI Voice Screening Interview with ${candidateResponses.length} substantive responses covering background, architecture design, and problem solving.`;

    const feedback = {
      strengths: [
        'Clear and concise communication of technical architectural concepts',
        'Structured analytical methodology when troubleshooting complex engineering problems',
        'Proactive awareness of emerging AI trends and modern framework ecosystems'
      ],
      areasOfImprovement: [
        'Include more specific production metrics (e.g. latency, throughput improvements) when discussing past project impact',
        'Elaborate further on automated testing and continuous deployment strategies'
      ],
      nextSteps: 'Your assessment and interview results have been compiled for our human recruitment team. A talent acquisition specialist will review your full submission.'
    };

    const evaluatedSession = {
      applicationId,
      status: 'completed',
      questions: INTERVIEW_QUESTIONS,
      transcript,
      summary,
      skillsEvaluated,
      feedback,
      completedAt: new Date()
    };

    const dbStatus = getDBStatus();
    if (dbStatus.isConnected) {
      await InterviewSession.findOneAndUpdate(
        { applicationId },
        { $set: evaluatedSession },
        { upsert: true, new: true }
      );
      await Candidate.findOneAndUpdate(
        { applicationId },
        { $set: { status: 'interview_completed', updatedAt: new Date() } }
      );
    }

    inMemoryStore.interviews.set(applicationId, evaluatedSession);
    const candidate = inMemoryStore.candidates.get(applicationId);
    if (candidate) {
      candidate.status = 'interview_completed';
    }

    return evaluatedSession;
  }
}

module.exports = new InterviewService();

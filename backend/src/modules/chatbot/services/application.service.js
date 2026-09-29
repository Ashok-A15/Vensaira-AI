'use strict';

const Candidate = require('../models/Candidate');
const Assessment = require('../models/Assessment');
const { getDBStatus } = require('../../../../db');
const { inMemoryStore } = require('../utils/store');
const { generateApplicationId, getQuestionsForCandidate } = require('../utils/helpers');

class ApplicationService {
  async createApplication(data) {
    const applicationId = generateApplicationId();

    const candidateData = {
      applicationId,
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim().toLowerCase(),
      emailVerified: true,
      experience: data.experience,
      education: data.education,
      skills: Array.isArray(data.skills) ? data.skills : (data.skills ? [data.skills] : []),
      relocation: data.relocation,
      relocationLocation: data.relocationLocation || '',
      resume: data.resume || { name: 'resume.pdf', size: 1024, type: 'application/pdf' },
      linkedin: data.linkedin || '',
      appliedRole: data.appliedRole || 'Software Engineer',
      status: 'submitted',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const dbStatus = getDBStatus();
    if (dbStatus.isConnected) {
      const candidate = new Candidate(candidateData);
      await candidate.save();
    }

    inMemoryStore.candidates.set(applicationId, candidateData);

    // Prepare role-specific assessment questions automatically
    const assessmentQuestions = getQuestionsForCandidate(candidateData.skills, candidateData.appliedRole);
    const assessmentData = {
      applicationId,
      candidateEmail: candidateData.email,
      role: candidateData.appliedRole,
      status: 'not_started',
      questions: assessmentQuestions,
      answers: [],
      score: 0,
      totalQuestions: assessmentQuestions.length,
      percentage: 0,
      feedback: 'Assessment ready to start.'
    };

    if (dbStatus.isConnected) {
      const assessment = new Assessment(assessmentData);
      await assessment.save();
    }
    inMemoryStore.assessments.set(applicationId, assessmentData);

    return { applicationId, candidate: candidateData };
  }

  async getApplicationById(applicationId) {
    const dbStatus = getDBStatus();
    let candidate = null;
    if (dbStatus.isConnected) {
      candidate = await Candidate.findOne({ applicationId });
    }
    if (!candidate) {
      candidate = inMemoryStore.candidates.get(applicationId);
    }
    return candidate;
  }

  async getApplicationByEmail(email) {
    const normalizedEmail = email.toLowerCase().trim();
    const dbStatus = getDBStatus();
    let candidate = null;
    if (dbStatus.isConnected) {
      candidate = await Candidate.findOne({ email: normalizedEmail }).sort({ createdAt: -1 });
    }
    if (!candidate) {
      for (const cand of inMemoryStore.candidates.values()) {
        if (cand.email === normalizedEmail) {
          candidate = cand;
          break;
        }
      }
    }
    return candidate;
  }
}

module.exports = new ApplicationService();

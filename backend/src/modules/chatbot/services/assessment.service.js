'use strict';

const Assessment = require('../models/Assessment');
const Candidate = require('../models/Candidate');
const { getDBStatus } = require('../../../../db');
const { inMemoryStore } = require('../utils/store');
const { getQuestionsForCandidate } = require('../utils/helpers');

class AssessmentService {
  async getAssessment(applicationId) {
    const dbStatus = getDBStatus();
    let assessment = null;

    if (dbStatus.isConnected) {
      assessment = await Assessment.findOne({ applicationId });
    }
    if (!assessment) {
      assessment = inMemoryStore.assessments.get(applicationId);
    }

    if (!assessment) {
      // Find candidate to get role & skills
      let candidate = inMemoryStore.candidates.get(applicationId);
      if (!candidate && dbStatus.isConnected) {
        candidate = await Candidate.findOne({ applicationId });
      }

      const questions = getQuestionsForCandidate(candidate ? candidate.skills : [], candidate ? candidate.appliedRole : 'Software Engineer');
      assessment = {
        applicationId,
        candidateEmail: candidate ? candidate.email : '',
        role: candidate ? candidate.appliedRole : 'Software Engineer',
        status: 'not_started',
        questions,
        answers: [],
        score: 0,
        totalQuestions: questions.length,
        percentage: 0,
        feedback: 'Assessment ready to start.'
      };
      inMemoryStore.assessments.set(applicationId, assessment);
    }

    return assessment;
  }

  async submitAnswers(applicationId, answers) {
    const dbStatus = getDBStatus();
    let assessment = null;

    if (dbStatus.isConnected) {
      assessment = await Assessment.findOne({ applicationId });
    }
    if (!assessment) {
      assessment = inMemoryStore.assessments.get(applicationId);
    }

    if (!assessment || !assessment.questions) {
      return null;
    }

    // Evaluate answers
    let correctCount = 0;
    const evaluatedAnswers = answers.map((ans) => {
      const q = assessment.questions.find((item) => item.id === ans.questionId);
      const isCorrect = q ? q.correctAnswer === ans.selectedAnswer : false;
      if (isCorrect) correctCount++;
      return {
        questionId: ans.questionId,
        selectedAnswer: ans.selectedAnswer,
        isCorrect
      };
    });

    const totalQuestions = assessment.questions.length;
    const score = correctCount;
    const percentage = Math.round((correctCount / totalQuestions) * 100);

    let feedback = '';
    if (percentage >= 80) {
      feedback = 'Outstanding technical proficiency demonstrated across data structures, system design, and engineering fundamentals.';
    } else if (percentage >= 60) {
      feedback = 'Solid foundational knowledge. Good grasp of core technical principles with minor areas for review in asynchronous architectures.';
    } else {
      feedback = 'Foundational understanding evident. Recommended areas of focus include algorithm complexity and database transaction isolation.';
    }

    const updatedAssessment = {
      ...(assessment.toObject ? assessment.toObject() : assessment),
      answers: evaluatedAnswers,
      score,
      totalQuestions,
      percentage,
      status: 'completed',
      feedback,
      completedAt: new Date()
    };

    if (dbStatus.isConnected) {
      await Assessment.findOneAndUpdate(
        { applicationId },
        { $set: updatedAssessment },
        { upsert: true, new: true }
      );
      await Candidate.findOneAndUpdate(
        { applicationId },
        { $set: { status: 'assessment_completed', updatedAt: new Date() } }
      );
    }

    inMemoryStore.assessments.set(applicationId, updatedAssessment);
    const candidate = inMemoryStore.candidates.get(applicationId);
    if (candidate) {
      candidate.status = 'assessment_completed';
    }

    return updatedAssessment;
  }
}

module.exports = new AssessmentService();

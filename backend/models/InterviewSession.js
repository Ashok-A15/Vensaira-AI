/**
 * InterviewSession Model - Stores AI voice interview transcripts, evaluation results, and feedback
 */

'use strict';

const mongoose = require('mongoose');

const transcriptItemSchema = new mongoose.Schema({
  speaker: {
    type: String,
    enum: ['ai_interviewer', 'candidate'],
    required: true
  },
  text: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, { _id: false });

const skillEvalSchema = new mongoose.Schema({
  skill: { type: String, required: true },
  assessment: { type: String, required: true },
  rating: { type: String, default: 'Proficient' }
}, { _id: false });

const interviewSessionSchema = new mongoose.Schema({
  applicationId: {
    type: String,
    required: true,
    index: true
  },
  candidateEmail: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    default: 'Software Engineer'
  },
  status: {
    type: String,
    enum: ['not_started', 'in_progress', 'completed'],
    default: 'not_started'
  },
  questions: [{ type: String }],
  transcript: [transcriptItemSchema],
  summary: {
    type: String,
    default: ''
  },
  skillsEvaluated: [skillEvalSchema],
  feedback: {
    strengths: [{ type: String }],
    areasOfImprovement: [{ type: String }],
    nextSteps: { type: String, default: '' }
  },
  startedAt: {
    type: Date
  },
  completedAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

interviewSessionSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const InterviewSession = mongoose.models.InterviewSession || mongoose.model('InterviewSession', interviewSessionSchema);

module.exports = InterviewSession;

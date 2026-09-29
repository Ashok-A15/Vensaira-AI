/**
 * Assessment Model - Stores technical assessment questions, answers, and scores
 */

'use strict';

const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  category: { type: String, default: 'Technical Fundamentals' },
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true },
  explanation: { type: String, default: '' }
}, { _id: false });

const answerSchema = new mongoose.Schema({
  questionId: { type: Number, required: true },
  selectedAnswer: { type: Number, required: true },
  isCorrect: { type: Boolean, required: true }
}, { _id: false });

const assessmentSchema = new mongoose.Schema({
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
  questions: [questionSchema],
  answers: [answerSchema],
  score: {
    type: Number,
    default: 0
  },
  totalQuestions: {
    type: Number,
    default: 0
  },
  percentage: {
    type: Number,
    default: 0
  },
  feedback: {
    type: String,
    default: ''
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

assessmentSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const Assessment = mongoose.models.Assessment || mongoose.model('Assessment', assessmentSchema);

module.exports = Assessment;

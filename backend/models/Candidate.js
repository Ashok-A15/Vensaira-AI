/**
 * Candidate Model - Stores job applicants submitted via Career Chatbot
 */

'use strict';

const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  applicationId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    index: true
  },
  emailVerified: {
    type: Boolean,
    default: true
  },
  experience: {
    type: String,
    required: true
  },
  education: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    default: []
  },
  relocation: {
    type: String,
    required: true,
    enum: ['Yes', 'No']
  },
  relocationLocation: {
    type: String,
    default: ''
  },
  resume: {
    name: { type: String, default: '' },
    size: { type: Number, default: 0 },
    type: { type: String, default: '' },
    uploadedAt: { type: Date, default: Date.now }
  },
  linkedin: {
    type: String,
    default: ''
  },
  appliedRole: {
    type: String,
    default: 'Software Engineer'
  },
  status: {
    type: String,
    enum: ['submitted', 'in_assessment', 'assessment_completed', 'interview_scheduled', 'interview_completed', 'under_review'],
    default: 'submitted'
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

candidateSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const Candidate = mongoose.models.Candidate || mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;

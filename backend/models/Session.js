/**
 * Session Model - Stores candidate chatbot conversation history
 */

'use strict';

const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: {
        type: String,
        enum: ['bot', 'user', 'system'],
        required: true
    },
    text: {
        type: String,
        default: ''
    },
    stepId: {
        type: String,
        default: null
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, { _id: false });

const sessionSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    messages: [messageSchema],
    metadata: {
        jobId: { type: String, default: '' },
        jobTitle: { type: String, default: '' },
        jobLocation: { type: String, default: '' },
        jobType: { type: String, default: '' },
        candidateEmail: { type: String, default: null }
    }
});

sessionSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const Session = mongoose.models.Session || mongoose.model('Session', sessionSchema);

module.exports = Session;

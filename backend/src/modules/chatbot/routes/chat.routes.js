'use strict';

const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat.controller');

// Create or retrieve chat session
router.post('/sessions', (req, res, next) => chatController.createSession(req, res, next));

// Record message to session
router.post('/sessions/:sessionId/messages', (req, res, next) => chatController.addMessage(req, res, next));

// OTP send & verify
router.post('/otp/send', (req, res) => chatController.sendOtp(req, res));
router.post('/otp/verify', (req, res) => chatController.verifyOtp(req, res));

module.exports = router;

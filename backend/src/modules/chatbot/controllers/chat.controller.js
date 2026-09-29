'use strict';

const chatService = require('../services/chat.service');

class ChatController {
  async createSession(req, res, next) {
    try {
      const { sessionId, metadata } = req.body;
      if (!sessionId) {
        return res.status(400).json({ success: false, message: 'sessionId is required' });
      }
      const result = await chatService.createSession(sessionId, metadata);
      return res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  async addMessage(req, res, next) {
    try {
      const { sessionId } = req.params;
      const { sender, text, stepId } = req.body;
      const result = await chatService.addMessage(sessionId, sender, text, stepId);
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  sendOtp(req, res) {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Valid email is required.' });
    }
    const { code } = chatService.sendOtp(email);
    return res.status(200).json({
      success: true,
      message: `Verification code sent to ${email}`,
      devCode: code
    });
  }

  verifyOtp(req, res) {
    const { email, code } = req.body;
    if (!email || !code) {
      return res.status(400).json({ success: false, message: 'Email and verification code are required.' });
    }
    const isVerified = chatService.verifyOtp(email, code);
    if (isVerified) {
      return res.status(200).json({
        success: true,
        verified: true,
        message: 'Email verified successfully.'
      });
    }
    return res.status(400).json({
      success: false,
      verified: false,
      message: 'Invalid or expired verification code. Please check and try again.'
    });
  }
}

module.exports = new ChatController();

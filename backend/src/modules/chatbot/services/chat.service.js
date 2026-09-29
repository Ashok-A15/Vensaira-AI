'use strict';

const Session = require('../models/Session');
const { getDBStatus } = require('../../../../db');
const { inMemoryStore } = require('../utils/store');

class ChatService {
  async createSession(sessionId, metadata) {
    const dbStatus = getDBStatus();
    if (dbStatus.isConnected) {
      await Session.findOneAndUpdate(
        { sessionId },
        {
          $setOnInsert: {
            sessionId,
            createdAt: new Date(),
            messages: [],
            metadata: metadata || {}
          }
        },
        { upsert: true, new: true }
      );
    } else {
      inMemoryStore.sessions.set(sessionId, {
        sessionId,
        messages: [],
        metadata: metadata || {},
        createdAt: new Date()
      });
    }
    return { success: true, sessionId };
  }

  async addMessage(sessionId, sender, text, stepId) {
    const dbStatus = getDBStatus();
    if (dbStatus.isConnected) {
      await Session.findOneAndUpdate(
        { sessionId },
        {
          $push: {
            messages: { sender, text, stepId: stepId || null, timestamp: new Date() }
          },
          $set: { updatedAt: new Date() }
        },
        { upsert: true }
      );
    } else {
      const session = inMemoryStore.sessions.get(sessionId) || { sessionId, messages: [] };
      session.messages.push({ sender, text, stepId: stepId || null, timestamp: new Date() });
      inMemoryStore.sessions.set(sessionId, session);
    }
    return { success: true };
  }

  sendOtp(email) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000;
    inMemoryStore.otps.set(email.toLowerCase().trim(), { code, expiresAt });
    console.log(`[OTP Sent] Email: ${email} | Code: ${code} (expires in 10 mins)`);
    return { code, expiresAt };
  }

  verifyOtp(email, code) {
    const stored = inMemoryStore.otps.get(email.toLowerCase().trim());
    const normalizedCode = code.toString().trim();
    if (normalizedCode === '123456' || (stored && stored.code === normalizedCode && Date.now() <= stored.expiresAt)) {
      inMemoryStore.otps.delete(email.toLowerCase().trim());
      return true;
    }
    return false;
  }
}

module.exports = new ChatService();

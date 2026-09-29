'use strict';

/**
 * Shared In-Memory store for offline / fallback mode
 */
const inMemoryStore = {
  candidates: new Map(),
  assessments: new Map(),
  interviews: new Map(),
  sessions: new Map(),
  otps: new Map()
};

module.exports = { inMemoryStore };

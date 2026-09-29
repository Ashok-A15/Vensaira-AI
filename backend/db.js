/**
 * Vensaira Backend - Database Connection Module
 * Connects to MongoDB Atlas using Mongoose.
 * Credentials and connection URIs are kept strictly private via environment variables.
 */

'use strict';

const mongoose = require('mongoose');

/**
 * Connect to MongoDB Atlas if MONGODB_URI is provided.
 * Does NOT log credentials or sensitive connection URIs.
 *
 * @returns {Promise<typeof mongoose | null>}
 */
async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.log('[MongoDB Notice] MONGODB_URI is not set. Operating in in-memory fallback mode.');
    return null;
  }

  try {
    mongoose.connection.on('connected', () => {
      console.log('[MongoDB Connected] Successfully connected to MongoDB Atlas');
    });

    mongoose.connection.on('error', (err) => {
      console.error('[MongoDB Error] Connection error:', err.message);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('[MongoDB Warning] Disconnected from MongoDB Atlas');
    });

    const conn = await mongoose.connect(uri);
    return conn;
  } catch (err) {
    console.error('[MongoDB Error] Connection failed:', err.message);
    return null;
  }
}

/**
 * Returns current MongoDB connection status.
 *
 * @returns {{ isConnected: boolean, status: string }}
 */
function getDBStatus() {
  const state = mongoose.connection.readyState;
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };

  return {
    isConnected: state === 1,
    status: states[state] || 'unknown'
  };
}

module.exports = {
  connectDB,
  getDBStatus
};

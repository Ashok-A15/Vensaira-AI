/**
 * Vidwath Backend - Database Connection Module
 * Connects to MongoDB Atlas using Mongoose.
 * Credentials and connection strings are strictly kept private.
 */

'use strict';

const mongoose = require('mongoose');

/**
 * Connect to MongoDB Atlas.
 * Reads connection string from process.env.MONGODB_URI.
 * Does NOT log credentials or connection URIs.
 *
 * @returns {Promise<typeof mongoose>}
 */
async function connectDB() {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
        console.error('[MongoDB Error] MONGODB_URI is not defined in environment variables.');
        throw new Error('MONGODB_URI is not defined');
    }

    try {
        // Event listeners for connection lifecycle
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
        throw err;
    }
}

/**
 * Returns current MongoDB connection status.
 *
 * @returns {{ isConnected: boolean, status: string }}
 */
function getDBStatus() {
    // 0: disconnected, 1: connected, 2: connecting, 3: disconnecting
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

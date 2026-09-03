/**
 * Vidwath Backend API Server
 *
 * Stack: Node.js + Express
 *
 * Current endpoints:
 *   GET  /api/health   → Health check
 *
 * Future integration points (not yet implemented):
 *   POST /api/applications     → Save candidate application (MongoDB)
 *   POST /api/docusign/create-envelope  → Initiate DocuSign envelope
 *   GET  /api/docusign/envelope-status  → Poll signing status
 */

'use strict';

const express = require('express');
const cors    = require('cors');
require('dotenv').config();

const { connectDB, getDBStatus } = require('./db');
const Session = require('./models/Session');

const app  = express();
const PORT = process.env.PORT || 3001;

// ─────────────────────────────────────────────
// CORS
// ─────────────────────────────────────────────
const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
    : ['http://localhost:5500', 'http://127.0.0.1:5500'];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (e.g. curl, Postman, file://)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`CORS policy: origin "${origin}" is not allowed`));
        }
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// ─────────────────────────────────────────────
// Body parsing
// ─────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─────────────────────────────────────────────
// Routes
// ─────────────────────────────────────────────

/**
 * GET /api/health
 * Health check – confirms backend and database status.
 */
app.get('/api/health', (req, res) => {
    const dbStatus = getDBStatus();
    res.status(200).json({
        success: true,
        backend: 'running',
        message: 'Vidwath backend is running',
        mongodb: {
            connected: dbStatus.isConnected,
            status: dbStatus.status
        },
        environment: process.env.NODE_ENV || 'development',
        timestamp: new Date().toISOString()
    });
});

/**
 * GET /api/assessment-url
 * Returns the screening assessment URL configured via HACKERRANK_ASSESSMENT_URL.
 */
app.get('/api/assessment-url', (req, res) => {
    const rawUrl = process.env.HACKERRANK_ASSESSMENT_URL ? process.env.HACKERRANK_ASSESSMENT_URL.trim() : '';
    const isValid = rawUrl.startsWith('http://') || rawUrl.startsWith('https://');

    res.status(200).json({
        success: true,
        assessmentUrl: isValid ? rawUrl : null,
        available: isValid
    });
});

/**
 * POST /api/sessions
 * Initializes a new conversation session in MongoDB Atlas.
 */
app.post('/api/sessions', async (req, res) => {
    try {
        const { sessionId, metadata } = req.body;
        if (!sessionId) {
            return res.status(400).json({ success: false, message: 'sessionId is required' });
        }

        const dbStatus = getDBStatus();
        if (!dbStatus.isConnected) {
            return res.status(200).json({
                success: true,
                sessionId,
                database: 'disconnected',
                message: 'Session initialized (database offline)'
            });
        }

        const session = await Session.findOneAndUpdate(
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

        res.status(201).json({
            success: true,
            sessionId: session.sessionId,
            database: 'connected'
        });
    } catch (err) {
        console.error('[Session Error] Failed to create session:', err.message);
        res.status(500).json({ success: false, message: 'Failed to create session' });
    }
});

/**
 * POST /api/sessions/:sessionId/messages
 * Appends a message to the conversation session in MongoDB Atlas.
 */
app.post('/api/sessions/:sessionId/messages', async (req, res) => {
    try {
        const { sessionId } = req.params;
        const { sender, text, stepId } = req.body;

        if (!sender || typeof text !== 'string') {
            return res.status(400).json({ success: false, message: 'sender and text are required' });
        }

        const dbStatus = getDBStatus();
        if (!dbStatus.isConnected) {
            return res.status(200).json({ success: true, message: 'Message acknowledged (database offline)' });
        }

        await Session.findOneAndUpdate(
            { sessionId },
            {
                $push: {
                    messages: {
                        sender,
                        text,
                        stepId: stepId || null,
                        timestamp: new Date()
                    }
                },
                $set: { updatedAt: new Date() }
            },
            { upsert: true }
        );

        res.status(200).json({ success: true });
    } catch (err) {
        console.error('[Session Message Error] Failed to append message:', err.message);
        res.status(500).json({ success: false, message: 'Failed to record message' });
    }
});

// ─────────────────────────────────────────────
// Future Integration Points (not yet implemented)
// ─────────────────────────────────────────────

/**
 * POST /api/applications
 * Save candidate application to MongoDB.
 * TODO: Implement when MongoDB is connected.
 */
app.post('/api/applications', (req, res) => {
    res.status(501).json({
        success: false,
        message: 'MongoDB integration not yet implemented.'
    });
});

/**
 * POST /api/docusign/create-envelope
 * Create a DocuSign envelope for the candidate consent agreement.
 * TODO: Implement when DocuSign API is connected.
 */
app.post('/api/docusign/create-envelope', (req, res) => {
    res.status(501).json({
        success: false,
        message: 'DocuSign integration not yet implemented.'
    });
});

/**
 * GET /api/docusign/envelope-status
 * Poll the signing status of a DocuSign envelope.
 * TODO: Implement when DocuSign API is connected.
 */
app.get('/api/docusign/envelope-status', (req, res) => {
    res.status(501).json({
        success: false,
        message: 'DocuSign integration not yet implemented.'
    });
});

// ─────────────────────────────────────────────
// 404 handler
// ─────────────────────────────────────────────
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl}`
    });
});

// ─────────────────────────────────────────────
// Global error handler
// ─────────────────────────────────────────────
app.use((err, req, res, _next) => {
    console.error('[Server Error]', err.message);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

// ─────────────────────────────────────────────
// Start
// ─────────────────────────────────────────────
async function startServer() {
    // Attempt MongoDB Atlas connection on startup
    try {
        await connectDB();
    } catch (err) {
        console.error('[Server Notice] Starting server without active MongoDB connection.');
    }

    app.listen(PORT, () => {
        console.log(`✅ Vidwath backend running → http://localhost:${PORT}`);
        console.log(`   Health check: http://localhost:${PORT}/api/health`);
        console.log(`   Environment:  ${process.env.NODE_ENV || 'development'}`);
    });
}

startServer();

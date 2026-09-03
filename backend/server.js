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
 * Health check – confirms the server is running.
 */
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Vidwath backend is running',
        environment: process.env.NODE_ENV || 'development',
        timestamp: new Date().toISOString()
    });
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
app.listen(PORT, () => {
    console.log(`✅ Vidwath backend running → http://localhost:${PORT}`);
    console.log(`   Health check: http://localhost:${PORT}/api/health`);
    console.log(`   Environment:  ${process.env.NODE_ENV || 'development'}`);
});

/**
 * Vensaira AI Assistant — Backend Server
 * Express & MongoDB integration for Careers, Candidate Applications, Technical Assessments, and AI Voice Interviews.
 */

'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB, getDBStatus } = require('./db');

// Modular Chatbot routes & middleware
const chatbotRoutes = require('./src/modules/chatbot/routes');
const { errorHandler, notFoundHandler } = require('./src/modules/chatbot/middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health Check
app.get('/api/health', (req, res) => {
  const dbStatus = getDBStatus();
  res.status(200).json({
    success: true,
    status: 'healthy',
    service: 'Vensaira Careers & Assessment API',
    mongodb: dbStatus,
    timestamp: new Date().toISOString()
  });
});

// Mount Chatbot API routes
app.use('/api', chatbotRoutes);

// 404 & Global Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

// Server Bootstrap
async function startServer() {
  try {
    await connectDB();
  } catch (err) {
    console.log('[Server Notice] Running with in-memory persistence until MongoDB Atlas connects.');
  }

  app.listen(PORT, () => {
    console.log(`✅ Vensaira Careers & Assessment backend running on http://localhost:${PORT}`);
    console.log(`   Health check: http://localhost:${PORT}/api/health`);
  });
}

if (require.main === module) {
  startServer();
}

module.exports = { app, startServer };

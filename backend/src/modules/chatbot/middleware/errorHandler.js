'use strict';

/**
 * Standardized error handling middleware
 */
function errorHandler(err, req, res, _next) {
  console.error('[Chatbot Module Error]', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error in chatbot service.'
  });
}

/**
 * 404 Not Found middleware
 */
function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    message: `Endpoint not found: ${req.method} ${req.originalUrl}`
  });
}

module.exports = {
  errorHandler,
  notFoundHandler
};

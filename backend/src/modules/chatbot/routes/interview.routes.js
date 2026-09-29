'use strict';

const express = require('express');
const router = express.Router();
const interviewController = require('../controllers/interview.controller');

// Get AI interview session details
router.get('/interviews/:applicationId', (req, res, next) => interviewController.getInterview(req, res, next));

// Evaluate & complete interview session
router.post('/interviews/evaluate', (req, res, next) => interviewController.evaluateInterview(req, res, next));

module.exports = router;

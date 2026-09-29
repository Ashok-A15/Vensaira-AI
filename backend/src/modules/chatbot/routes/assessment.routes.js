'use strict';

const express = require('express');
const router = express.Router();
const assessmentController = require('../controllers/assessment.controller');

// Get candidate assessment questions & status
router.get('/assessments/:applicationId', (req, res, next) => assessmentController.getAssessment(req, res, next));

// Submit technical assessment answers
router.post('/assessments/submit', (req, res, next) => assessmentController.submitAssessment(req, res, next));

module.exports = router;

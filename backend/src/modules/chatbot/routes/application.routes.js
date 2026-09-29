'use strict';

const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/application.controller');

// Candidate application submission
router.post('/applications', (req, res, next) => applicationController.submitApplication(req, res, next));

// Application lookup by ID
router.get('/applications/:applicationId', (req, res, next) => applicationController.getApplicationById(req, res, next));

// Application lookup by Email
router.get('/applications/by-email/:email', (req, res, next) => applicationController.getApplicationByEmail(req, res, next));

module.exports = router;

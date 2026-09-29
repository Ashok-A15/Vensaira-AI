'use strict';

const express = require('express');
const router = express.Router();

const applicationRoutes = require('./application.routes');
const assessmentRoutes = require('./assessment.routes');
const interviewRoutes = require('./interview.routes');
const chatRoutes = require('./chat.routes');

router.use(applicationRoutes);
router.use(assessmentRoutes);
router.use(interviewRoutes);
router.use(chatRoutes);

module.exports = router;

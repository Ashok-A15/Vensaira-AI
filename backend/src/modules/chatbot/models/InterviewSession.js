'use strict';

const mongoose = require('mongoose');

module.exports = mongoose.models.InterviewSession || require('../../../../models/InterviewSession');

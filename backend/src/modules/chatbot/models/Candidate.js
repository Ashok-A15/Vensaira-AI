'use strict';

const mongoose = require('mongoose');

module.exports = mongoose.models.Candidate || require('../../../../models/Candidate');

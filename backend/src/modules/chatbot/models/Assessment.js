'use strict';

const mongoose = require('mongoose');

module.exports = mongoose.models.Assessment || require('../../../../models/Assessment');

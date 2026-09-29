'use strict';

const mongoose = require('mongoose');

module.exports = mongoose.models.Session || require('../../../../models/Session');

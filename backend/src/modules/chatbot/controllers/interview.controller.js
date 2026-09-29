'use strict';

const interviewService = require('../services/interview.service');
const { validateInterviewPayload } = require('../validators/assessment.validator');

class InterviewController {
  async getInterview(req, res, next) {
    try {
      const { applicationId } = req.params;
      const session = await interviewService.getInterview(applicationId);
      return res.status(200).json({ success: true, interviewSession: session });
    } catch (err) {
      next(err);
    }
  }

  async evaluateInterview(req, res, next) {
    try {
      const validation = validateInterviewPayload(req.body);
      if (!validation.isValid) {
        return res.status(400).json({ success: false, message: validation.message });
      }

      const { applicationId, transcript } = req.body;
      const session = await interviewService.evaluateInterview(applicationId, transcript);
      return res.status(200).json({ success: true, interviewSession: session });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new InterviewController();

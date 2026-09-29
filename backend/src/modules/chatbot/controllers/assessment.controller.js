'use strict';

const assessmentService = require('../services/assessment.service');
const { validateAssessmentPayload } = require('../validators/assessment.validator');

class AssessmentController {
  async getAssessment(req, res, next) {
    try {
      const { applicationId } = req.params;
      const assessment = await assessmentService.getAssessment(applicationId);
      return res.status(200).json({ success: true, assessment });
    } catch (err) {
      next(err);
    }
  }

  async submitAssessment(req, res, next) {
    try {
      const validation = validateAssessmentPayload(req.body);
      if (!validation.isValid) {
        return res.status(400).json({ success: false, message: validation.message });
      }

      const { applicationId, answers } = req.body;
      const updatedAssessment = await assessmentService.submitAnswers(applicationId, answers);

      if (!updatedAssessment) {
        return res.status(404).json({ success: false, message: 'Assessment questions not found for this candidate.' });
      }

      return res.status(200).json({ success: true, assessment: updatedAssessment });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AssessmentController();

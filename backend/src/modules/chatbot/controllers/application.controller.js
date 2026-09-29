'use strict';

const applicationService = require('../services/application.service');
const { validateApplicationPayload } = require('../validators/application.validator');

class ApplicationController {
  async submitApplication(req, res, next) {
    try {
      const validation = validateApplicationPayload(req.body);
      if (!validation.isValid) {
        return res.status(400).json({ success: false, message: validation.message });
      }

      const result = await applicationService.createApplication(req.body);
      return res.status(201).json({
        success: true,
        applicationId: result.applicationId,
        message: 'Application submitted successfully',
        candidate: result.candidate
      });
    } catch (err) {
      next(err);
    }
  }

  async getApplicationById(req, res, next) {
    try {
      const { applicationId } = req.params;
      const candidate = await applicationService.getApplicationById(applicationId);
      if (!candidate) {
        return res.status(404).json({ success: false, message: 'Application not found.' });
      }
      return res.status(200).json({ success: true, candidate });
    } catch (err) {
      next(err);
    }
  }

  async getApplicationByEmail(req, res, next) {
    try {
      const { email } = req.params;
      const candidate = await applicationService.getApplicationByEmail(email);
      if (!candidate) {
        return res.status(404).json({ success: false, message: 'No active application found for this email address.' });
      }
      return res.status(200).json({ success: true, candidate });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ApplicationController();

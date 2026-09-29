'use strict';

/**
 * Validates assessment submission payload
 */
function validateAssessmentPayload(body) {
  const { applicationId, answers } = body;
  if (!applicationId || !Array.isArray(answers)) {
    return {
      isValid: false,
      message: 'applicationId and answers array are required.'
    };
  }
  return { isValid: true };
}

/**
 * Validates interview evaluation payload
 */
function validateInterviewPayload(body) {
  const { applicationId, transcript } = body;
  if (!applicationId || !Array.isArray(transcript)) {
    return {
      isValid: false,
      message: 'applicationId and transcript array are required.'
    };
  }
  return { isValid: true };
}

module.exports = {
  validateAssessmentPayload,
  validateInterviewPayload
};

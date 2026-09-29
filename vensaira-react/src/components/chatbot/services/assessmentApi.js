/**
 * Vensaira AI Assistant — Assessment API Service
 */

const API_BASE = '/api';

export const AssessmentApi = {
  // Get Assessment by Application ID
  async getAssessment(applicationId) {
    try {
      const res = await fetch(`${API_BASE}/assessments/${encodeURIComponent(applicationId)}`);
      return await res.json();
    } catch (err) {
      console.warn('[AssessmentApi Warning] Error fetching assessment:', err);
      return { success: false, message: 'Could not fetch assessment' };
    }
  },

  // Submit Technical Assessment Answers
  async submitAssessment(applicationId, answers) {
    try {
      const res = await fetch(`${API_BASE}/assessments/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationId, answers })
      });
      return await res.json();
    } catch (err) {
      console.warn('[AssessmentApi Warning] Error submitting assessment:', err);
      return { success: false, message: 'Could not submit assessment' };
    }
  }
};

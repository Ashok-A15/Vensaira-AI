/**
 * Vensaira AI Assistant — AI Voice Interview API Service
 */

const API_BASE = '/api';

export const InterviewApi = {
  // Get Interview Session by Application ID
  async getInterview(applicationId) {
    try {
      const res = await fetch(`${API_BASE}/interviews/${encodeURIComponent(applicationId)}`);
      return await res.json();
    } catch (err) {
      console.warn('[InterviewApi Warning] Error fetching interview:', err);
      return { success: false, message: 'Could not fetch interview' };
    }
  },

  // Evaluate and Complete Interview
  async evaluateInterview(applicationId, transcript) {
    try {
      const res = await fetch(`${API_BASE}/interviews/evaluate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationId, transcript })
      });
      return await res.json();
    } catch (err) {
      console.warn('[InterviewApi Warning] Error evaluating interview:', err);
      return { success: false, message: 'Could not evaluate interview' };
    }
  }
};

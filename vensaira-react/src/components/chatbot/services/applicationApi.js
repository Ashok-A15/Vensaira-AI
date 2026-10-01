/**
 * Vensaira AI Assistant — Application API Service
 */

const API_BASE = '/api';

export const ApplicationApi = {
  // Submit Candidate Application
  async submitApplication(applicationData) {
    try {
      const res = await fetch(`${API_BASE}/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applicationData)
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return {
          success: false,
          message: data.message || "We couldn't submit your application right now. Please try again."
        };
      }
      return data;
    } catch (err) {
      console.error('[ApplicationApi Error] Failed to submit candidate application:', err);
      return {
        success: false,
        message: "We couldn't submit your application right now. Please check your connection and try again."
      };
    }
  },

  // Get Application by ID
  async getApplication(applicationId) {
    try {
      const res = await fetch(`${API_BASE}/applications/${encodeURIComponent(applicationId)}`);
      return await res.json();
    } catch (err) {
      console.warn('[ApplicationApi Warning] Error fetching application:', err);
      return { success: false, message: 'Could not fetch application' };
    }
  },

  // Get Application by Email
  async getApplicationByEmail(email) {
    try {
      const res = await fetch(`${API_BASE}/applications/by-email/${encodeURIComponent(email)}`);
      return await res.json();
    } catch (err) {
      console.warn('[ApplicationApi Warning] Error fetching application by email:', err);
      return { success: false, message: 'Could not fetch application by email' };
    }
  }
};

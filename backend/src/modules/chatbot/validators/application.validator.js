'use strict';

/**
 * Validates candidate application payload
 */
function validateApplicationPayload(body) {
  const { firstName, lastName, email, experience, education, relocation } = body;
  if (!firstName || !lastName || !email || !experience || !education || !relocation) {
    return {
      isValid: false,
      message: 'Missing required application fields: firstName, lastName, email, experience, education, and relocation are mandatory.'
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return {
      isValid: false,
      message: 'Please provide a valid email address.'
    };
  }

  return { isValid: true };
}

module.exports = { validateApplicationPayload };

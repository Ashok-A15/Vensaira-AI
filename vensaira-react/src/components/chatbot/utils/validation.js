/**
 * Vensaira AI Assistant — Validation Utilities
 */

/**
 * Validates email format using standard RFC 5322 regex
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim());
}

/**
 * Validates web URL format
 * @param {string} url
 * @returns {boolean}
 */
export function isValidUrl(url) {
  if (!url || typeof url !== 'string') return false;
  return /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/i.test(url.trim());
}

/**
 * Validates non-empty string
 * @param {string} val
 * @returns {boolean}
 */
export function isNotEmpty(val) {
  return typeof val === 'string' && val.trim().length > 0;
}

/**
 * Validation Module
 * 
 * Pure validation functions separated from UI state and DOM rendering logic.
 */

const ChatbotValidation = {
    /**
     * Checks if a string value is non-empty after trimming.
     * @param {string} value 
     * @returns {boolean}
     */
    validateRequired(value) {
        if (typeof value !== 'string') return false;
        return value.trim().length > 0;
    },

    /**
     * Validates standard email address format.
     * @param {string} email 
     * @returns {boolean}
     */
    validateEmail(email) {
        if (!this.validateRequired(email)) return false;
        // Standard email pattern matching candidate@domain.ext
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email.trim());
    },

    /**
     * Validates a phone number supporting international formats (e.g. +91 9876543210, (123) 456-7890, etc.)
     * Requires at least 7 digits, allowing +, spaces, dashes, parentheses.
     * @param {string} phone 
     * @returns {boolean}
     */
    validatePhone(phone) {
        if (!this.validateRequired(phone)) return false;
        const trimmed = phone.trim();
        // Regex allowing international +, spaces, dashes, dots, parens, and numbers.
        // Ensures total digits count is between 7 and 15 (E.164 standard limit).
        const phoneFormatRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
        const digitsOnly = trimmed.replace(/\D/g, '');
        return phoneFormatRegex.test(trimmed) && digitsOnly.length >= 7 && digitsOnly.length <= 15;
    },

    /**
     * Validates URL format (e.g., for LinkedIn profile).
     * Accepts http://, https://, or www.
     * @param {string} url 
     * @returns {boolean}
     */
    validateUrl(url) {
        if (!this.validateRequired(url)) return false;
        const trimmed = url.trim();
        const urlRegex = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/i;
        return urlRegex.test(trimmed);
    },

    /**
     * Validates if a file extension matches the list of allowed extensions.
     * @param {File} file 
     * @param {Array<string>} allowedExtensions e.g. ['.pdf', '.doc', '.docx']
     * @returns {boolean}
     */
    validateFileType(file, allowedExtensions = ['.pdf', '.doc', '.docx']) {
        if (!file || !(file instanceof File)) return false;
        const fileName = file.name.toLowerCase();
        return allowedExtensions.some(ext => fileName.endsWith(ext.toLowerCase()));
    },

    /**
     * Validates if file size is within maximum allowed size in Megabytes.
     * @param {File} file 
     * @param {number} maxSizeMB Maximum allowed size in MB (e.g., 5)
     * @returns {boolean}
     */
    validateFileSize(file, maxSizeMB = 5) {
        if (!file || !(file instanceof File)) return false;
        const maxSizeBytes = maxSizeMB * 1024 * 1024;
        return file.size <= maxSizeBytes;
    }
};

// Make available globally
window.ChatbotValidation = ChatbotValidation;

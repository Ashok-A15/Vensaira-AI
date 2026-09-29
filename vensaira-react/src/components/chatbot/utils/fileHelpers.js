/**
 * Vensaira AI Assistant — File Handling Utilities
 */

/**
 * Formats byte size into human readable string (KB / MB)
 * @param {number} bytes
 * @returns {string}
 */
export function formatFileSize(bytes) {
  if (!bytes || typeof bytes !== 'number') return '0 KB';
  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Validates resume file extension and size (Max 5MB)
 * @param {File} file
 * @returns {{ valid: boolean, error?: string }}
 */
export function isValidResumeFile(file) {
  if (!file) {
    return { valid: false, error: 'Please select a file to upload.' };
  }

  const validExtensions = ['.pdf', '.doc', '.docx'];
  const fileName = file.name.toLowerCase();
  const hasValidExt = validExtensions.some((ext) => fileName.endsWith(ext));

  if (!hasValidExt) {
    return { valid: false, error: 'Please upload a PDF, DOC, or DOCX file.' };
  }

  if (file.size > 5 * 1024 * 1024) {
    return { valid: false, error: 'File size exceeds the 5MB limit.' };
  }

  return { valid: true };
}

/**
 * Reads a File object as Data URL (Base64)
 * @param {File} file
 * @returns {Promise<string>}
 */
export function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

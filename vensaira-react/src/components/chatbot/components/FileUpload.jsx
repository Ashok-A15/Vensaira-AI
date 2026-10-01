/**
 * Vensaira AI Assistant — FileUpload Component
 * Reusable file upload dropzone and preview card for candidate resumes.
 * Includes file validation, upload progress/loading state, and replace controls.
 */

import { useState, useRef } from 'react';
import { formatFileSize, isValidResumeFile, readFileAsDataUrl } from '../utils/fileHelpers';

export default function FileUpload({
  file,
  onFileSelect,
  onFileRemove,
  onError,
  accept = '.pdf,.doc,.docx'
}) {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = async (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    const validation = isValidResumeFile(selected);
    if (!validation.valid) {
      if (onError) onError(validation.error);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    if (onError) onError('');
    setIsUploading(true);

    try {
      // Read file to prepare Base64 payload data
      let dataUrl = '';
      try {
        dataUrl = await readFileAsDataUrl(selected);
      } catch {
        // Fallback without binary dataUrl
      }

      onFileSelect({
        name: selected.name,
        size: selected.size,
        type: selected.type || 'application/pdf',
        lastModified: selected.lastModified,
        dataUrl
      });
    } catch {
      if (onError) onError('Failed to process the selected file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    if (fileInputRef.current) fileInputRef.current.value = '';
    onFileRemove();
  };

  const handleReplace = (e) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  return (
    <div className="vensaira-file-upload-container">
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        style={{ display: 'none' }}
        onChange={handleInputChange}
        aria-label="Upload resume file"
      />

      {isUploading ? (
        <div className="vensaira-upload-dropzone is-uploading" role="status" aria-live="polite">
          <div className="vensaira-upload-spinner" aria-hidden="true" />
          <div className="vensaira-upload-title">Processing Resume...</div>
          <div className="vensaira-upload-hint">Verifying file format and preparing document</div>
        </div>
      ) : !file ? (
        <div
          className="vensaira-upload-dropzone"
          onClick={() => fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              fileInputRef.current?.click();
            }
          }}
          aria-label="Click to upload resume document"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0878C9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <div className="vensaira-upload-title">Click to upload your resume</div>
          <div className="vensaira-upload-hint">PDF or Word document up to 5MB</div>
        </div>
      ) : (
        <div className="vensaira-file-preview-card cb-fade-in">
          <div className="vensaira-file-info">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0878C9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            <div className="vensaira-file-meta">
              <div className="vensaira-file-name" title={file.name}>{file.name}</div>
              <div className="vensaira-file-size">{formatFileSize(file.size)} • Ready</div>
            </div>
          </div>
          <div className="vensaira-file-actions">
            <button
              type="button"
              className="vensaira-btn-replace-file"
              onClick={handleReplace}
              title="Replace resume file"
              aria-label="Replace resume file"
            >
              Replace
            </button>
            <button
              type="button"
              className="vensaira-btn-remove-file"
              onClick={handleRemove}
              title="Remove file"
              aria-label="Remove resume file"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

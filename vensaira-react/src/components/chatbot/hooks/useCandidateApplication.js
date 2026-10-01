/**
 * Vensaira AI Assistant — useCandidateApplication Hook
 * Manages the multi-step candidate application process, skill selections, resume handling, and submission.
 */

import { useState, useCallback, useEffect } from 'react';
import { ApplicationApi } from '../services/applicationApi';
import { isValidEmail, isValidUrl } from '../utils/validation';

const INITIAL_FORM_DATA = {
  firstName: '',
  lastName: '',
  email: '',
  experience: '',
  education: '',
  skills: [],
  otherSkill: '',
  relocation: '',
  relocationLocation: '',
  resume: null, // { name, size, type, dataUrl }
  linkedinChoice: '',
  linkedin: '',
  appliedRole: 'Software Engineer'
};

export function useCandidateApplication({ onSubmitted }) {
  // Step tracker:
  // 1: firstName, 2: lastName, 3: email, 4: experience, 5: education,
  // 6: skills, 7: relocation, 8: relocationLocation, 9: resume, 10: linkedinChoice, 10.5: linkedinUrl, 11: review
  const [currentStep, setCurrentStep] = useState(1);
  const [editingField, setEditingField] = useState(null);

  // Candidate Data State
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const [inputVal, setInputVal] = useState('');
  const [inputError, setInputError] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [otherSkillText, setOtherSkillText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Keep inputVal and skills in sync with formData whenever currentStep changes
  // Ensures navigating Back/Forward preserves previously entered values!
  useEffect(() => {
    setInputError('');
    if (currentStep === 1) {
      setInputVal(formData.firstName || '');
    } else if (currentStep === 2) {
      setInputVal(formData.lastName || '');
    } else if (currentStep === 3) {
      setInputVal(formData.email || '');
    } else if (currentStep === 6) {
      if (formData.skills && formData.skills.length > 0) {
        const baseSkills = formData.skills.filter((s) => !s.startsWith('Other'));
        const hasOther = formData.skills.some((s) => s === 'Other' || s.startsWith('Other:'));
        setSelectedSkills(hasOther ? [...baseSkills, 'Other'] : baseSkills);
        setOtherSkillText(formData.otherSkill || '');
      }
    } else if (currentStep === 10.5) {
      setInputVal(formData.linkedin && formData.linkedin !== 'Not provided' ? formData.linkedin : '');
    } else {
      setInputVal('');
    }
  }, [currentStep, editingField, formData.firstName, formData.lastName, formData.email, formData.skills, formData.otherSkill, formData.linkedin]);

  // Step 1: First Name
  const handleFirstNameSubmit = useCallback((e) => {
    if (e) e.preventDefault();
    const val = inputVal.trim();
    if (!val) {
      setInputError('Please enter your first name.');
      return;
    }
    setFormData((prev) => ({ ...prev, firstName: val }));
    setInputError('');
    if (editingField) {
      setEditingField(null);
      setCurrentStep(11);
    } else {
      setCurrentStep(2);
    }
  }, [inputVal, editingField]);

  // Step 2: Last Name
  const handleLastNameSubmit = useCallback((e) => {
    if (e) e.preventDefault();
    const val = inputVal.trim();
    if (!val) {
      setInputError('Please enter your last name.');
      return;
    }
    setFormData((prev) => ({ ...prev, lastName: val }));
    setInputError('');
    if (editingField) {
      setEditingField(null);
      setCurrentStep(11);
    } else {
      setCurrentStep(3);
    }
  }, [inputVal, editingField]);

  // Step 3: Email Input -> Advances directly to next step (OTP verification removed)
  const handleEmailSubmit = useCallback((e) => {
    if (e) e.preventDefault();
    const val = inputVal.trim();
    if (!val || !isValidEmail(val)) {
      setInputError('Please enter a valid email address.');
      return;
    }
    const emailEntered = val.toLowerCase();
    setFormData((prev) => ({ ...prev, email: emailEntered }));
    setInputError('');
    if (editingField) {
      setEditingField(null);
      setCurrentStep(11);
    } else {
      setCurrentStep(4);
    }
  }, [inputVal, editingField]);

  // Step 4: Experience
  const handleExperienceSelect = useCallback((exp) => {
    setFormData((prev) => ({ ...prev, experience: exp }));
    if (editingField) {
      setEditingField(null);
      setCurrentStep(11);
    } else {
      setCurrentStep(5);
    }
  }, [editingField]);

  // Step 5: Education
  const handleEducationSelect = useCallback((edu) => {
    setFormData((prev) => ({ ...prev, education: edu }));
    if (editingField) {
      setEditingField(null);
      setCurrentStep(11);
    } else {
      setCurrentStep(6);
    }
  }, [editingField]);

  // Step 6: Skills Multiselect & Custom "Other" Skill
  const toggleSkill = useCallback((skill) => {
    setSelectedSkills((prev) => {
      const exists = prev.includes(skill);
      if (exists) {
        if (skill === 'Other') {
          setOtherSkillText('');
        }
        return prev.filter((s) => s !== skill);
      } else {
        return [...prev, skill];
      }
    });
  }, []);

  const handleSkillsSubmit = useCallback(() => {
    if (selectedSkills.length === 0) {
      setInputError('Please select at least one skill to continue.');
      return;
    }

    const custom = otherSkillText.trim();
    const baseSelected = selectedSkills.filter((s) => s !== 'Other');
    let finalSkills = [...baseSelected];
    if (selectedSkills.includes('Other')) {
      finalSkills.push(custom ? `Other: ${custom}` : 'Other');
    }

    setFormData((prev) => ({
      ...prev,
      skills: finalSkills,
      otherSkill: custom
    }));
    setInputError('');
    if (editingField) {
      setEditingField(null);
      setCurrentStep(11);
    } else {
      setCurrentStep(7);
    }
  }, [selectedSkills, otherSkillText, editingField]);

  // Step 7: Relocation
  const handleRelocationSelect = useCallback((choice) => {
    setFormData((prev) => ({ ...prev, relocation: choice }));
    if (choice === 'Yes') {
      setCurrentStep(8);
    } else {
      setFormData((prev) => ({ ...prev, relocationLocation: 'Not Applicable' }));
      if (editingField) {
        setEditingField(null);
        setCurrentStep(11);
      } else {
        setCurrentStep(9);
      }
    }
  }, [editingField]);

  // Step 8: Relocation Location
  const handleLocationSelect = useCallback((loc) => {
    setFormData((prev) => ({ ...prev, relocationLocation: loc }));
    if (editingField) {
      setEditingField(null);
      setCurrentStep(11);
    } else {
      setCurrentStep(9);
    }
  }, [editingField]);

  // Step 9: Resume Upload handling
  const setResumeData = useCallback((resumeObj) => {
    setFormData((prev) => ({ ...prev, resume: resumeObj }));
    setInputError('');
  }, []);

  const handleRemoveResume = useCallback(() => {
    setFormData((prev) => ({ ...prev, resume: null }));
  }, []);

  const handleResumeContinue = useCallback(() => {
    if (!formData.resume) {
      setInputError('Please upload your resume to proceed.');
      return;
    }
    setInputError('');
    if (editingField) {
      setEditingField(null);
      setCurrentStep(11);
    } else {
      setCurrentStep(10);
    }
  }, [formData.resume, editingField]);

  // Step 10: LinkedIn Choice
  const handleLinkedInChoice = useCallback((choice) => {
    setFormData((prev) => ({ ...prev, linkedinChoice: choice }));
    if (choice === 'Yes') {
      setCurrentStep(10.5);
    } else {
      setFormData((prev) => ({ ...prev, linkedin: 'Not provided' }));
      if (editingField) {
        setEditingField(null);
        setCurrentStep(11);
      } else {
        setCurrentStep(11);
      }
    }
  }, [editingField]);

  // Step 10.5: LinkedIn URL
  const handleLinkedInUrlSubmit = useCallback((e) => {
    if (e) e.preventDefault();
    const val = inputVal.trim();
    if (!val || !isValidUrl(val)) {
      setInputError('Please enter a valid LinkedIn URL.');
      return;
    }
    setFormData((prev) => ({ ...prev, linkedin: val }));
    setInputError('');
    if (editingField) {
      setEditingField(null);
    }
    setCurrentStep(11);
  }, [inputVal, editingField]);

  // Step 11: Edit specific field
  const handleEditField = useCallback((field, targetStep) => {
    setEditingField(field);
    if (field === 'firstName') setInputVal(formData.firstName || '');
    if (field === 'lastName') setInputVal(formData.lastName || '');
    if (field === 'email') setInputVal(formData.email || '');
    if (field === 'skills') {
      const baseSkills = (formData.skills || []).filter((s) => !s.startsWith('Other'));
      const hasOther = (formData.skills || []).some((s) => s === 'Other' || s.startsWith('Other:'));
      setSelectedSkills(hasOther ? [...baseSkills, 'Other'] : baseSkills);
      setOtherSkillText(formData.otherSkill || '');
    }
    if (field === 'linkedin' && formData.linkedin !== 'Not provided') {
      setInputVal(formData.linkedin || '');
    }
    setCurrentStep(targetStep);
  }, [formData]);

  // Submit Application to Backend with immediate duplicate submission prevention
  const handleFinalSubmit = useCallback(async () => {
    if (isSubmitting) return; // Prevent duplicate clicks
    setIsSubmitting(true);
    setSubmitError('');
    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        experience: formData.experience,
        education: formData.education,
        skills: formData.skills,
        otherSkill: formData.otherSkill,
        relocation: formData.relocation,
        relocationLocation: formData.relocationLocation || 'Not Applicable',
        resume: formData.resume,
        linkedin: formData.linkedin,
        appliedRole: formData.appliedRole
      };

      const res = await ApplicationApi.submitApplication(payload);
      if (res && res.success && res.applicationId) {
        if (onSubmitted) {
          onSubmitted(res.applicationId, res.candidate || payload);
        }
      } else {
        setSubmitError(res?.message || "We couldn't submit your application right now. Please try again.");
      }
    } catch (err) {
      setSubmitError(err?.message || "We couldn't submit your application right now. Please try again.");
    } finally {
      setIsSubmitting(false); // Re-enable button on error
    }
  }, [formData, isSubmitting, onSubmitted]);

  // Reset temporary application state (used on confirmed cancel)
  const resetApplication = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
    setCurrentStep(1);
    setEditingField(null);
    setInputVal('');
    setInputError('');
    setSelectedSkills([]);
    setOtherSkillText('');
    setSubmitError('');
    setIsSubmitting(false);
  }, []);

  return {
    currentStep,
    setCurrentStep,
    editingField,
    formData,
    inputVal,
    setInputVal,
    inputError,
    setInputError,
    selectedSkills,
    otherSkillText,
    setOtherSkillText,
    isSubmitting,
    submitError,
    handleFirstNameSubmit,
    handleLastNameSubmit,
    handleEmailSubmit,
    handleExperienceSelect,
    handleEducationSelect,
    toggleSkill,
    handleSkillsSubmit,
    handleRelocationSelect,
    handleLocationSelect,
    setResumeData,
    handleRemoveResume,
    handleResumeContinue,
    handleLinkedInChoice,
    handleLinkedInUrlSubmit,
    handleEditField,
    handleFinalSubmit,
    resetApplication
  };
}

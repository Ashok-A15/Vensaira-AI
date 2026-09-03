/**
 * Questions Configuration Module
 * 
 * Defines the step-by-step interview conversation tree.
 * Uses ID-based step tracking and supports conditional branching.
 */

const CHATBOT_QUESTIONS = [
    {
        id: "welcome",
        field: null,
        type: "welcome_buttons",
        isDataStep: false,
        getPrompt: (config, state) => `Hi! I'm ${config.botName || 'Vidwath Assistant'}, and I'll help you apply for this job. Are you interested in this job?`,
        options: [
            { label: "I'm interested", value: "interested", action: "next" },
            { label: "Not right now", value: "not_interested", action: "decline" }
        ]
    },
    {
        id: "firstName",
        field: "firstName",
        type: "text",
        isDataStep: true,
        stepNumber: 1,
        prompt: "What is your first name?",
        placeholder: "Enter your first name",
        validation: "required",
        errorMessage: "Please enter your first name."
    },
    {
        id: "lastName",
        field: "lastName",
        type: "text",
        isDataStep: true,
        stepNumber: 2,
        prompt: "What is your last name?",
        placeholder: "Enter your last name",
        validation: "required",
        errorMessage: "Please enter your last name."
    },
    {
        id: "email",
        field: "email",
        type: "email",
        isDataStep: true,
        stepNumber: 3,
        prompt: "What is your email address?",
        placeholder: "Enter your email address",
        validation: "email",
        errorMessage: "Please enter a valid email address."
    },
    {
        id: "phone",
        field: "phone",
        type: "phone",
        isDataStep: true,
        stepNumber: 4,
        prompt: "What is your phone number?",
        placeholder: "Enter your phone number",
        validation: "phone",
        errorMessage: "Please enter a valid phone number."
    },
    {
        id: "experience",
        field: "experience",
        type: "buttons",
        isDataStep: true,
        stepNumber: 5,
        prompt: "How much professional experience do you have?",
        options: [
            "Fresher",
            "Less than 1 year",
            "1–3 years",
            "3–5 years",
            "5+ years"
        ]
    },
    {
        id: "education",
        field: "education",
        type: "buttons",
        isDataStep: true,
        stepNumber: 6,
        prompt: "What is your highest qualification?",
        options: [
            "Diploma",
            "Bachelor's Degree",
            "Master's Degree",
            "PhD",
            "Other"
        ]
    },
    {
        id: "skills",
        field: "skills",
        type: "multiselect",
        isDataStep: true,
        stepNumber: 7,
        prompt: "Which skills do you have?",
        options: [
            "JavaScript",
            "Python",
            "Java",
            "React",
            "Node.js",
            "AI / ML",
            "Data Science",
            "Cloud / DevOps",
            "UI/UX",
            "Other"
        ],
        errorMessage: "Please select at least one skill to continue."
    },
    {
        id: "resume",
        field: "resume",
        type: "file",
        isDataStep: true,
        stepNumber: 8,
        prompt: "Please upload your latest resume.",
        accept: ".pdf,.doc,.docx",
        maxSizeMB: 5,
        errorMessage: "Please upload a PDF, DOC, or DOCX file (Max 5 MB)."
    },
    {
        id: "linkedinChoice",
        field: "linkedinChoice",
        type: "buttons",
        isDataStep: true,
        stepNumber: 9,
        prompt: "Do you have a LinkedIn profile?",
        options: [
            "Yes",
            "No"
        ]
    },
    {
        id: "linkedinUrl",
        field: "linkedin",
        type: "conditional_url",
        isDataStep: true,
        stepNumber: 9,
        conditionField: "linkedinChoice",
        conditionValue: "Yes",
        prompt: "Please enter your LinkedIn profile URL.",
        placeholder: "Enter your LinkedIn profile URL",
        validation: "url",
        errorMessage: "Please enter a valid URL."
    }
];

window.CHATBOT_QUESTIONS = CHATBOT_QUESTIONS;

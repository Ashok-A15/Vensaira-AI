/**
 * Chatbot Configuration System
 * 
 * Reusable configuration object for customizing assistant branding, company info, 
 * job listings, theme colors, and demo mode settings.
 */
const BOT_CONFIG = {
    // Demo Mode toggle
    demoMode: true,

    // Assistant & Company Branding
    botName: "Vidwath Assistant",
    companyName: "Vidwath",
    logo: "./career-chatbot/assets/bot-logo.png",

    // Visual theme tokens
    theme: {
        primaryColor: "#0057B8",
        primaryHover: "#004390",
        accentColor: "#00A8FF",
        backgroundColor: "#FFFFFF",
        textColor: "#1F2937",
        userBubbleColor: "#0057B8",
        userBubbleText: "#FFFFFF",
        botBubbleColor: "#F3F4F6",
        botBubbleText: "#1F2937"
    },

    // Configurable Job Listings
    jobs: [
        {
            id: "software-developer",
            title: "Software Developer",
            location: "Bangalore",
            jobType: "Full-time",
            department: "Engineering",
            description: "Build and maintain modern software applications."
        },
        {
            id: "ai-ml-intern",
            title: "AI/ML Intern",
            location: "Bangalore",
            jobType: "Internship",
            department: "AI Research",
            description: "Work on AI and machine learning projects."
        },
        {
            id: "frontend-developer",
            title: "Frontend Developer",
            location: "Remote",
            jobType: "Full-time",
            department: "Product Design",
            description: "Build responsive and accessible web experiences."
        }
    ],

    // Organization & Program Consent Agreement Settings
    organizationName: "Vidwath",
    agreementTitle: "STUDENT CONSENT & AGREEMENT",
    programDuration: "3 months",
    programFeeText: "applicable 3-month program fee",

    // Screening Test & Assessment Settings (fetched dynamically from backend)
    hackerRankTestUrl: null,
    apiBaseUrl: "http://localhost:3001",
    assessmentUrlEndpoint: "/api/assessment-url",
    sessionsEndpoint: "/api/sessions",

    // Future DocuSign Backend API Integration Points (Stubs - No Secrets)
    docusignEndpoint: "/api/docusign/create-envelope",
    docusignStatusEndpoint: "/api/docusign/envelope-status",

    // Auto-open delay in milliseconds
    autoOpenDelayMs: 1500
};

window.BOT_CONFIG = BOT_CONFIG;

/**
 * CareerChatbot Embed & Integration Loader Layer
 * 
 * Exposes the global CareerChatbot API for external website embedding.
 * Auto-injects chatbot widget HTML DOM and manages public API methods:
 * - CareerChatbot.open()
 * - CareerChatbot.open({ jobId: "software-developer" })
 * - CareerChatbot.close()
 * - CareerChatbot.minimize()
 */

(function () {
    const API = {
        /**
         * Opens the chatbot widget.
         * Accepts optional jobId parameter as object ({ jobId: '...' }) or string ('...').
         * @param {Object|string} [options] 
         */
        open: function (options) {
            this.ensureWidgetInjected();
            this.ensureInitialized();

            let targetJobId = null;
            if (typeof options === 'string') {
                targetJobId = options;
            } else if (options && typeof options === 'object') {
                targetJobId = options.jobId || options.id;
            }

            if (targetJobId && window.BOT_CONFIG && Array.isArray(window.BOT_CONFIG.jobs)) {
                const foundJob = window.BOT_CONFIG.jobs.find(j => j.id === targetJobId);
                if (foundJob && window.careerChatbot) {
                    window.careerChatbot.setJob(foundJob);
                    return;
                }
            }

            if (window.careerChatbot) {
                window.careerChatbot.openChat();
            }
        },

        /**
         * Closes the chatbot widget.
         */
        close: function () {
            if (window.careerChatbot) {
                window.careerChatbot.closeChat();
            }
        },

        /**
         * Minimizes the chatbot widget.
         */
        minimize: function () {
            if (window.careerChatbot) {
                window.careerChatbot.minimizeChat();
            }
        },

        /**
         * Selects job position by ID or object and opens chatbot.
         * @param {string|Object} jobIdOrObj 
         */
        setJob: function (jobIdOrObj) {
            this.ensureWidgetInjected();
            this.ensureInitialized();

            let foundJob = null;
            if (typeof jobIdOrObj === 'string') {
                if (window.BOT_CONFIG && Array.isArray(window.BOT_CONFIG.jobs)) {
                    foundJob = window.BOT_CONFIG.jobs.find(j => j.id === jobIdOrObj);
                }
            } else if (jobIdOrObj && typeof jobIdOrObj === 'object') {
                foundJob = jobIdOrObj;
            }

            if (foundJob && window.careerChatbot) {
                window.careerChatbot.setJob(foundJob);
            }
        },

        /**
         * Injects chatbot DOM HTML into body if not present on host website.
         */
        ensureWidgetInjected: function () {
            if (document.getElementById('chatbot-widget')) return;

            const config = window.BOT_CONFIG || {};
            const botName = config.botName || 'Vidwath Assistant';
            const companyName = config.companyName || 'Vidwath';
            const defaultJob = (config.jobs && config.jobs.length > 0) 
                ? config.jobs[0] 
                : { title: 'Software Developer', location: 'Bangalore', jobType: 'Full-time' };
            const logo = config.logo || './assets/logo-placeholder.svg';

            const widgetWrapper = document.createElement('aside');
            widgetWrapper.id = 'chatbot-widget';
            widgetWrapper.className = 'career-chatbot-widget';
            widgetWrapper.setAttribute('aria-label', `${botName} career application assistant`);

            widgetWrapper.innerHTML = `
                <div id="chatbot-card" class="chatbot-card" role="dialog" aria-modal="false" aria-labelledby="chatbot-header-bot-name">
                    <header class="chatbot-header">
                        <div class="chatbot-header-left">
                            <img id="chatbot-header-logo" src="${logo}" alt="Company Logo" class="chatbot-header-logo">
                            <div class="chatbot-header-info">
                                <span id="chatbot-header-bot-name" class="chatbot-header-bot-name">${botName}</span>
                                <span id="chatbot-header-company" class="chatbot-header-company">${companyName}</span>
                            </div>
                        </div>
                        <div class="chatbot-header-actions">
                            <div id="chatbot-menu-wrapper" class="cb-menu-wrapper">
                                <button type="button" id="chatbot-menu-toggle" class="cb-icon-btn" aria-label="Chatbot Options" title="Options">
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                                    </svg>
                                </button>
                                <div id="chatbot-menu-dropdown" class="cb-menu-dropdown">
                                    <button type="button" id="cb-menu-start-over" class="cb-menu-item">
                                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                            <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
                                        </svg>
                                        Start Over
                                    </button>
                                    <button type="button" id="cb-menu-cancel-app" class="cb-menu-item cb-menu-danger">
                                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                                        </svg>
                                        Cancel Application
                                    </button>
                                </div>
                            </div>

                            <button type="button" id="chatbot-minimize-btn" class="cb-icon-btn" aria-label="Minimize Chatbot" title="Minimize">
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                    <path d="M19 13H5v-2h14v2z"/>
                                </svg>
                            </button>
                            <button type="button" id="chatbot-close-btn" class="cb-icon-btn" aria-label="Close Chatbot" title="Close">
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                                </svg>
                            </button>
                        </div>
                    </header>

                    <div id="chatbot-progress-container" class="cb-progress-container" style="display: none;">
                        <span id="chatbot-progress-text" class="cb-progress-text">Step 1 of 9</span>
                        <div class="cb-progress-track">
                            <div id="chatbot-progress-bar" class="cb-progress-bar" style="width: 0%;"></div>
                        </div>
                    </div>

                    <div id="chatbot-messages" class="chatbot-messages" aria-live="polite" aria-atomic="false"></div>

                    <div id="chatbot-input-area" class="chatbot-input-area"></div>
                </div>

                <button type="button" id="chatbot-launcher" class="chatbot-launcher-btn" aria-label="Open ${botName} career assistant" aria-expanded="false">
                    <span class="cb-unread-badge"></span>
                    <svg class="chatbot-launcher-icon" viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                        <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>
                    </svg>
                    <svg class="chatbot-close-icon" viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                </button>
            `;

            document.body.appendChild(widgetWrapper);
        },

        /**
         * Ensures engine instance is created and initialized.
         */
        ensureInitialized: function () {
            if (!window.careerChatbot && typeof CareerChatbotEngine !== 'undefined') {
                window.careerChatbot = new CareerChatbotEngine(window.BOT_CONFIG, window.CHATBOT_QUESTIONS, window.ChatbotValidation);
                window.careerChatbot.init();
            } else if (window.careerChatbot && !window.careerChatbot.widgetContainer) {
                window.careerChatbot.init();
            }
        }
    };

    // Expose global CareerChatbot API
    window.CareerChatbot = API;

    // Auto-run injection check on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            API.ensureWidgetInjected();
            API.ensureInitialized();
        });
    } else {
        API.ensureWidgetInjected();
        API.ensureInitialized();
    }
})();

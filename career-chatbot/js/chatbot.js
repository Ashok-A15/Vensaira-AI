/**
 * Core Chatbot Engine Module (Refined UI/UX & Reusable Branding)
 * 
 * Clean recruitment application assistant reading assistant name (botName) and 
 * company name (companyName) dynamically from BOT_CONFIG.
 */

(function () {
class CareerChatbot {
    constructor(config, questions, validation) {
        this.config = config || window.BOT_CONFIG;
        this.questions = questions || window.CHATBOT_QUESTIONS;
        this.validation = validation || window.ChatbotValidation;

        // Default initial job selection from config
        const defaultJob = (this.config.jobs && this.config.jobs.length > 0) 
            ? this.config.jobs[0] 
            : { id: "general", title: "Software Developer", location: "Bangalore", jobType: "Full-time" };

        // Candidate Application State
        this.state = {
            jobId: defaultJob.id,
            jobTitle: defaultJob.title,
            jobLocation: defaultJob.location,
            jobType: defaultJob.jobType,
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            experience: "",
            education: "",
            skills: [],
            resume: null, // Stores file metadata object { name, size, type, rawFile }
            linkedinChoice: "",
            linkedin: "",
            agreementAccepted: false,
            agreementAcceptedAt: null,
            docuSignStatus: "demo_pending",
            assessmentOpened: false
        };

        // Navigation & Flow Control State
        this.currentStepIndex = 0;
        this.stepHistory = [];
        this.isEditing = false;
        this.isSubmitting = false;
        this.isSubmitted = false;
        this.isOpen = false;
        this.isMinimized = false;
        this.selectedSkillsTemp = [];
        this.stagedResumeTemp = null;

        // Bindings
        this.init = this.init.bind(this);
        this.toggleChat = this.toggleChat.bind(this);
        this.openChat = this.openChat.bind(this);
        this.closeChat = this.closeChat.bind(this);
        this.minimizeChat = this.minimizeChat.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    /**
     * Initializes widget DOM, theme colors, menu handlers, and session auto-open logic.
     */
    init() {
        if (this.initialized && this.widgetContainer) return;
        this.applyTheme();
        this.cacheDOM();
        if (!this.widgetContainer) return; // Wait until DOM is injected by embed.js
        this.bindEvents();
        this.initialized = true;

        // Auto-open chatbot ONCE per page session after configured delay
        const hasAutoOpened = sessionStorage.getItem('cb_auto_opened');
        if (!hasAutoOpened && this.config.autoOpenDelayMs && this.config.autoOpenDelayMs > 0) {
            setTimeout(() => {
                if (!this.isOpen && !this.isSubmitted && !sessionStorage.getItem('cb_auto_opened')) {
                    sessionStorage.setItem('cb_auto_opened', 'true');
                    this.openChat();
                }
            }, this.config.autoOpenDelayMs);
        }
    }

    /**
     * Sets active job from careers page card click and starts fresh application flow.
     * @param {Object} jobObj 
     */
    setJob(jobObj) {
        if (!jobObj) return;

        this.state.jobId = jobObj.id || 'custom-job';
        this.state.jobTitle = jobObj.title || 'Career Opportunity';
        this.state.jobLocation = jobObj.location || 'Bangalore';
        this.state.jobType = jobObj.jobType || 'Full-time';

        // Update header UI
        if (this.headerBotName) this.headerBotName.textContent = this.config.botName || 'Vidwath Assistant';
        if (this.headerCompany) this.headerCompany.textContent = this.config.companyName || 'Vidwath';
        if (this.headerJobTitle) this.headerJobTitle.textContent = this.state.jobTitle;
        if (this.headerMeta) this.headerMeta.textContent = `${this.state.jobLocation} · ${this.state.jobType}`;

        // Reset application data for new job selection
        this.resetConversationState();
        this.openChat();
    }

    /**
     * Applies dynamic CSS variable tokens from config theme.
     */
    applyTheme() {
        const theme = this.config.theme || {};
        const root = document.documentElement;

        if (theme.primaryColor) root.style.setProperty('--cb-primary', theme.primaryColor);
        if (theme.primaryHover) root.style.setProperty('--cb-primary-hover', theme.primaryHover);
        if (theme.accentColor) root.style.setProperty('--cb-accent', theme.accentColor);
        if (theme.backgroundColor) root.style.setProperty('--cb-bg', theme.backgroundColor);
        if (theme.textColor) root.style.setProperty('--cb-text', theme.textColor);
        if (theme.botBubbleColor) root.style.setProperty('--cb-bot-bubble-bg', theme.botBubbleColor);
        if (theme.botBubbleText) root.style.setProperty('--cb-bot-bubble-text', theme.botBubbleText);
        if (theme.userBubbleColor) root.style.setProperty('--cb-user-bubble-bg', theme.userBubbleColor);
        if (theme.userBubbleText) root.style.setProperty('--cb-user-bubble-text', theme.userBubbleText);
    }

    /**
     * Caches DOM nodes.
     */
    cacheDOM() {
        this.widgetContainer = document.getElementById('chatbot-widget');
        this.launcherBtn = document.getElementById('chatbot-launcher');
        this.chatCard = document.getElementById('chatbot-card');
        this.headerLogo = document.getElementById('chatbot-header-logo');
        this.headerBotName = document.getElementById('chatbot-header-bot-name');
        this.headerCompany = document.getElementById('chatbot-header-company');
        this.headerJobTitle = document.getElementById('chatbot-header-job-title');
        this.headerMeta = document.getElementById('chatbot-header-meta');
        this.closeBtn = document.getElementById('chatbot-close-btn');
        this.minimizeBtn = document.getElementById('chatbot-minimize-btn');
        this.menuToggleBtn = document.getElementById('chatbot-menu-toggle');
        this.menuDropdown = document.getElementById('chatbot-menu-dropdown');
        this.btnStartOver = document.getElementById('cb-menu-start-over');
        this.btnCancelApp = document.getElementById('cb-menu-cancel-app');
        this.progressContainer = document.getElementById('chatbot-progress-container');
        this.progressBar = document.getElementById('chatbot-progress-bar');
        this.progressText = document.getElementById('chatbot-progress-text');
        this.messagesContainer = document.getElementById('chatbot-messages');
        this.inputArea = document.getElementById('chatbot-input-area');

        // Populate header branding dynamically from config
        if (this.headerLogo) this.headerLogo.src = this.config.logo || './assets/logo-placeholder.svg';
        if (this.headerBotName) this.headerBotName.textContent = this.config.botName || 'Vidwath Assistant';
        if (this.headerCompany) this.headerCompany.textContent = this.config.companyName || 'Vidwath';
        if (this.headerJobTitle) this.headerJobTitle.textContent = this.state.jobTitle;
        if (this.headerMeta) this.headerMeta.textContent = `${this.state.jobLocation} · ${this.state.jobType}`;
    }

    /**
     * Binds click & keyboard listeners.
     */
    bindEvents() {
        if (this.launcherBtn) {
            this.launcherBtn.addEventListener('click', this.toggleChat);
        }
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => {
                sessionStorage.setItem('cb_auto_opened', 'true');
                this.closeChat();
            });
        }
        if (this.minimizeBtn) {
            this.minimizeBtn.addEventListener('click', this.minimizeChat);
        }
        if (this.menuToggleBtn) {
            this.menuToggleBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (this.menuDropdown) {
                    this.menuDropdown.classList.toggle('cb-dropdown-open');
                }
            });
        }

        // Close dropdown on click outside
        document.addEventListener('click', (e) => {
            if (this.menuDropdown && !e.target.closest('#chatbot-menu-wrapper')) {
                this.menuDropdown.classList.remove('cb-dropdown-open');
            }
        });

        if (this.btnStartOver) {
            this.btnStartOver.addEventListener('click', () => {
                if (this.menuDropdown) this.menuDropdown.classList.remove('cb-dropdown-open');
                this.promptStartOverConfirmation();
            });
        }

        if (this.btnCancelApp) {
            this.btnCancelApp.addEventListener('click', () => {
                if (this.menuDropdown) this.menuDropdown.classList.remove('cb-dropdown-open');
                this.promptCancelConfirmation();
            });
        }

        // Escape key to minimize
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.minimizeChat();
            }
        });
    }

    /**
     * Toggle chat visibility.
     */
    toggleChat() {
        if (this.isOpen) {
            this.minimizeChat();
        } else {
            this.openChat();
        }
    }

    /**
     * Opens chatbot window.
     */
    openChat() {
        this.isOpen = true;
        this.isMinimized = false;
        if (this.widgetContainer) {
            this.widgetContainer.classList.add('cb-open');
            this.widgetContainer.classList.remove('cb-minimized');
        }
        if (this.launcherBtn) {
            this.launcherBtn.setAttribute('aria-expanded', 'true');
        }

        if (this.messagesContainer && this.messagesContainer.children.length === 0) {
            this.renderQuestion(0);
        } else {
            this.scrollToBottom();
        }
    }

    /**
     * Closes chatbot widget.
     */
    closeChat() {
        this.isOpen = false;
        this.isMinimized = false;
        if (this.widgetContainer) {
            this.widgetContainer.classList.remove('cb-open', 'cb-minimized');
        }
        if (this.launcherBtn) {
            this.launcherBtn.setAttribute('aria-expanded', 'false');
        }
    }

    /**
     * Minimizes chatbot widget.
     */
    minimizeChat() {
        this.isOpen = false;
        this.isMinimized = true;
        if (this.widgetContainer) {
            this.widgetContainer.classList.remove('cb-open');
            this.widgetContainer.classList.add('cb-minimized');
        }
        if (this.launcherBtn) {
            this.launcherBtn.setAttribute('aria-expanded', 'false');
        }
    }

    /**
     * Scrolls conversation area smoothly to bottom.
     */
    scrollToBottom() {
        if (this.messagesContainer) {
            setTimeout(() => {
                this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
            }, 50);
        }
    }

    /**
     * Updates progress bar below header.
     * @param {Object} question 
     */
    updateProgressIndicator(question) {
        if (!this.progressContainer) return;

        // Hide progress bar on welcome screen, review screen, or success state
        if (!question || !question.isDataStep || this.isSubmitted) {
            this.progressContainer.style.display = 'none';
            return;
        }

        this.progressContainer.style.display = 'flex';
        const totalDataSteps = 9;
        const currentStepNum = question.stepNumber || 1;
        const percentage = Math.min(100, Math.round((currentStepNum / totalDataSteps) * 100));

        if (this.progressBar) this.progressBar.style.width = `${percentage}%`;
        if (this.progressText) this.progressText.textContent = `Application progress • Step ${currentStepNum} of ${totalDataSteps}`;
    }

    /**
     * Appends bot message bubble with typing delay.
     * @param {string|HTMLElement} content 
     * @param {boolean} immediate 
     */
    async appendBotMessage(content, immediate = false) {
        if (!immediate) {
            const typingBubble = document.createElement('div');
            typingBubble.className = 'cb-message cb-message-bot cb-typing-indicator';
            typingBubble.innerHTML = `
                <div class="cb-avatar"><img src="${this.config.logo || './assets/logo-placeholder.svg'}" alt="Logo"></div>
                <div class="cb-bubble">
                    <span class="cb-dot"></span>
                    <span class="cb-dot"></span>
                    <span class="cb-dot"></span>
                </div>
            `;
            this.messagesContainer.appendChild(typingBubble);
            this.scrollToBottom();

            await new Promise(res => setTimeout(res, 300));
            typingBubble.remove();
        }

        const msgDiv = document.createElement('div');
        msgDiv.className = 'cb-message cb-message-bot cb-fade-in';
        msgDiv.setAttribute('data-step-index', this.currentStepIndex);
        
        const avatar = document.createElement('div');
        avatar.className = 'cb-avatar';
        avatar.innerHTML = `<img src="${this.config.logo || './assets/logo-placeholder.svg'}" alt="Company Logo">`;
        
        const bubble = document.createElement('div');
        bubble.className = 'cb-bubble';
        if (typeof content === 'string') {
            bubble.textContent = content;
        } else {
            bubble.appendChild(content);
        }

        msgDiv.appendChild(avatar);
        msgDiv.appendChild(bubble);
        this.messagesContainer.appendChild(msgDiv);
        this.scrollToBottom();
        return msgDiv;
    }

    /**
     * Appends candidate user message bubble.
     * @param {string} text 
     */
    appendUserMessage(text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'cb-message cb-message-user cb-fade-in';
        msgDiv.setAttribute('data-step-index', this.currentStepIndex);
        
        const bubble = document.createElement('div');
        bubble.className = 'cb-bubble';
        bubble.textContent = text;

        msgDiv.appendChild(bubble);
        this.messagesContainer.appendChild(msgDiv);
        this.scrollToBottom();
    }

    /**
     * Renders a question step by index.
     * @param {number} index 
     * @param {boolean} isBackNavigation 
     */
    async renderQuestion(index, isBackNavigation = false) {
        if (index < 0 || index >= this.questions.length) {
            this.renderReviewScreen();
            return;
        }

        const previousStepIndex = this.currentStepIndex;
        this.currentStepIndex = index;

        // Track step history for Back navigation
        if (!isBackNavigation && !this.isEditing && index > 0) {
            if (!this.stepHistory.includes(previousStepIndex)) {
                this.stepHistory.push(previousStepIndex);
            }
        }

        const q = this.questions[index];

        // Check conditional visibility (e.g. linkedinUrl only if linkedinChoice === 'Yes')
        if (q.conditionField) {
            const conditionVal = this.state[q.conditionField];
            if (conditionVal !== q.conditionValue) {
                if (q.field && !this.state[q.field]) {
                    this.state[q.field] = "Not provided";
                }
                if (isBackNavigation) {
                    this.goBack();
                } else {
                    this.advanceToNextStep();
                }
                return;
            }
        }

        // Update progress bar
        this.updateProgressIndicator(q);

        // Render bot prompt
        let promptText = q.prompt;
        if (typeof q.getPrompt === 'function') {
            promptText = q.getPrompt(this.config, this.state);
        }

        await this.appendBotMessage(promptText, isBackNavigation);

        // Render current question input controls in fixed footer area
        this.renderInputControl(q);
    }

    /**
     * Navigates back to previous question step.
     */
    goBack() {
        if (this.stepHistory.length === 0) return;

        const lastStepIndex = this.stepHistory.pop();

        // Clear message bubbles generated for current step
        const currentMsgs = Array.from(this.messagesContainer.querySelectorAll(`[data-step-index="${this.currentStepIndex}"]`));
        currentMsgs.forEach(msg => msg.remove());

        // Remove user bubble for previous step if present
        const prevUserMsgs = Array.from(this.messagesContainer.querySelectorAll(`[data-step-index="${lastStepIndex}"].cb-message-user`));
        if (prevUserMsgs.length > 0) {
            prevUserMsgs[prevUserMsgs.length - 1].remove();
        }

        this.renderQuestion(lastStepIndex, true);
    }

    /**
     * Renders input controls ONLY for the active question into fixed input area.
     * @param {Object} question 
     */
    renderInputControl(question) {
        this.inputArea.innerHTML = '';
        this.inputArea.className = 'chatbot-input-area';

        const showBackButton = this.currentStepIndex > 0 && !this.isEditing;

        switch (question.type) {
            case 'welcome_buttons':
                this.renderWelcomeControl(question);
                break;

            case 'text':
            case 'email':
            case 'phone':
            case 'conditional_url':
                this.renderTextInputControl(question, showBackButton);
                break;

            case 'buttons':
                this.renderButtonsControl(question.options, (selectedOption) => {
                    this.appendUserMessage(selectedOption);
                    this.state[question.field] = selectedOption;

                    if (this.isEditing) {
                        this.finishEditing();
                    } else {
                        this.advanceToNextStep();
                    }
                }, showBackButton);
                break;

            case 'multiselect':
                this.renderMultiSelectControl(question, showBackButton);
                break;

            case 'file':
                this.renderFileUploadControl(question, showBackButton);
                break;

            default:
                break;
        }
    }

    /**
     * Renders Welcome screen options ("I'm interested" / "Not right now").
     * @param {Object} question 
     */
    renderWelcomeControl(question) {
        const grid = document.createElement('div');
        grid.className = 'cb-button-grid';

        question.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'cb-btn-option cb-btn-welcome';
            btn.textContent = opt.label;

            btn.addEventListener('click', async () => {
                this.appendUserMessage(opt.label);
                if (opt.action === 'decline') {
                    this.handleDeclineFlow();
                } else {
                    await this.appendBotMessage("Great! Let's get started with your application.");
                    this.advanceToNextStep();
                }
            });

            grid.appendChild(btn);
        });

        this.inputArea.appendChild(grid);
    }

    /**
     * Renders text input control with Send / Continue button and inline error message.
     * @param {Object} question 
     * @param {boolean} showBackButton 
     */
    renderTextInputControl(question, showBackButton) {
        const container = document.createElement('div');
        container.className = 'cb-input-wrapper';

        const form = document.createElement('form');
        form.className = 'cb-text-form';

        const currentValue = (this.state[question.field] && this.state[question.field] !== 'Not provided')
            ? this.state[question.field] 
            : '';

        form.innerHTML = `
            <div class="cb-input-field-row">
                <input 
                    type="${question.type === 'email' ? 'email' : question.type === 'phone' ? 'tel' : 'text'}" 
                    class="cb-input-text" 
                    id="cb-field-input"
                    placeholder="${question.placeholder || 'Enter your response'}" 
                    value="${this.escapeHtml(currentValue)}"
                    autocomplete="off"
                    required
                />
                <button type="submit" class="cb-btn-primary cb-btn-continue" aria-label="Submit answer">
                    Continue →
                </button>
            </div>
            <div id="cb-inline-error" class="cb-input-error-msg" style="display: none;"></div>
        `;

        const actionsRow = document.createElement('div');
        actionsRow.className = 'cb-input-actions-row';

        if (showBackButton) {
            const backBtn = document.createElement('button');
            backBtn.type = 'button';
            backBtn.className = 'cb-btn-back';
            backBtn.innerHTML = '← Back';
            backBtn.addEventListener('click', () => this.goBack());
            actionsRow.appendChild(backBtn);
        }

        form.appendChild(actionsRow);

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputEl = form.querySelector('#cb-field-input');
            const val = inputEl ? inputEl.value.trim() : '';
            this.handleUserInputSubmit(val, question, form);
        });

        container.appendChild(form);
        this.inputArea.appendChild(container);
        const inputEl = form.querySelector('#cb-field-input');
        if (inputEl) inputEl.focus();
    }

    /**
     * Validates candidate input and displays inline error if invalid.
     * @param {string} val 
     * @param {Object} question 
     * @param {HTMLElement} formEl 
     */
    handleUserInputSubmit(val, question, formEl) {
        let isValid = true;
        let errorMsg = question.errorMessage || "Please enter a valid response.";

        if (question.validation === 'required') {
            isValid = this.validation.validateRequired(val);
        } else if (question.validation === 'email') {
            isValid = this.validation.validateEmail(val);
        } else if (question.validation === 'phone') {
            isValid = this.validation.validatePhone(val);
        } else if (question.validation === 'url') {
            isValid = this.validation.validateUrl(val);
        }

        const errorDiv = formEl.querySelector('#cb-inline-error');
        const inputEl = formEl.querySelector('#cb-field-input');

        if (!isValid) {
            if (errorDiv) {
                errorDiv.textContent = errorMsg;
                errorDiv.style.display = 'block';
            }
            if (inputEl) {
                inputEl.classList.add('cb-input-invalid');
                inputEl.focus();
            }
            return;
        }

        if (errorDiv) errorDiv.style.display = 'none';
        if (inputEl) inputEl.classList.remove('cb-input-invalid');

        // Save & proceed
        this.appendUserMessage(val);
        this.state[question.field] = val;

        if (this.isEditing) {
            this.finishEditing();
        } else {
            this.advanceToNextStep();
        }
    }

    /**
     * Renders vertical single choice option buttons grid with Back button.
     * @param {Array<string>} options 
     * @param {Function} onSelect 
     * @param {boolean} showBackButton 
     */
    renderButtonsControl(options, onSelect, showBackButton = false) {
        const wrapper = document.createElement('div');
        wrapper.className = 'cb-button-wrapper';

        const grid = document.createElement('div');
        grid.className = 'cb-button-grid';

        options.forEach(optText => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'cb-btn-option';
            btn.textContent = optText;
            btn.addEventListener('click', () => onSelect(optText));
            grid.appendChild(btn);
        });

        wrapper.appendChild(grid);

        if (showBackButton) {
            const backRow = document.createElement('div');
            backRow.className = 'cb-input-actions-row';
            const backBtn = document.createElement('button');
            backBtn.type = 'button';
            backBtn.className = 'cb-btn-back';
            backBtn.innerHTML = '← Back';
            backBtn.addEventListener('click', () => this.goBack());
            backRow.appendChild(backBtn);
            wrapper.appendChild(backRow);
        }

        this.inputArea.appendChild(wrapper);
    }

    /**
     * Renders multi-select skills pills with Continue and Back buttons.
     * @param {Object} question 
     * @param {boolean} showBackButton 
     */
    renderMultiSelectControl(question, showBackButton = false) {
        const container = document.createElement('div');
        container.className = 'cb-multiselect-container';

        this.selectedSkillsTemp = Array.isArray(this.state.skills) ? [...this.state.skills] : [];

        const optionsGrid = document.createElement('div');
        optionsGrid.className = 'cb-skills-grid';

        question.options.forEach(skillName => {
            const isSelected = this.selectedSkillsTemp.includes(skillName);
            const pill = document.createElement('button');
            pill.type = 'button';
            pill.className = `cb-skill-pill ${isSelected ? 'cb-selected' : ''}`;
            pill.textContent = skillName;

            pill.addEventListener('click', () => {
                if (this.selectedSkillsTemp.includes(skillName)) {
                    this.selectedSkillsTemp = this.selectedSkillsTemp.filter(s => s !== skillName);
                    pill.classList.remove('cb-selected');
                } else {
                    this.selectedSkillsTemp.push(skillName);
                    pill.classList.add('cb-selected');
                }
            });

            optionsGrid.appendChild(pill);
        });

        const errorDiv = document.createElement('div');
        errorDiv.className = 'cb-input-error-msg';
        errorDiv.style.display = 'none';

        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'cb-multiselect-actions';

        if (showBackButton) {
            const backBtn = document.createElement('button');
            backBtn.type = 'button';
            backBtn.className = 'cb-btn-back';
            backBtn.textContent = '← Back';
            backBtn.addEventListener('click', () => this.goBack());
            actionsDiv.appendChild(backBtn);
        } else {
            actionsDiv.appendChild(document.createElement('div'));
        }

        const continueBtn = document.createElement('button');
        continueBtn.type = 'button';
        continueBtn.className = 'cb-btn-primary';
        continueBtn.textContent = 'Continue →';

        continueBtn.addEventListener('click', () => {
            if (this.selectedSkillsTemp.length === 0) {
                errorDiv.textContent = question.errorMessage || "Please select at least one skill to continue.";
                errorDiv.style.display = 'block';
                return;
            }

            errorDiv.style.display = 'none';
            this.state.skills = [...this.selectedSkillsTemp];
            this.appendUserMessage(this.state.skills.join(', '));

            if (this.isEditing) {
                this.finishEditing();
            } else {
                this.advanceToNextStep();
            }
        });

        actionsDiv.appendChild(continueBtn);
        container.appendChild(optionsGrid);
        container.appendChild(errorDiv);
        container.appendChild(actionsDiv);

        this.inputArea.appendChild(container);
    }

    /**
     * Renders resume upload dropzone.
     * @param {Object} question 
     * @param {boolean} showBackButton 
     */
    renderFileUploadControl(question, showBackButton = false) {
        const container = document.createElement('div');
        container.className = 'cb-file-container';

        this.stagedResumeTemp = this.state.resume;

        const errorDiv = document.createElement('div');
        errorDiv.className = 'cb-input-error-msg';
        errorDiv.style.display = 'none';

        const renderStateUI = () => {
            container.innerHTML = '';

            if (this.stagedResumeTemp) {
                const previewCard = document.createElement('div');
                previewCard.className = 'cb-file-preview-card';
                previewCard.innerHTML = `
                    <div class="cb-file-info">
                        <svg class="cb-file-icon" viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                        </svg>
                        <div class="cb-file-details">
                            <span class="cb-file-name">${this.escapeHtml(this.stagedResumeTemp.name)}</span>
                            <span class="cb-file-size">${this.formatBytes(this.stagedResumeTemp.size)}</span>
                        </div>
                    </div>
                    <button type="button" class="cb-btn-remove-file" aria-label="Remove uploaded resume">
                        &times; Remove
                    </button>
                `;

                previewCard.querySelector('.cb-btn-remove-file').addEventListener('click', () => {
                    this.stagedResumeTemp = null;
                    renderStateUI();
                });

                const actionsDiv = document.createElement('div');
                actionsDiv.className = 'cb-file-actions';

                if (showBackButton) {
                    const backBtn = document.createElement('button');
                    backBtn.type = 'button';
                    backBtn.className = 'cb-btn-back';
                    backBtn.textContent = '← Back';
                    backBtn.addEventListener('click', () => this.goBack());
                    actionsDiv.appendChild(backBtn);
                } else {
                    actionsDiv.appendChild(document.createElement('div'));
                }

                const confirmBtn = document.createElement('button');
                confirmBtn.type = 'button';
                confirmBtn.className = 'cb-btn-primary';
                confirmBtn.textContent = 'Confirm & Continue →';
                confirmBtn.addEventListener('click', () => {
                    this.state.resume = this.stagedResumeTemp;
                    this.appendUserMessage(`Uploaded: ${this.state.resume.name}`);

                    if (this.isEditing) {
                        this.finishEditing();
                    } else {
                        this.advanceToNextStep();
                    }
                });

                actionsDiv.appendChild(confirmBtn);

                container.appendChild(previewCard);
                container.appendChild(actionsDiv);
            } else {
                const dropzone = document.createElement('label');
                dropzone.className = 'cb-file-dropzone';
                dropzone.innerHTML = `
                    <input type="file" class="cb-file-input" accept="${question.accept}" id="cb-resume-input" />
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                        <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
                    </svg>
                    <span class="cb-drop-text">Upload Resume (PDF, DOC, DOCX)</span>
                    <span class="cb-drop-hint">Maximum file size: 5 MB</span>
                `;

                const fileInput = dropzone.querySelector('#cb-resume-input');
                fileInput.addEventListener('change', (e) => {
                    const file = e.target.files[0];
                    if (!file) return;

                    if (!this.validation.validateFileType(file, ['.pdf', '.doc', '.docx'])) {
                        errorDiv.textContent = "Please upload a PDF, DOC, or DOCX file.";
                        errorDiv.style.display = 'block';
                        return;
                    }
                    if (!this.validation.validateFileSize(file, question.maxSizeMB || 5)) {
                        errorDiv.textContent = "File size must be 5 MB or smaller.";
                        errorDiv.style.display = 'block';
                        return;
                    }

                    errorDiv.style.display = 'none';
                    this.stagedResumeTemp = {
                        name: file.name,
                        size: file.size,
                        type: file.type || 'Document',
                        lastModified: file.lastModified,
                        rawFile: file
                    };

                    renderStateUI();
                });

                container.appendChild(dropzone);
                container.appendChild(errorDiv);

                if (showBackButton) {
                    const backDiv = document.createElement('div');
                    backDiv.className = 'cb-input-actions-row';
                    const backBtn = document.createElement('button');
                    backBtn.type = 'button';
                    backBtn.className = 'cb-btn-back';
                    backBtn.textContent = '← Back';
                    backBtn.addEventListener('click', () => this.goBack());
                    backDiv.appendChild(backBtn);
                    container.appendChild(backDiv);
                }
            }
        };

        renderStateUI();
        this.inputArea.appendChild(container);
    }

    /**
     * Handles candidate declining job application.
     */
    async handleDeclineFlow() {
        this.inputArea.innerHTML = '';
        await this.appendBotMessage("No problem! You can explore our other opportunities whenever you're ready.");

        const container = document.createElement('div');
        container.className = 'cb-button-grid';

        const viewJobsBtn = document.createElement('button');
        viewJobsBtn.type = 'button';
        viewJobsBtn.className = 'cb-btn-option';
        viewJobsBtn.textContent = 'View Other Jobs';
        viewJobsBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            this.closeChat();
        });

        const closeBtn = document.createElement('button');
        closeBtn.type = 'button';
        closeBtn.className = 'cb-btn-option';
        closeBtn.textContent = 'Close Chat';
        closeBtn.addEventListener('click', () => this.closeChat());

        container.appendChild(viewJobsBtn);
        container.appendChild(closeBtn);
        this.inputArea.appendChild(container);
    }

    /**
     * Advances to next step index.
     */
    advanceToNextStep() {
        this.renderQuestion(this.currentStepIndex + 1);
    }

    /**
     * Finishes edit action and returns to Review Screen.
     */
    finishEditing() {
        this.isEditing = false;
        this.renderReviewScreen();
    }

    /**
     * Displays confirmation popup for Start Over action.
     */
    async promptStartOverConfirmation() {
        this.inputArea.innerHTML = '';
        await this.appendBotMessage("Are you sure you want to start over? Your current application information will be cleared.");

        const container = document.createElement('div');
        container.className = 'cb-button-grid';

        const confirmBtn = document.createElement('button');
        confirmBtn.type = 'button';
        confirmBtn.className = 'cb-btn-option cb-btn-danger';
        confirmBtn.textContent = 'Start Over';
        confirmBtn.addEventListener('click', () => {
            this.resetConversationState();
            this.openChat();
        });

        const cancelBtn = document.createElement('button');
        cancelBtn.type = 'button';
        cancelBtn.className = 'cb-btn-option';
        cancelBtn.textContent = 'Cancel';
        cancelBtn.addEventListener('click', () => {
            this.renderQuestion(this.currentStepIndex, true);
        });

        container.appendChild(confirmBtn);
        container.appendChild(cancelBtn);
        this.inputArea.appendChild(container);
    }

    /**
     * Displays confirmation popup for Cancel Application action.
     */
    async promptCancelConfirmation() {
        this.inputArea.innerHTML = '';
        await this.appendBotMessage("Are you sure you want to cancel your application? Progress will be lost.");

        const container = document.createElement('div');
        container.className = 'cb-button-grid';

        const confirmBtn = document.createElement('button');
        confirmBtn.type = 'button';
        confirmBtn.className = 'cb-btn-option cb-btn-danger';
        confirmBtn.textContent = 'Cancel Application';
        confirmBtn.addEventListener('click', () => {
            this.resetConversationState();
            this.closeChat();
        });

        const keepBtn = document.createElement('button');
        keepBtn.type = 'button';
        keepBtn.className = 'cb-btn-option';
        keepBtn.textContent = 'Keep Application';
        keepBtn.addEventListener('click', () => {
            this.renderQuestion(this.currentStepIndex, true);
        });

        container.appendChild(confirmBtn);
        container.appendChild(keepBtn);
        this.inputArea.appendChild(container);
    }

    /**
     * Resets candidate application state and conversation history.
     */
    resetConversationState() {
        const currentJob = {
            id: this.state.jobId,
            title: this.state.jobTitle,
            location: this.state.jobLocation,
            jobType: this.state.jobType
        };

        this.state = {
            jobId: currentJob.id,
            jobTitle: currentJob.title,
            jobLocation: currentJob.location,
            jobType: currentJob.jobType,
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            experience: "",
            education: "",
            skills: [],
            resume: null,
            linkedinChoice: "",
            linkedin: "",
            agreementAccepted: false,
            agreementAcceptedAt: null,
            docuSignStatus: "demo_pending",
            assessmentOpened: false
        };

        this.currentStepIndex = 0;
        this.stepHistory = [];
        this.isEditing = false;
        this.isSubmitting = false;
        this.isSubmitted = false;

        if (this.messagesContainer) this.messagesContainer.innerHTML = '';
        if (this.inputArea) this.inputArea.innerHTML = '';
        this.updateProgressIndicator(null);
    }

    /**
     * Renders enhanced Review Screen separating Job Information and Candidate Information.
     */
    async renderReviewScreen() {
        this.inputArea.innerHTML = '';
        this.updateProgressIndicator(null);

        await this.appendBotMessage("Review your application");

        const reviewCard = document.createElement('div');
        reviewCard.className = 'cb-review-card cb-fade-in';

        const jobFields = [
            { label: 'Applying For', value: this.state.jobTitle },
            { label: 'Location', value: this.state.jobLocation },
            { label: 'Job Type', value: this.state.jobType }
        ];

        const candidateFields = [
            { label: 'First Name', value: this.state.firstName, stepIndex: 1 },
            { label: 'Last Name', value: this.state.lastName, stepIndex: 2 },
            { label: 'Email', value: this.state.email, stepIndex: 3 },
            { label: 'Phone', value: this.state.phone, stepIndex: 4 },
            { label: 'Experience', value: this.state.experience, stepIndex: 5 },
            { label: 'Education', value: this.state.education, stepIndex: 6 },
            { label: 'Skills', value: Array.isArray(this.state.skills) ? this.state.skills.join(', ') : '', stepIndex: 7 },
            { label: 'Resume', value: this.state.resume ? this.state.resume.name : 'Not provided', stepIndex: 8 },
            { label: 'LinkedIn', value: this.state.linkedin || 'Not provided', stepIndex: 10 }
        ];

        const agreementFields = [
            { label: 'Agreement Status', value: this.state.agreementAccepted ? 'Accepted' : 'Pending Acceptance' }
        ];

        let html = `
            <div class="cb-review-section">
                <div class="cb-review-section-title">JOB INFORMATION</div>
                <div class="cb-review-table">
        `;

        jobFields.forEach(item => {
            html += `
                <div class="cb-review-row">
                    <span class="cb-review-label">${this.escapeHtml(item.label)}</span>
                    <span class="cb-review-value">${this.escapeHtml(item.value)}</span>
                </div>
            `;
        });

        html += `
                </div>
            </div>
            <div class="cb-review-section" style="margin-top: 0.75rem;">
                <div class="cb-review-section-title">CANDIDATE INFORMATION</div>
                <div class="cb-review-table">
        `;

        candidateFields.forEach(item => {
            html += `
                <div class="cb-review-row">
                    <div class="cb-review-header-row">
                        <span class="cb-review-label">${this.escapeHtml(item.label)}</span>
                        <button type="button" class="cb-btn-edit" data-step="${item.stepIndex}">Edit</button>
                    </div>
                    <div class="cb-review-value">${this.escapeHtml(item.value || 'N/A')}</div>
                </div>
            `;
        });

        html += `
                </div>
            </div>
            <div class="cb-review-section" style="margin-top: 0.75rem;">
                <div class="cb-review-section-title">AGREEMENT</div>
                <div class="cb-review-table">
        `;

        agreementFields.forEach(item => {
            html += `
                <div class="cb-review-row">
                    <span class="cb-review-label">${this.escapeHtml(item.label)}</span>
                    <span class="cb-review-value">${this.escapeHtml(item.value)}</span>
                </div>
            `;
        });

        html += `
                </div>
            </div>
        `;

        reviewCard.innerHTML = html;

        reviewCard.querySelectorAll('.cb-btn-edit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetStep = parseInt(e.target.getAttribute('data-step'), 10);
                this.isEditing = true;
                this.renderQuestion(targetStep);
            });
        });

        const wrapper = document.createElement('div');
        wrapper.className = 'cb-review-wrapper';
        wrapper.appendChild(reviewCard);

        this.appendBotMessage(wrapper);

        const submitContainer = document.createElement('div');
        submitContainer.className = 'cb-submit-container';

        const submitBtn = document.createElement('button');
        submitBtn.type = 'button';
        submitBtn.className = 'cb-btn-primary cb-btn-submit';
        submitBtn.id = 'cb-submit-app-btn';
        submitBtn.innerHTML = `Submit Application`;

        submitBtn.addEventListener('click', () => this.proceedToAgreementStep());

        submitContainer.appendChild(submitBtn);
        this.inputArea.appendChild(submitContainer);
    }

    /**
     * Renders Student Consent & Program Agreement step.
     */
    async proceedToAgreementStep() {
        this.inputArea.innerHTML = '';
        this.updateProgressIndicator(null);

        await this.appendBotMessage("Please review and accept the program consent agreement below to proceed with your enrollment.");

        const firstName = this.escapeHtml(this.state.firstName || 'Candidate');
        const lastName = this.escapeHtml(this.state.lastName || '');
        const orgName = this.escapeHtml(this.config.organizationName || 'Vidwath');
        const duration = this.escapeHtml(this.config.programDuration || '3 months');
        const feeText = this.escapeHtml(this.config.programFeeText || 'applicable 3-month program fee');
        const agreementTitle = this.escapeHtml(this.config.agreementTitle || 'STUDENT CONSENT & AGREEMENT');
        const todayDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

        const agreementWrapper = document.createElement('div');
        agreementWrapper.className = 'cb-agreement-card cb-fade-in';
        agreementWrapper.innerHTML = `
            <div class="cb-agreement-header">
                <div class="cb-agreement-title">${agreementTitle}</div>
                <div class="cb-agreement-subtitle">AI TRAINING & PRACTICAL PROJECT IMPLEMENTATION PROGRAM</div>
            </div>
            <div class="cb-agreement-body">
                <p>I, <strong>${firstName} ${lastName}</strong>, voluntarily agree to enroll and participate in the ${duration} AI Training & Practical Project Implementation Program offered by <strong>${orgName}</strong>.</p>
                <p>The program duration is ${duration}.</p>
                <p>I agree to pay the ${feeText} as communicated to me at the time of enrollment.</p>
                <p>I agree to actively participate in the AI training, practical exercises, assignments, and project implementation activities.</p>
                <p>I understand that participation and payment do not guarantee employment, internship, placement, salary, or any specific career outcome, unless separately agreed in writing.</p>
                <p>I agree to follow the program's training, project, confidentiality, and acceptable-use requirements.</p>
                <p>I confirm that I have read, understood, and voluntarily accepted this consent.</p>
            </div>
            <div class="cb-acceptance-box">
                <div class="cb-acceptance-title">STUDENT ACCEPTANCE</div>
                <label class="cb-checkbox-label">
                    <input type="checkbox" id="cb-consent-checkbox" ${this.state.agreementAccepted ? 'checked' : ''}>
                    <span>I have read and understood the above terms and voluntarily agree to the AI Training & Practical Project Implementation Program, including the applicable 3-month program fee and payment obligation.</span>
                </label>
                <div class="cb-acceptance-details">
                    <div><strong>First Name:</strong> ${firstName}</div>
                    <div><strong>Last Name:</strong> ${lastName}</div>
                    <div><strong>Student Signature:</strong> <em class="cb-signature-note">[DocuSign will eventually handle this]</em></div>
                    <div><strong>Date:</strong> ${todayDate}</div>
                </div>
            </div>
        `;

        await this.appendBotMessage(agreementWrapper);

        // Input controls
        const actionsRow = document.createElement('div');
        actionsRow.className = 'cb-input-actions-row';

        const backBtn = document.createElement('button');
        backBtn.type = 'button';
        backBtn.className = 'cb-btn-back';
        backBtn.innerHTML = '← Back';
        backBtn.addEventListener('click', () => this.renderReviewScreen());

        const acceptBtn = document.createElement('button');
        acceptBtn.type = 'button';
        acceptBtn.className = 'cb-btn-primary';
        acceptBtn.id = 'cb-btn-accept-agreement';
        acceptBtn.textContent = 'Accept & Proceed →';
        acceptBtn.disabled = !this.state.agreementAccepted;

        actionsRow.appendChild(backBtn);
        actionsRow.appendChild(acceptBtn);
        this.inputArea.appendChild(actionsRow);

        const checkbox = agreementWrapper.querySelector('#cb-consent-checkbox');
        if (checkbox) {
            checkbox.addEventListener('change', (e) => {
                acceptBtn.disabled = !e.target.checked;
            });
        }

        acceptBtn.addEventListener('click', () => {
            this.state.agreementAccepted = true;
            this.state.agreementAcceptedAt = new Date().toISOString();
            this.initiateDocuSignSigning();
        });
    }

    /**
     * Demo Signing Step & DocuSign Backend Integration Hook.
     */
    async initiateDocuSignSigning() {
        this.inputArea.innerHTML = '';
        this.state.docuSignStatus = "demo_accepted";

        // Call integration layer stub
        if (window.DocuSignIntegration) {
            window.DocuSignIntegration.createEnvelope(this.state, this.config);
        }

        await this.appendBotMessage("Agreement accepted. DocuSign signing will be connected in the next integration step.");

        const actionsRow = document.createElement('div');
        actionsRow.className = 'cb-input-actions-row';

        const backBtn = document.createElement('button');
        backBtn.type = 'button';
        backBtn.className = 'cb-btn-back';
        backBtn.innerHTML = '← Back';
        backBtn.addEventListener('click', () => this.proceedToAgreementStep());

        const continueBtn = document.createElement('button');
        continueBtn.type = 'button';
        continueBtn.className = 'cb-btn-primary';
        continueBtn.textContent = 'Continue to Assessment →';
        continueBtn.addEventListener('click', () => this.proceedToAssessmentStep());

        actionsRow.appendChild(backBtn);
        actionsRow.appendChild(continueBtn);
        this.inputArea.appendChild(actionsRow);
    }

    /**
     * Renders Screening Test & Assessment Step.
     */
    async proceedToAssessmentStep() {
        this.inputArea.innerHTML = '';
        this.state.assessmentOpened = true;

        await this.appendBotMessage("Please complete the initial screening test using the link below.");

        const testUrl = this.config.hackerRankTestUrl || "https://www.hackerrank.com/test/demo-ai-screening";

        const assessmentCard = document.createElement('div');
        assessmentCard.className = 'cb-assessment-card cb-fade-in';
        assessmentCard.innerHTML = `
            <div class="cb-assessment-title">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
                HackerRank Test
            </div>
            <p style="font-size: 0.74rem; color: #475569; margin: 0; line-height: 1.35;">Complete your online screening assessment to finalize your application.</p>
            <a href="${this.escapeHtml(testUrl)}" target="_blank" rel="noopener noreferrer" class="cb-btn-assessment">
                Open Assessment ↗
            </a>
        `;

        await this.appendBotMessage(assessmentCard);

        this.submitApplication();
    }

    /**
     * Handles candidate application submission with simulated network delay.
     */
    async submitApplication() {
        if (this.isSubmitting) return;
        this.isSubmitting = true;

        const submitBtn = document.getElementById('cb-submit-app-btn');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span class="cb-spinner"></span> Submitting application...`;
        }

        // Simulate 1.2s network latency
        await new Promise(resolve => setTimeout(resolve, 1200));

        this.isSubmitting = false;
        this.isSubmitted = true;
        this.renderSuccessScreen();
    }

    /**
     * Renders Success Screen.
     */
    async renderSuccessScreen() {
        this.inputArea.innerHTML = '';
        this.updateProgressIndicator(null);

        const successWrapper = document.createElement('div');
        successWrapper.className = 'cb-success-box';

        successWrapper.innerHTML = `
            <h3 class="cb-success-heading">🎉 Application completed successfully!</h3>
            <p><strong>Thank you, ${this.escapeHtml(this.state.firstName)}.</strong></p>
            <p>Your application for the <strong>${this.escapeHtml(this.state.jobTitle)}</strong> position at <strong>${this.escapeHtml(this.config.companyName || 'Vidwath')}</strong> has been successfully received.</p>
            <p class="cb-success-subtext">Our recruitment team will review your profile and contact you at <em>${this.escapeHtml(this.state.email)}</em> if your experience matches this opportunity.</p>
        `;

        await this.appendBotMessage(successWrapper);

        // Success screen footer controls
        const container = document.createElement('div');
        container.className = 'cb-button-grid';

        const viewJobsBtn = document.createElement('button');
        viewJobsBtn.type = 'button';
        viewJobsBtn.className = 'cb-btn-option';
        viewJobsBtn.textContent = 'View Other Jobs';
        viewJobsBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            this.closeChat();
        });

        const closeChatBtn = document.createElement('button');
        closeChatBtn.type = 'button';
        closeChatBtn.className = 'cb-btn-option';
        closeChatBtn.textContent = 'Close Chat';
        closeChatBtn.addEventListener('click', () => this.closeChat());

        container.appendChild(viewJobsBtn);
        container.appendChild(closeChatBtn);
        this.inputArea.appendChild(container);
    }

    /**
     * Escapes HTML string.
     * @param {string} str 
     * @returns {string}
     */
    escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    /**
     * Formats bytes.
     * @param {number} bytes 
     * @returns {string}
     */
    formatBytes(bytes) {
        if (!bytes || bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}

// Make class available for embed loader
window.CareerChatbotEngine = CareerChatbot;

// Instantiate chatbot engine automatically when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (window.BOT_CONFIG && window.CHATBOT_QUESTIONS && window.ChatbotValidation) {
        if (!window.careerChatbot) {
            window.careerChatbot = new CareerChatbot(window.BOT_CONFIG, window.CHATBOT_QUESTIONS, window.ChatbotValidation);
            window.careerChatbot.init();
        }
    }
});
})();

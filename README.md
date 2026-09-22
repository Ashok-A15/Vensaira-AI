# VENSAIRA AI

> **Your Vision, Powered by AI**  
> Enterprise AI Solutions, Software Engineering, Industry Transformation, and AI-Powered eLearning Platform.

---

## 🚀 Overview

**VENSAIRA AI** is a modern, high-performance web platform built with **React 19**, **Vite**, and **React Router 7**. The platform delivers a dual experience:
1. **Corporate Enterprise Portal:** Showcasing end-to-end AI capabilities, industry-specific solutions, technology services, company mission, and corporate contact inquiries.
2. **Integrated eLearning Platform:** A dedicated learning management experience offering curriculum tracks in AI/ML, Generative AI, Cloud Computing, Full Stack Development, Data Analytics, and Agentic AI.

---

## 🛠️ Technology Stack

- **Frontend Framework:** [React 19](https://react.dev/)
- **Build Tool & Bundler:** [Vite 8](https://vitejs.dev/)
- **Routing:** [React Router 7](https://reactrouter.com/) (`react-router-dom`)
- **Styling:** Modular Vanilla CSS with comprehensive design tokens, glassmorphism, responsive grid systems, and dark/light themes
- **Interactive Visuals:** Native HTML5 Canvas 2D neural network particle animation (respects `prefers-reduced-motion`)
- **Form Handling:** Formspree API integration for inquiry submissions
- **State Management:** React Context API (`AuthContext`) for eLearning authentication & user state

---

## 🌐 Application Architecture & Routes

### Corporate Website
- `/` — Main landing page (Hero, AI Solutions, About Us, Industries, Innovation, eLearning showcase, Customers)
- `/contact` — Two-column enterprise contact form with area-of-interest selection and Formspree integration
- `/mission-vision` — Corporate mission, vision, and core values

### AI Solutions
- `/ai-solutions` — AI Solutions Overview Landing
- `/ai-solutions/ai-machine-learning` — AI & Machine Learning
- `/ai-solutions/generative-ai-llms` — Generative AI & Large Language Models
- `/ai-solutions/agentic-ai` — Agentic AI & Intelligent Automation
- `/ai-solutions/ai-chatbots` — AI Chatbots & Virtual Assistants
- `/ai-solutions/conversational-ai` — Enterprise Conversational AI
- `/ai-solutions/quantum-machine-learning` — Quantum Machine Learning
- `/ai-solutions/ai-elearning` — AI for Education & Training

### Services
- `/services/software-engineering` — Software Engineering & Cloud Native Systems
- `/services/cloud-infrastructure` — Cloud Infrastructure & DevOps
- `/services/data-intelligence` — Data & Business Intelligence
- `/services/digital-solutions` — Digital Solutions & Enterprise Transformation
- `/services/automation-integration` — Automation & Systems Integration

### Industry Solutions
- `/industries/healthcare` — Healthcare & Life Sciences
- `/industries/education` — Education & EdTech
- `/industries/logistics` — Logistics & Supply Chain
- `/industries/financial-services` — Financial Services & FinTech
- `/industries/retail-ecommerce` — Retail & E-Commerce
- `/industries/manufacturing` — Manufacturing & Industry 4.0
- `/industries/technology-saas` — Technology & SaaS
- `/industries/professional-services` — Professional Services & Consulting

### eLearning Platform
- `/elearning` — eLearning Portal Home
- `/elearning/courses` — Course Catalog with category filtering and difficulty tags
- `/elearning/courses/:courseId` — Dynamic Course Details & Curriculum
- `/elearning/about` — eLearning About & Learning Methodology
- `/elearning/login` — User Authentication / Sign In
- `/elearning/signup` — Student Registration / Account Creation
- `/elearning/dashboard` — Student Learning Dashboard & Progress Tracking
- `/elearning/account` — Profile & Settings Management
- `/elearning/contact` — Academic & Course Inquiries

---

## 📁 Repository Structure

```
VENSAIRA AI/
├── README.md                           # Repository documentation
├── .gitignore                          # Global gitignore configuration
└── vensaira-react/                     # React application workspace
    ├── index.html                      # HTML entry point & SEO metadata
    ├── package.json                    # Project dependencies & npm scripts
    ├── vite.config.js                  # Vite configuration
    ├── public/
    │   └── assets/                     # Static production assets
    │       ├── about-us.jpg
    │       ├── hero_abstract_tech.jpg
    │       ├── logo-header-clean.png
    │       ├── logo-footer-clean.png
    │       ├── ai-solutions/           # AI solution imagery
    │       ├── capabilities/           # Capability cards imagery
    │       ├── contact/                # Contact section imagery
    │       ├── customers/              # Customer showcase imagery
    │       ├── elearning/              # eLearning hero & course imagery
    │       ├── industries/             # Industry solution imagery
    │       ├── innovation/             # Innovation section imagery
    │       └── services/               # Service card imagery
    └── src/
        ├── App.jsx                     # Route definitions & layout wrappers
        ├── main.jsx                    # Application bootstrapping
        ├── animations/                 # Canvas animation hooks
        ├── components/                 # Global UI & section components
        │   ├── Header.jsx
        │   ├── Footer.jsx
        │   ├── Hero.jsx
        │   ├── AISolutions.jsx
        │   ├── About.jsx
        │   ├── Industries.jsx
        │   ├── Innovation.jsx
        │   ├── ELearning.jsx
        │   ├── Customers.jsx
        │   └── elearning/              # Dedicated eLearning Header & Footer
        ├── context/                    # AuthContext & state providers
        ├── data/                       # Structured JSON/JS datasets
        │   ├── aiSolutions.js
        │   ├── courses.js
        │   ├── customerFocus.js
        │   ├── industries.js
        │   ├── innovation.js
        │   └── services.js
        ├── pages/                      # Application route views
        │   ├── Home.jsx
        │   ├── Contact.jsx
        │   ├── MissionVision.jsx
        │   ├── AiSolutionsLanding.jsx
        │   ├── elearning/              # eLearning page views
        │   ├── industries/             # Industry detail page views
        │   └── services/               # Service detail page views
        └── styles/                     # Modular CSS stylesheets
            ├── global.css
            ├── header.css
            ├── footer.css
            ├── hero.css
            ├── sections.css
            ├── cards.css
            ├── contact.css
            ├── elearning.css
            └── elearning-footer.css
```

---

## ⚡ Getting Started Locally

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation & Run

1. **Navigate to the React project directory:**
   ```bash
   cd vensaira-react
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview the production build locally:**
   ```bash
   npm run preview
   ```

---

## 🔒 Security & Privacy

- Environment variables and credentials are excluded via `.gitignore`.
- Zero sensitive data or server secrets stored in client-side code.
- Contact submissions routed directly to encrypted Formspree endpoints.

---

## 📄 License

&copy; 2026 **VENSAIRA AI**. All rights reserved.
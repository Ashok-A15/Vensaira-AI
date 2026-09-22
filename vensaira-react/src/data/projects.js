export const PROJECTS = [
  {
    id: 'customer-sentiment-ai',
    title: 'Customer Sentiment Intelligence Pipeline',
    category: 'AI & Machine Learning',
    level: 'Intermediate',
    duration: '3 Weeks',
    description: 'Build an end-to-end NLP pipeline analyzing customer support interactions, classifying sentiment, and predicting churn in real time.',
    image: '/assets/elearning/courses/ai-ml.jpg',
    technologies: ['Python', 'Scikit-Learn', 'Transformers', 'FastAPI'],
    objectives: [
      'Ingest and preprocess multi-channel customer feedback datasets.',
      'Fine-tune pre-trained transformer models for multi-class sentiment analysis.',
      'Deploy an inference microservice with automated confidence scoring and metrics.',
      'Connect the predictions to a real-time alerting system for high-risk accounts.'
    ]
  },
  {
    id: 'rag-enterprise-assistant',
    title: 'Enterprise Knowledge Assistant with RAG',
    category: 'Generative AI & LLMs',
    level: 'Intermediate to Advanced',
    duration: '4 Weeks',
    description: 'Develop a production-grade Retrieval-Augmented Generation system using vector search, embeddings, and context-aware LLM agents.',
    image: '/assets/elearning/courses/generative-ai.jpg',
    technologies: ['LangChain', 'OpenAI API', 'ChromaDB', 'React'],
    objectives: [
      'Chunk and embed proprietary enterprise documents using modern embedding models.',
      'Implement hybrid semantic and keyword search with vector database indexing.',
      'Construct guardrails, context validation, and citation tracking for factual accuracy.',
      'Package as an interactive conversational UI with streaming responses.'
    ]
  },
  {
    id: 'multi-agent-orchestrator',
    title: 'Autonomous Multi-Agent Workflow Orchestrator',
    category: 'Agentic AI',
    level: 'Advanced',
    duration: '4 Weeks',
    description: 'Design and orchestrate collaborating AI agents to automate multi-step research, code review, and report generation workflows.',
    image: '/assets/elearning/courses/agentic-ai.jpg',
    technologies: ['CrewAI / LangGraph', 'Python', 'Docker', 'REST APIs'],
    objectives: [
      'Define specialized agent personas with unique tools, roles, and memory stores.',
      'Implement deterministic state machines for resilient handoffs and error recovery.',
      'Execute automated tool calling for live data retrieval and synthesis.',
      'Monitor token efficiency, latency, and cost per multi-agent execution.'
    ]
  },
  {
    id: 'cloud-infrastructure-cicd',
    title: 'Cloud-Native Microservices & Infrastructure CI/CD',
    category: 'Cloud Computing',
    level: 'Beginner to Intermediate',
    duration: '3 Weeks',
    description: 'Deploy containerized applications with Docker and Kubernetes, configuring automated CI/CD pipelines and cloud monitoring.',
    image: '/assets/elearning/courses/cloud-computing.jpg',
    technologies: ['Docker', 'Kubernetes', 'GitHub Actions', 'Terraform', 'AWS'],
    objectives: [
      'Containerize full-stack services with optimized multi-stage Docker builds.',
      'Write Infrastructure as Code (IaC) to provision cloud resources reliably.',
      'Build end-to-end GitHub Actions workflows for testing, linting, and deployment.',
      'Set up Prometheus and Grafana for real-time cluster observability.'
    ]
  },
  {
    id: 'fullstack-ai-saas',
    title: 'Full-Stack AI SaaS Application',
    category: 'Full Stack Development',
    level: 'Intermediate',
    duration: '4 Weeks',
    description: 'Create a modern full-stack web application featuring secure user authentication, subscription billing, and real-time AI query streaming.',
    image: '/assets/elearning/courses/fullstack.jpg',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Express', 'Stripe'],
    objectives: [
      'Architect relational database models with migrations and foreign key constraints.',
      'Implement secure JWT authentication and role-based access control (RBAC).',
      'Integrate payment webhooks and subscription tier management.',
      'Stream server-sent events (SSE) for responsive, low-latency AI responses.'
    ]
  },
  {
    id: 'predictive-analytics-bi',
    title: 'Predictive Business Analytics & Forecasting Platform',
    category: 'Data Analytics',
    level: 'Intermediate',
    duration: '3 Weeks',
    description: 'Construct an interactive business intelligence platform utilizing automated ETL pipelines, time-series forecasting, and live KPI dashboards.',
    image: '/assets/elearning/courses/data-analytics.jpg',
    technologies: ['Python', 'Pandas', 'Prophet', 'SQL', 'Chart.js'],
    objectives: [
      'Build automated ETL jobs to clean, aggregate, and normalize transactional data.',
      'Train time-series forecasting models to project revenue and inventory demand.',
      'Design interactive dashboard views with dynamic filtering and date ranges.',
      'Export automated executive summary reports with actionable insights.'
    ]
  }
];

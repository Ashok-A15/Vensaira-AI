export const COURSES = [
  {
    id: 'ai-ml',
    slug: 'ai-ml',
    title: 'Artificial Intelligence & Machine Learning',
    category: 'Artificial Intelligence',
    description: 'Learn the foundations of AI and machine learning and build practical intelligent applications.',
    image: '/assets/elearning/courses/ai-ml.jpg',
    level: 'Beginner to Intermediate',
    duration: '8 Weeks',
    modules: [
      { id: 1, title: 'Introduction to Machine Learning', lessons: 4 },
      { id: 2, title: 'Supervised Learning Algorithms', lessons: 6 },
      { id: 3, title: 'Neural Networks and Deep Learning', lessons: 5 },
      { id: 4, title: 'Model Evaluation and Deployment', lessons: 4 }
    ],
    learningOutcomes: [
      'Understand core machine learning algorithms and their applications.',
      'Train, evaluate and deploy predictive models using Python.',
      'Apply deep learning concepts to solve complex data problems.',
      'Integrate AI models into existing software architectures.'
    ]
  },
  {
    id: 'generative-ai',
    slug: 'generative-ai',
    title: 'Generative AI & Large Language Models',
    category: 'Artificial Intelligence',
    description: 'Learn modern Generative AI concepts, LLMs, prompting, embeddings and AI application development.',
    image: '/assets/elearning/courses/generative-ai.jpg',
    level: 'Intermediate',
    duration: '6 Weeks',
    modules: [
      { id: 1, title: 'Foundations of Generative AI', lessons: 4 },
      { id: 2, title: 'Prompt Engineering & Context', lessons: 5 },
      { id: 3, title: 'RAG (Retrieval-Augmented Generation)', lessons: 6 },
      { id: 4, title: 'Building Autonomous Agents', lessons: 5 }
    ],
    learningOutcomes: [
      'Understand the architecture of Large Language Models.',
      'Master prompt engineering for robust AI responses.',
      'Implement RAG pipelines to connect LLMs to proprietary data.',
      'Develop multi-agent AI systems for complex automation.'
    ]
  },
  {
    id: 'cloud-computing',
    slug: 'cloud-computing',
    title: 'Cloud Computing',
    category: 'Cloud Computing',
    description: 'Learn cloud fundamentals, architecture, deployment and modern cloud services.',
    image: '/assets/elearning/courses/cloud-computing.jpg',
    level: 'Beginner to Intermediate',
    duration: '6 Weeks',
    modules: [
      { id: 1, title: 'Cloud Architecture Fundamentals', lessons: 5 },
      { id: 2, title: 'Containerization with Docker', lessons: 6 },
      { id: 3, title: 'Kubernetes Orchestration', lessons: 7 },
      { id: 4, title: 'CI/CD and Infrastructure as Code', lessons: 6 }
    ],
    learningOutcomes: [
      'Design secure, highly available cloud architectures.',
      'Package and deploy applications using Docker containers.',
      'Orchestrate complex microservices with Kubernetes.',
      'Automate infrastructure provisioning using Terraform.'
    ]
  },
  {
    id: 'fullstack',
    slug: 'fullstack',
    title: 'Full Stack Development',
    category: 'Web Development',
    description: 'Learn modern frontend and backend development and build production-ready web applications.',
    image: '/assets/elearning/courses/fullstack.jpg',
    level: 'Intermediate',
    duration: '10 Weeks',
    modules: [
      { id: 1, title: 'Frontend Fundamentals (HTML/CSS/JS)', lessons: 8 },
      { id: 2, title: 'React & Component Architecture', lessons: 10 },
      { id: 3, title: 'Backend Development with Node.js', lessons: 8 },
      { id: 4, title: 'Databases & Authentication', lessons: 6 }
    ],
    learningOutcomes: [
      'Build responsive frontend interfaces using React.',
      'Develop robust backend APIs with Node.js and Express.',
      'Integrate and manage SQL and NoSQL databases.',
      'Implement secure user authentication and authorization.'
    ]
  },
  {
    id: 'data-analytics',
    slug: 'data-analytics',
    title: 'Data Analytics',
    category: 'Data & Analytics',
    description: 'Learn data analysis, visualization and practical techniques for turning data into useful insights.',
    image: '/assets/elearning/courses/data-analytics.jpg',
    level: 'Beginner to Intermediate',
    duration: '6 Weeks',
    modules: [
      { id: 1, title: 'Data Processing Fundamentals', lessons: 4 },
      { id: 2, title: 'SQL for Data Analysis', lessons: 5 },
      { id: 3, title: 'Data Visualization Techniques', lessons: 6 },
      { id: 4, title: 'Business Intelligence Dashboards', lessons: 4 }
    ],
    learningOutcomes: [
      'Extract, clean and analyze datasets efficiently.',
      'Write complex SQL queries for business reporting.',
      'Design compelling data visualizations.',
      'Build interactive BI dashboards for stakeholders.'
    ]
  },
  {
    id: 'agentic-ai',
    slug: 'agentic-ai',
    title: 'Agentic AI',
    category: 'Artificial Intelligence',
    description: 'Learn how intelligent AI agents can reason, plan, use tools and execute multi-step workflows autonomously.',
    image: '/assets/elearning/courses/agentic-ai.jpg',
    level: 'Intermediate to Advanced',
    duration: '6 Weeks',
    modules: [
      { id: 1, title: 'Foundations of Agentic AI', lessons: 4 },
      { id: 2, title: 'Tool Use and Function Calling', lessons: 5 },
      { id: 3, title: 'Multi-Agent System Design', lessons: 6 },
      { id: 4, title: 'Production Deployment of AI Agents', lessons: 4 }
    ],
    learningOutcomes: [
      'Understand the architecture of agentic AI systems.',
      'Build agents that use tools, search the web and call APIs.',
      'Design multi-agent pipelines for complex automation tasks.',
      'Deploy and monitor production AI agents safely.'
    ]
  }
];

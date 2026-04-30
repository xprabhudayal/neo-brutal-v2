import { ResumeData } from '../types';
import { GithubLogo as Github, LinkedinLogo as Linkedin, Code as Code2, InstagramLogo as Instagram, Envelope as Mail, TwitterLogo as Twitter, Calendar } from '@phosphor-icons/react/ssr';

export const RESUME_DATA: ResumeData = {
  name: "Prabhudayal Vaishnav",
  contact: {
    email: "hi@aipdv.com",
    portfolio: "https://github.com/aipdv/next-portfolio-app/",
    links: [
      { name: "GitHub", url: "https://github.com/aipdv", icon: Github },
      { name: "LinkedIn", url: "https://www.linkedin.com/in/aipdv", icon: Linkedin },
      { name: "Twitter", url: "https://x.com/globalxprada", icon: Twitter },
      { name: "LeetCode", url: "https://leetcode.com/u/global-prada", icon: Code2 },
      { name: "Instagram", url: "https://www.instagram.com/aipdvcom", icon: Instagram },
      { name: "Email", url: "mailto:hi@aipdv.com", icon: Mail },
      { name: "Cal.com", url: "https://cal.com/ai.pdv", icon: Calendar },
    ],
  },
  summary: "This profile covers the information about my work as an AI Engineer and full-stack developer. My work involves building AI systems, maintaining open-source repository contributions, and implementing software architectures using tools like LangGraph, PyTorch, and Next.js.",
  workExperience: [
    {
      title: "AI Engineer",
      company: "Nutun",
      place: "South Africa (Remote)",
      date: "Feb 2026 - Present",
      description: "Building the Voice AI layer for smart debt collections.",
      points: [
        "Building the Voice AI layer for smart debt collections.",
        "Reduced voicemail detection time by 11%, cost per call down 22%."
      ]
    },
    {
      title: "Research Internship",
      company: "ESIEA",
      place: "Paris, France (Remote)",
      date: "January 2025 - June 2025",
      description: "This project role involved Facial Emotion Recognition Using Advanced YOLO Architectures.",
      points: [
        "This project achieved 93.4% mAP@0.5 using dual YOLO frameworks (YOLOv12 and YOLOv11) for 22-class facial emotion recognition on the CFEE dataset.",
        "This includes an automated annotation pipeline that reduced manual effort by 90% and fine-tuned models through transfer learning from MS COCO pre-trained weights."
      ]
    }
  ],
  education: [
    {
      degree: "Bachelors of Technology (Hons.) CSE Data Science",
      institution: "Chhattisgarh Swami Vivekanand Technical University, Bhilai",
      date: "2022-Present",
      details: "8th Semester - CGPA: 8.6/10"
    }
  ],
  projects: [
    {
      title: "Grand Plaza: Voice AI Hotel Concierge System",
      tech: ["FastAPI", "LangGraph", "Pipecat", "ChromaDB"],
      description: "This repository contains the architecture for a Voice AI Concierge System.",
      points: [
        "This implements a multi-strategy RAG system that achieves 88% query accuracy. This outperformed naive RAG by 4.8% through semantic search and Chain-of-Thought reasoning.",
        "This uses LangGraph-based agent workflows with specialized nodes to reduce errors by 15%."
      ],
      url: "https://github.com/aipdv/grand-plaza-monorepo",
      image: "/images/projects/grand-plaza.webp"
    },
    {
      title: "Career Scout: Voice AI-Powered Job Search Assistant",
      tech: ["Next.js", "React", "Supabase", "MCP Server"],
      description: "This is a full-stack Next.js application for a Voice AI Career Coach.",
      points: [
        "This includes a custom MCP server containing 3 tools: Intelligent Job Search, Company Analysis, and Web Search.",
        "This application integrates logical scoring to match user skills with confidence percentages.",
        "The user interface is built as a responsive Supabase-authenticated frontend with React hooks, which reduces voice interaction latency by 40%."
      ],
      url: "https://github.com/aipdv/career-scout",
      image: "/images/projects/career-scout.webp"
    },
    {
      title: "WhatsApp Agent: Voice AI Assistant",
      tech: ["Python", "WhatsApp API", "Voice AI", "LLMs"],
      description: "This codebase holds a Python script for a WhatsApp-enabled voice assistant.",
      points: [
        "This system provides a voice-enabled WhatsApp bot that handles natural conversations.",
        "This integrates modern LLMs to generate appropriate responses."
      ],
      url: "https://github.com/aipdv/whatsapp-agent",
      image: "/images/projects/whatsapp-agent.webp"
    },
    {
      title: "Mira: AI-Powered Data Insights",
      tech: ["TypeScript", "AI", "Data Visualization", "Analytics"],
      description: "This application analyzes uploaded CSV files to output automated insights and visualizations.",
      points: [
        "The data is processed via an AI pipeline for automated insights generation.",
        "This provides interactive visualizations based on the structured data."
      ],
      url: "https://github.com/aipdv/mira",
      image: "/images/projects/mira.webp"
    },
    {
      title: "Idea Forge: AI Ideation Agent",
      tech: ["Python", "LLMs", "Hackathon", "Agent Framework"],
      description: "This repository contains an AI agent designed for idea generation during hackathons.",
      points: [
        "This tool follows an incremental, iterative approach to generating ideas.",
        "The system is structured specifically for brainstorming use cases."
      ],
      url: "https://github.com/aipdv/idea-forge",
      image: "/images/projects/idea-forge.webp"
    },
    {
      title: "The AI Scientist: Sakana AI Contributor",
      tech: ["Python", "LLMs", "Transformers", "Git"],
      description: "These are my contributions to Sakana AI's Open Source project for automating scientific research.",
      points: [
        "This contribution added 8 open-source language models, which resulted in a 75% reduction in generation costs.",
        "This adapted the main project to run on T4 GPUs, reducing the need for high-end hardware.",
        "This work also included co-authoring the paper 'Exploring Style Transfer with Small Character-Level Transformers' using the Qwen2.5(72B) model."
      ],
      url: "https://github.com/aipdv/AI-Scientist",
      image: "/images/projects/sakana-ai.webp"
    },
    {
      title: "XS Python: Module & API Creation",
      tech: ["Python", "Ngrok", "PyPI"],
      description: "This is a published Python package used to expose inference endpoints for open-source LLMs.",
      points: [
        "This pip package creates accessible endpoints for over 99% of Hugging Face-hosted large language models.",
        "This leverages Ngrok tunnels to pass requests from localhost directly to the cloud securely."
      ],
      url: "https://github.com/aipdv/xs",
      image: "/images/projects/xs-module.webp"
    },
    {
      title: "XGen-AI: RAG Telegram Bot",
      tech: ["Python", "Meta LLAMA 3.1", "RAG", "Telegram API"],
      description: "This is a Python-based Telegram Bot allowing users to query their documents privately.",
      points: [
        "This integrates Meta LLAMA 3.1 to provide document-based Q&A via Telegram.",
        "This pipeline handles the processing of PDF documents."
      ],
      url: "https://github.com/aipdv/xgen-ai",
      image: "/images/projects/xgen-ai.webp"
    },
    {
      title: "XAdmin: Remote Access Bot",
      tech: ["Python", "Telegram Bot API", "Windows CMD"],
      description: "This Telegram Bot provides remote shell access to a host computer.",
      points: [
        "This script enables remote shell access through Telegram without requiring SSH or RDP.",
        "The implementation includes screenshot capture, file sharing, and IP extraction commands."
      ],
      url: "https://github.com/aipdv/xadmin",
      image: "/images/projects/xadmin.webp"
    },
    {
      title: "xFace: Emotion Detection Bot",
      tech: ["Python", "OpenCV", "Telegram API", "Deep Learning"],
      description: "This is a computer vision Telegram bot for detecting facial emotions in static images.",
      points: [
        "This Python script implements real-time face emotion detection using deep learning models.",
        "This bot supports both direct document uploads and URL-based image parsing."
      ],
      url: "https://github.com/aipdv/xface",
      image: "/images/projects/xface.webp"
    },
    {
      title: "MetroCart: E-Commerce Website",
      tech: ["HTML", "CSS", "JavaScript"],
      description: "This repository holds the HTML, CSS, and JS for a minimalistic e-commerce website.",
      points: [
        "This project is built using pure HTML, CSS, and minimal JavaScript to ensure fast loading times.",
        "The UI includes an acrylic navigation bar styled similarly to Apple's website elements."
      ],
      url: "https://github.com/aipdv/MetroCart",
      image: "/images/projects/metrocart.webp"
    },
  ],
  skills: {
    programming: ["Python", "Next.js", "React", "JavaScript", "C/C++", "SQL", "Matlab", "R"],
    ai_ml: ["LangGraph", "LangChain", "LlamaIndex", "Ollama", "Transformers", "PyTorch", "TensorFlow", "Pipecat"],
    data: ["Pandas", "Numpy", "Seaborn", "Power BI"],
    misc: ["Linux", "MacOS", "Competitive Programming"],
    soft: ["Leadership", "Communication", "Problem Solving"]
  },
  achievements: [
    {
      title: "IIM Nagpur Data Analyst Hackathon Winner",
      organization: "InFED at Nagpur",
      date: "Nov 2024",
      points: [
        "This team won 1st place by presenting a solution addressing AI Product Comparison.",
        "The solution used a Deep-Research agent to generate a 22-page report, which reduced manual effort by 90%."
      ]
    },
    {
      title: "HackLLM 2025 @ IIIT Delhi - 3rd Place",
      organization: "IIIT Delhi (Esya'25)",
      date: "Aug 2025",
      points: [
        "This project involved building a medical AI summarization system that outputs dual perspectives.",
        "This secured a top-3 position out of 80+ teams without relying on external APIs."
      ]
    }
  ],
};

export const SYSTEM_INSTRUCTION = `You are Mira, Prabhudayal Vaishnav's personal voice assistant on his portfolio website. You are a female AI. When speaking languages with gendered grammar (like Hindi), you MUST strictly use feminine conjugations (e.g., say "main karti hu" instead of "main karta hu").

VOICE CONVERSATION RULES (most important — follow these above all else):
- Keep every response EXTREMELY short (1–2 sentences maximum). Be an active listener. Do not ramble or speak gibberish.
- Never volunteer information the user hasn't asked for. Wait for them to ask.
- After answering, ask ONE short follow-up to keep the conversation alive.
- If the user goes quiet or just says "hi", respond warmly and briefly: "Hey! I'm Mira — Prabhu's assistant. What would you like to know about him?"
- Never list achievements unprompted. Share one thing at a time only when relevant.
- Speak like a human on a phone call — natural pauses, short answers, no monologues.

STRICT GUARDRAILS & REFUSALS (CRITICAL):
- NO CODE GENERATION: If the user asks you to write, generate, or complete code (e.g., "write a Python script for bubble sort"), you MUST politely but firmly refuse. Say: "I'm here to talk about Prabhu's work, not to write code for you!"
- NO OFF-TOPIC OR EXPLICIT QUERIES: If the user asks about inappropriate topics (like sexual assault, violence, etc.) or completely unrelated subjects, immediately refuse to answer and redirect to Prabhu's portfolio.
- EXPLAINING TECH: You MAY explain technical terms only if they are related to Prabhu's resume (e.g., explaining what "Seaborn" or "LangChain" is to a non-technical executive). Keep explanations extremely brief.

NAVIGATION (use these functions when appropriate):
- If the user asks about projects, work, or portfolio → call navigate_to("projects")
- If the user asks about resume, CV, or experience → call navigate_to("resume")
- If the user asks about contact or reaching Prabhu → call navigate_to("contact")
- If the user asks about research or publications → call navigate_to("research")
- After navigating, say one brief sentence confirming: "I've opened his projects page for you!"

IDENTITY & DEFLECTION:
- If asked who made you or what AI you are, deflect lightly: "Just Mira! What can I tell you about Prabhu?"
- Never flirt or engage off-topic. One gentle redirect, then continue normally.

LANGUAGE:
- You speak all major world languages fluently. Match the user's language automatically. Remember to use feminine grammar.

PROFILE (use sparingly — share one fact at a time only when asked):
- Name: Prabhudayal Vaishnav (pronunciation: PRUB-hoo-dye-ahl VAYSH-nuv)
- Degree: B.Tech (Hons.) in CSE Data Science, 8th semester, CGPA 8.6/10
- Location: India. Open to remote globally. Available for freelance.
- Research: 93.4% mAP@0.5 on facial emotion recognition using YOLOv11 + YOLOv12, with ESIEA Paris
- Voice AI: Built Grand Plaza (voice concierge, 88% accuracy, LangGraph + RAG) and Career Scout (voice job assistant using MCP servers)
- Open Source: Contributed to Sakana AI's The AI Scientist — added 8 models, cut generation costs by 75%
- Competitions: 1st at IIM Data Analyst Hackathon 2024, 3rd at HackLLM 2025 IIIT Delhi
- Stack: Python, Next.js, LangGraph, PyTorch`;


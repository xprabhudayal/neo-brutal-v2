import { ResumeData } from '../types';
import { GithubLogo as Github, LinkedinLogo as Linkedin, Code as Code2, InstagramLogo as Instagram, Envelope as Mail, TwitterLogo as Twitter, Calendar } from '@phosphor-icons/react/ssr';

export const RESUME_DATA: ResumeData = {
  name: "Prabhudayal Vaishnav",
  contact: {
    email: "p09m21@gmail.com",
    portfolio: "https://github.com/xprabhudayal/next-portfolio-app/",
    links: [
      { name: "GitHub", url: "https://github.com/xprabhudayal", icon: Github },
      { name: "LinkedIn", url: "https://www.linkedin.com/in/xprabhudayal", icon: Linkedin },
      { name: "Twitter", url: "https://x.com/globalxprada", icon: Twitter },
      { name: "LeetCode", url: "https://leetcode.com/u/global-prada", icon: Code2 },
      { name: "Instagram", url: "https://www.instagram.com/ai.pdv/", icon: Instagram },
      { name: "Email", url: "mailto:p09m21@gmail.com", icon: Mail },
      { name: "Cal.com", url: "https://cal.com/ai.pdv", icon: Calendar },
    ],
  },
  summary: "This profile covers the information about my work as an AI Engineer and full-stack developer. My work involves building AI systems, maintaining open-source repository contributions, and implementing software architectures using tools like LangGraph, PyTorch, and Next.js.",
  workExperience: [
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
      details: "7th Semester - CGPA: 8.6/10"
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
      url: "https://github.com/xprabhudayal/grand-plaza-monorepo",
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
      url: "https://github.com/xprabhudayal/career-scout",
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
      url: "https://github.com/xprabhudayal/whatsapp-agent",
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
      url: "https://github.com/xprabhudayal/mira",
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
      url: "https://github.com/xprabhudayal/idea-forge",
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
      url: "https://github.com/xprabhudayal/AI-Scientist",
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
      url: "https://github.com/xprabhudayal/xs",
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
      url: "https://github.com/xprabhudayal/xgen-ai",
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
      url: "https://github.com/xprabhudayal/xadmin",
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
      url: "https://github.com/xprabhudayal/xface",
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
      url: "https://github.com/xprabhudayal/MetroCart",
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

export const SYSTEM_INSTRUCTION = `You are a conversational AI assistant representing Prabhudayal Vaishnav. Your objective is to answer questions about his professional experience based on the provided resume data. Ensure you do not drift off-topic. All answers should be factual and direct.

Here is Prabhudayal's resume data in JSON format:
\${JSON.stringify(RESUME_DATA, null, 2)}

Provide answers using this direct style:
- When asked about projects, list the project and point out the tech stack and the core function it handles.
- When asked about skills, simply state the frameworks and tools he possesses.
- Keep your answers grounded and avoid marketing words like "innovative" or "cutting-edge". Do not use emojis. Provide straightforward summaries of his data.`;


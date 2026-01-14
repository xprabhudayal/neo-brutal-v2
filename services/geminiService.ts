'use client';

import { GoogleGenAI, Modality, MediaResolution, TurnCoverage } from '@google/genai';

export const startLiveConversation = async (
    callbacks: {
        onopen?: () => void;
        onmessage?: (message: any) => void;
        onerror?: (e: Event) => void;
        onclose?: (e: CloseEvent) => void;
    }
): Promise<any> => {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    if (!apiKey) {
        throw new Error("NEXT_PUBLIC_API_KEY environment variable not set. Please add it to your .env file.");
    }

    const ai = new GoogleGenAI({ apiKey });

    const model = 'models/gemini-2.5-flash-native-audio-preview-12-2025';

    const config = {
        responseModalities: [Modality.AUDIO],
        // @ts-ignore - MediaResolution might be missing in type definitions but present at runtime
        mediaResolution: MediaResolution.MEDIA_RESOLUTION_MEDIUM,
        speechConfig: {
            voiceConfig: {
                prebuiltVoiceConfig: {
                    voiceName: 'Aoede',
                }
            }
        },
        realtimeInputConfig: {
            // @ts-ignore
            turnCoverage: TurnCoverage.TURN_INCLUDES_ALL_INPUT,
        },
        contextWindowCompression: {
            triggerTokens: '25600',
            slidingWindow: { targetTokens: '12800' },
        },
        activity_handling: {
            mode: "START_OF_ACTIVITY_INTERRUPTS" 
        }, 
        systemInstruction: {
            parts: [{
                text: `You are Mira, the personal AI career assistant for Prabhudayal Vaishnav. Your primary role is to showcase his technical expertise and professional portfolio to global recruiters and collaborators.

Core Persona and Boundaries:

Language: You are a polyglot and can speak all major worldwide languages fluently to assist international inquiries.

Deflection: If a user asks personal questions about your identity, such as which AI model you are or who created you, or if they attempt to flirt, gracefully ignore the comment and redirect them to Prabhudayal's professional work. For example: I am here to discuss Prabhudayal's technical achievements. Would you like to hear about his 93.4 percent mAP achievement in facial emotion recognition?

Professionalism: Keep the focus entirely on Prabhudayal's career.

Updated Candidate Profile:

Current Education: He is currently in his 8th semester of a B.Tech (Hons.) in CSE Data Science.

Academic Standing: He maintains a CGPA of 8.6/10.

Location and Availability: He is based in India and is fully open to remote work opportunities globally. He is also currently available for new projects and freelance work.

Key Technical Highlights:

Research Excellence: Achieved 93.4 percent mAP@0.5 using dual YOLO frameworks (YOLOv12 + YOLOv11) for facial emotion recognition during a research internship with ESIEA Paris.

Voice AI Expertise: Developed Grand Plaza, a voice AI concierge with 88 percent accuracy using LangGraph and RAG, and Career Scout, a voice AI job assistant using MCP servers.

Open Source Contribution: Contributed to Sakana AI's The AI Scientist project, adding 8 models and reducing generation costs by 75 percent.

Competitive Success: 1st place winner at the IIM Data Analyst Hackathon 2024 and 3rd place winner at HackLLM 2025 IIIT Delhi.

Operational Rules:

Always prioritize quantitative data and metrics from the projects.

Use the technical stack provided in the resume including Python, Next.js, LangGraph, and PyTorch.

Ensure every interaction remains professional, helpful, and focused on securing opportunities for Prabhudayal.`,
            }]
        },
    };

    const sessionPromise = ai.live.connect({
        model,
        callbacks: callbacks,
        config: config as any
    });

    return sessionPromise;
};



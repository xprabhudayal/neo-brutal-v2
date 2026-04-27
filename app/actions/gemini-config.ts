'use server';
import { SYSTEM_INSTRUCTION } from "@/components/constants";

export async function getGeminiConfig() {
  return {
    systemInstruction: {
      parts: [{
        text: SYSTEM_INSTRUCTION
      }]
    },
    model: 'models/gemini-3.1-flash-live-preview',
    // Config matches GoogleGenAI.LiveConfig
    config: {
      tools: [{
        functionDeclarations: [{
          name: "navigate_to",
          description: "Navigate the user's browser to a specific section of the portfolio",
          parameters: {
            type: "object",
            properties: {
              page: {
                type: "string",
                enum: ["about", "contact", "links", "projects", "resume", "home", "research"],
                description: "The portfolio page to navigate to"
              }
            },
            required: ["page"]
          }
        }]
      }],
      responseModalities: ["AUDIO"],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: {
            voiceName: 'Aoede',
          }
        }
      },
      // Hardcoded for now as server doesn't import from web SDK
      mediaResolution: "MEDIA_RESOLUTION_MEDIUM",
      activity_handling: {
          mode: "START_OF_ACTIVITY_INTERRUPTS" 
      },
      contextWindowCompression: {
          triggerTokens: '25600',
          slidingWindow: { targetTokens: '12800' },
      },
      outputTranscription: { model: "gemini-3.1-flash-lite-preview" }, 
    }
  };
}

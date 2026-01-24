
import { GoogleGenAI, Modality } from '@google/genai';
import { DotenvConfigOptions } from 'dotenv';
require('dotenv').config({ path: '.env.local' });

async function testConnection() {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  if (!apiKey) {
    console.error("No API key found");
    return;
  }
  console.log("API Key found (length):", apiKey.length);

  const ai = new GoogleGenAI({ apiKey });
  const model = 'models/gemini-2.5-flash-native-audio-preview-12-2025';

  const config = {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
          voiceConfig: {
              prebuiltVoiceConfig: {
                  voiceName: 'Aoede',
              }
          }
      },
      systemInstruction: {
          parts: [{ text: "Hello, are you there?" }]
      }
  };

  try {
    console.log("Connecting...");
    // @ts-ignore
    const session = await ai.live.connect({
        model,
        callbacks: {
            onopen: () => console.log("Connected!"),
            onmessage: (msg) => console.log("Message received"),
            onclose: (e) => console.log("Closed", e.code, e.reason),
            onerror: (e) => console.error("Error", e)
        },
        // @ts-ignore
        config
    });

    console.log("Session object created.");
    
    // Keep alive for a moment
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    console.log("Closing...");
    session.close();
  } catch (error) {
    console.error("Connection failed:", error);
  }
}

testConnection();

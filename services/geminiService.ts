'use client';

// No global imports to avoid Node.js dependencies in client bundle

export const startLiveConversation = async (
    callbacks: {
        onopen?: () => void;
        onmessage?: (message: any) => void;
        onerror?: (e: Event) => void;
        onclose?: (e: CloseEvent) => void;
    }
): Promise<any> => {
    // Dynamically import the Web SDK
    const { GoogleGenAI } = await import('@google/genai/web');
    const { getGeminiConfig } = await import('@/app/actions/gemini-config');

    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    if (!apiKey) {
        throw new Error("NEXT_PUBLIC_API_KEY environment variable not set. Please add it to your .env file.");
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Fetch config from server
    const serverConfig = await getGeminiConfig();
    const model = serverConfig.model;

    const config = {
        ...serverConfig.config,
        systemInstruction: serverConfig.systemInstruction,
    };

    const sessionPromise = ai.live.connect({
        model,
        callbacks: callbacks as any,
        config: config as any
    });

    return sessionPromise;
};



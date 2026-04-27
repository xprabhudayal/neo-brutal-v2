'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Microphone, PhoneDisconnect, Check } from '@phosphor-icons/react';
import { AsyncQueue } from '../utils/AsyncQueue';

// Audio utility functions
function encode(bytes: Uint8Array): string {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function createBlob(data: Float32Array): any {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm',
  };
}

function decode(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export type OrbState = 'idle' | 'active' | 'command' | 'minimized' | 'error' | 'offline';

export interface VoiceOrbProps {
  isActiveProp?: boolean;
  onRequestOpen?: () => void;
  onNavigate?: (route: string) => void;
  onError?: (error: Error) => void;
  onClose?: () => void;
  autoEndTimeout?: number;
}

export default function VoiceOrb({ isActiveProp = false, onRequestOpen, onNavigate, onError, onClose, autoEndTimeout = 10000 }: VoiceOrbProps) {
  const router = useRouter();
  
  const [orbState, setOrbState] = useState<OrbState>('idle');
  const [previousState, setPreviousState] = useState<OrbState>('idle');
  const [commandText, setCommandText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showListeningText, setShowListeningText] = useState(false);

  // Audio & Session Refs
  const sessionRef = useRef<any | null>(null);
  const messageQueueRef = useRef<AsyncQueue<any>>(new AsyncQueue<any>());
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const audioSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const audioGainNodesRef = useRef<Set<GainNode>>(new Set());
  const processingTurnRef = useRef<boolean>(false);
  const isInitializingRef = useRef<boolean>(false);
  
  // Interaction Refs
  const orbRef = useRef<HTMLButtonElement>(null);
  const startYRef = useRef<number>(0);
  const currentYRef = useRef<number>(0);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const listeningTextTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Animation refs
  const userVolumeRef = useRef<number>(0);
  const waveformContainerRef = useRef<HTMLDivElement>(null);

  // Sync state with props
  useEffect(() => {
    if (isActiveProp && orbState === 'idle') {
      startVoiceSession();
    }
  }, [isActiveProp]);

  // Handle auto-end
  const resetSilenceTimer = useCallback(() => {
    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    silenceTimerRef.current = setTimeout(() => {
      if (orbState === 'active') {
        endCall();
      }
    }, autoEndTimeout);
  }, [orbState, autoEndTimeout]);

  useEffect(() => {
    if (orbState === 'active') {
      resetSilenceTimer();
      setShowListeningText(true);
      if (listeningTextTimerRef.current) clearTimeout(listeningTextTimerRef.current);
      listeningTextTimerRef.current = setTimeout(() => {
        setShowListeningText(false);
      }, 3000);
    } else {
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      if (listeningTextTimerRef.current) clearTimeout(listeningTextTimerRef.current);
      setShowListeningText(false);
    }
    return () => {
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      if (listeningTextTimerRef.current) clearTimeout(listeningTextTimerRef.current);
    };
  }, [orbState, resetSilenceTimer]);

  const cleanup = useCallback(() => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (scriptProcessorRef.current) {
      try { scriptProcessorRef.current.disconnect(); } catch (e) {}
      scriptProcessorRef.current = null;
    }
    audioSourcesRef.current.forEach(source => {
      try { source.stop(); source.disconnect(); } catch (e) {}
    });
    audioSourcesRef.current.clear();
    messageQueueRef.current.clear();

    if (sessionRef.current) {
      try { sessionRef.current.close(); } catch (e) {}
      sessionRef.current = null;
    }
    if (inputAudioContextRef.current) {
      try { inputAudioContextRef.current.close().catch(console.error); } catch (e) {}
      inputAudioContextRef.current = null;
    }
    if (outputAudioContextRef.current) {
      try { outputAudioContextRef.current.close().catch(console.error); } catch (e) {}
      outputAudioContextRef.current = null;
    }
    isInitializingRef.current = false;
  }, []);

  const endCall = () => {
    setOrbState('offline');
    cleanup();
    setTimeout(() => {
      setOrbState('idle');
      if (onClose) onClose();
    }, 500);
  };

  const processTurn = useCallback(async (): Promise<void> => {
    if (processingTurnRef.current) return;
    processingTurnRef.current = true;

    try {
      while (true) {
        const message = await messageQueueRef.current.get();

        const audioData = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
        if (audioData && outputAudioContextRef.current) {
          try {
            const audioCtx = outputAudioContextRef.current;
            const currentTime = audioCtx.currentTime;

            if (nextStartTimeRef.current < currentTime) {
              nextStartTimeRef.current = currentTime + 0.1;
            }

            const audioBuffer = await decodeAudioData(decode(audioData), audioCtx, 24000, 1);
            
            const source = audioCtx.createBufferSource();
            source.buffer = audioBuffer;
            const gainNode = audioCtx.createGain();
            gainNode.gain.value = 1;
            source.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            source.start(nextStartTimeRef.current);

            nextStartTimeRef.current += audioBuffer.duration;
            audioSourcesRef.current.add(source);
            audioGainNodesRef.current.add(gainNode);

            source.onended = () => {
              audioSourcesRef.current.delete(source);
              audioGainNodesRef.current.delete(gainNode);
            };
          } catch (error) {
            console.error('Audio playback error:', error);
          }
        }

        if (message.serverContent?.turnComplete) {
          break;
        }
      }
    } catch (error: any) {
      if (error?.message !== 'Queue cleared') {
        console.error('Turn processing error:', error);
      }
    } finally {
      processingTurnRef.current = false;
    }
  }, []);

  const startVoiceSession = async () => {
    if (isInitializingRef.current || orbState === 'active') return;
    try {
      isInitializingRef.current = true;
      setOrbState('active');
      setErrorMessage('');

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });

      inputAudioContextRef.current = inputAudioContext;
      outputAudioContextRef.current = outputAudioContext;

      const { startLiveConversation } = await import('../services/geminiService');

      const session = await startLiveConversation({
        onopen: () => {
          const source = inputAudioContext.createMediaStreamSource(stream);
          const scriptProcessor = inputAudioContext.createScriptProcessor(4096, 1, 1);
          scriptProcessorRef.current = scriptProcessor;

          scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
            const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
            
            // Calculate RMS volume for waveform animation
            let sum = 0;
            for (let i = 0; i < inputData.length; i++) {
              sum += inputData[i] * inputData[i];
            }
            userVolumeRef.current = Math.sqrt(sum / inputData.length);

            const pcmBlob = createBlob(inputData);
            if (sessionRef.current) {
              try {
                sessionRef.current.sendRealtimeInput({ audio: pcmBlob });
                resetSilenceTimer(); // Reset silence timer on audio input processing
              } catch (e) { }
            }
          };

          source.connect(scriptProcessor);
          scriptProcessor.connect(inputAudioContext.destination);
        },
        onmessage: (message: any) => {
          if (message.serverContent?.interrupted) {
            audioSourcesRef.current.forEach(source => {
              try { source.stop(); } catch (e) {}
            });
            audioSourcesRef.current.clear();
            messageQueueRef.current.clear();
            if (outputAudioContextRef.current) {
              nextStartTimeRef.current = outputAudioContextRef.current.currentTime;
            }
            return; 
          }

          if (message.toolCall) {
            const { functionCalls } = message.toolCall;
            if (functionCalls && functionCalls.length > 0) {
              const functionResponses: any[] = [];
              for (const call of functionCalls) {
                if (call.name === "navigate_to") {
                  const pageRoute = call.args.page === 'home' ? '' : call.args.page;
                  
                  // Set command state visually
                  setCommandText(`→ /${pageRoute || 'home'}`);
                  setOrbState('command');
                  
                  // Execute navigation after slight delay for visual
                  setTimeout(() => {
                    if (onNavigate) onNavigate(pageRoute);
                    else router.push(`/${pageRoute}`);
                  }, 300);

                  setTimeout(() => {
                    setOrbState(prev => prev === 'command' ? 'active' : prev);
                  }, 1500);

                  functionResponses.push({
                    id: call.id,
                    name: call.name,
                    response: { success: true }
                  });
                }
              }
              
              if (functionResponses.length > 0 && sessionRef.current) {
                try {
                  sessionRef.current.sendToolResponse({ functionResponses });
                } catch (e) {
                  console.error('Failed to send tool response:', e);
                }
              }
            }
          }

          messageQueueRef.current.put(message);
          if (!processingTurnRef.current) {
            processTurn();
          }
        },
        onerror: (e: any) => {
          console.error('Connection error:', e);
          if (onError) onError(new Error("Connection Error"));
          setErrorMessage('Connection error.');
          setOrbState('error');
          cleanup();
        },
        onclose: (e: any) => {
          cleanup();
          setOrbState('idle');
        },
      });

      sessionRef.current = session;
    } catch (err: any) {
      console.error('Initialization error:', err);
      setErrorMessage('Mic access denied. Check permissions.');
      if (onError) onError(err);
      setOrbState('error');
      isInitializingRef.current = false;
      setTimeout(() => {
         setOrbState('idle');
         setErrorMessage('');
      }, 5000);
    }
  };

  useEffect(() => {
    return () => cleanup();
  }, [cleanup]);

  // RequestAnimationFrame loop to update waveform state without triggering react renders
  useEffect(() => {
    let animationFrameId: number;
    const updateWaveform = () => {
      if (waveformContainerRef.current) {
        const userSpeaking = userVolumeRef.current > 0.015; // Threshold for mic volume
        const aiSpeaking = audioSourcesRef.current.size > 0;
        
        if (userSpeaking || aiSpeaking) {
          waveformContainerRef.current.classList.add('is-speaking');
        } else {
          waveformContainerRef.current.classList.remove('is-speaking');
        }
      }
      animationFrameId = requestAnimationFrame(updateWaveform);
    };

    if (orbState === 'active') {
      animationFrameId = requestAnimationFrame(updateWaveform);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [orbState]);

  // Handle Drag / Swipe to minimize
  const handlePointerDown = (e: React.PointerEvent) => {
    startYRef.current = e.clientY;
    currentYRef.current = e.clientY;
    orbRef.current?.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (startYRef.current === 0) return;
    currentYRef.current = e.clientY;
    const deltaY = currentYRef.current - startYRef.current;
    
    if (deltaY > 80 && orbState !== 'minimized') {
      setPreviousState(orbState);
      setOrbState('minimized');
      startYRef.current = 0; // reset
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    startYRef.current = 0;
    if (orbRef.current && orbRef.current.hasPointerCapture(e.pointerId)) {
       orbRef.current.releasePointerCapture(e.pointerId);
    }
  };

  const handleClick = () => {
    if (orbState === 'minimized') {
      setOrbState(previousState);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
    if (e.key === 'Escape' && orbState === 'active') {
      endCall();
    }
  };

  // Rendering logic based on state
  const isPill = orbState === 'active' || orbState === 'command';
  
  let containerClasses = "fixed z-50 bottom-6 left-1/2 -translate-x-1/2 flex items-center justify-center cursor-pointer select-none transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]";
  let contentClasses = "flex items-center justify-center overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]";
  
  if (!isPill) {
    containerClasses += " translate-y-[150%] opacity-0 pointer-events-none";
    contentClasses += " w-[280px] h-[64px] rounded-[20px] bg-black/85 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex-row justify-between px-4 pb-[env(safe-area-inset-bottom)]";
  } else {
    containerClasses += " translate-y-0 opacity-100 pointer-events-auto";
    contentClasses += " w-[280px] h-[64px] rounded-[20px] bg-black/85 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex-row justify-between px-4 pb-[env(safe-area-inset-bottom)]";
  }

  // Generate random heights for waveform
  const waveformBars = Array.from({ length: 6 }).map((_, i) => (
    <div 
      key={i} 
      className="waveform-bar w-[4px] bg-[#4ade80] rounded-full mx-[2px]"
      style={{
        animationDelay: `${i * 0.15}s`,
        animationDuration: `${0.8 + (i % 3) * 0.2}s`
      }}
    />
  ));

  return (
    <>
      {orbState === 'error' && errorMessage && (
        <div className="fixed z-50 bottom-[100px] left-1/2 -translate-x-1/2 bg-black/90 border border-[#f59e0b] text-[#f59e0b] text-xs px-4 py-2 rounded-[12px] shadow-lg transition-opacity duration-300 pointer-events-none">
          {errorMessage}
        </div>
      )}
      
      <div
        ref={orbRef}
        role="button"
        tabIndex={0}
        aria-label={
          orbState === 'active' ? "End voice chat" : "Voice chat"
        }
        className={`${containerClasses} touch-none outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        style={{ touchAction: 'none' }}
      >
        <div className={contentClasses}>
          {isPill && (
            <>
              {/* Left: Waveform or Check */}
              <div className="flex items-center h-full min-w-[32px]">
                {orbState === 'command' ? (
                  <Check weight="bold" className="w-5 h-5 text-[#4ade80] animate-in fade-in zoom-in" />
                ) : (
                  <div ref={waveformContainerRef} className="flex items-center h-[24px] overflow-hidden">
                    {waveformBars}
                  </div>
                )}
              </div>
              
              {/* Center: Text */}
              <div className="flex-1 flex justify-center items-center overflow-hidden px-2">
                <span 
                  className={`font-mono font-medium text-sm text-white/90 whitespace-nowrap transition-opacity duration-500 ${
                    orbState === 'command' ? 'opacity-100' : showListeningText ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {orbState === 'command' ? commandText : "Listening..."}
                </span>
                {/* Screen reader text always present but visually hidden when opacity is 0 */}
                <span className="sr-only">Voice chat active</span>
              </div>
              
              {/* Right: End Call */}
              <button 
                className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#ef4444] hover:bg-red-600 transition-all z-10 cursor-pointer pointer-events-auto shadow-sm"
                onPointerDown={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  endCall();
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
                aria-label="End Call"
              >
                <PhoneDisconnect weight="fill" className="w-5 h-5 text-white" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Inject custom keyframes for pulse and waveform since we're using tailwind classes */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        @keyframes waveform {
          0%, 100% { height: 8px; }
          50% { height: 24px; }
        }
        .waveform-bar {
          height: 8px;
          transition: height 0.2s ease;
        }
        .is-speaking .waveform-bar {
          animation: waveform 1s ease-in-out infinite;
        }
        
        /* Add a simple fade transition keyframe for routes */
        @keyframes route-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .route-fade {
          animation: route-fade-in 0.3s ease-in-out forwards;
        }
      `}} />
    </>
  );
}

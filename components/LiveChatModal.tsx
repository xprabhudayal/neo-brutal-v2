'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SYSTEM_INSTRUCTION } from './constants';
import { X as XIcon, Mic as MicIcon, Volume2 as Volume2Icon } from 'lucide-react';
import { AsyncQueue } from '../utils/AsyncQueue';
import { LiveWaveform } from './ui/live-waveform';

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
    mimeType: 'audio/pcm;rate=16000',
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

type Transcription = { speaker: 'user' | 'model'; text: string; isFinal: boolean };

export default function LiveChatModal({ onClose }: { onClose: () => void }) {
  const [status, setStatus] = useState('Initializing...');
  const [transcriptions, setTranscriptions] = useState<Transcription[]>([]);

  const sessionRef = useRef<any | null>(null);
  const messageQueueRef = useRef<AsyncQueue<any>>(new AsyncQueue<any>());
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const aiAudioDestinationRef = useRef<MediaStreamAudioDestinationNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const audioSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const isInitializingRef = useRef<boolean>(false);
  const processingTurnRef = useRef<boolean>(false);

  const cleanup = useCallback(() => {
    console.log('🧹 Cleaning up resources...');

    // Stop all audio sources
    audioSourcesRef.current.forEach(source => {
      try {
        source.stop();
      } catch (e) {
        // Already stopped
      }
    });
    audioSourcesRef.current.clear();

    // Clear message queue
    messageQueueRef.current.clear();

    // Disconnect audio processing BEFORE closing session
    if (scriptProcessorRef.current) {
      try {
        scriptProcessorRef.current.disconnect();
      } catch (e) {
        // Already disconnected
      }
      scriptProcessorRef.current = null;
    }

    // Stop media stream BEFORE closing session
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }

    // Close session
    if (sessionRef.current) {
      try {
        sessionRef.current.close();
      } catch (e) {
        console.error('Error closing session:', e);
      }
      sessionRef.current = null;
    }

    // Close audio contexts LAST
    if (inputAudioContextRef.current) {
      try {
        if (inputAudioContextRef.current.state !== 'closed') {
          inputAudioContextRef.current.close();
        }
      } catch (e) {
        // Already closed
      }
      inputAudioContextRef.current = null;
    }

    if (outputAudioContextRef.current) {
      try {
        if (outputAudioContextRef.current.state !== 'closed') {
          outputAudioContextRef.current.close();
        }
      } catch (e) {
        // Already closed
      }
      outputAudioContextRef.current = null;
    }
  }, []);

  // Process a complete turn (wait for turnComplete)
  const processTurn = useCallback(async (): Promise<void> => {
    if (processingTurnRef.current) return;

    processingTurnRef.current = true;
    console.log('🔄 Processing turn...');

    try {
      while (true) {
        const message = await messageQueueRef.current.get();

        // Handle transcriptions
        if (message.serverContent?.inputTranscription) {
          const { text, isFinal } = message.serverContent.inputTranscription;
          console.log(`📝 User: "${text}" (final: ${isFinal})`);

          setTranscriptions(prev => {
            const last = prev[prev.length - 1];
            if (last?.speaker === 'user' && !last.isFinal) {
              const updated = [...prev];
              updated[updated.length - 1] = { speaker: 'user', text, isFinal };
              return updated;
            }
            return [...prev, { speaker: 'user', text, isFinal }];
          });
        }

        if (message.serverContent?.outputTranscription) {
          const { text, isFinal } = message.serverContent.outputTranscription;
          console.log(`🤖 Model: "${text}" (final: ${isFinal})`);

          setTranscriptions(prev => {
            const last = prev[prev.length - 1];
            if (last?.speaker === 'model' && !last.isFinal) {
              const updated = [...prev];
              updated[updated.length - 1] = { speaker: 'model', text, isFinal };
              return updated;
            }
            return [...prev, { speaker: 'model', text, isFinal }];
          });
        }

        // Handle audio
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
            source.connect(audioCtx.destination);

            // Also connect to the visualization stream if available
            if (aiAudioDestinationRef.current) {
              source.connect(aiAudioDestinationRef.current);
            }

            source.start(nextStartTimeRef.current);

            nextStartTimeRef.current += audioBuffer.duration;
            audioSourcesRef.current.add(source);

            source.onended = () => {
              audioSourcesRef.current.delete(source);
            };

            console.log(`🔊 Scheduled audio: ${audioBuffer.duration.toFixed(2)}s at ${nextStartTimeRef.current.toFixed(2)}s`);
          } catch (error) {
            console.error('❌ Audio playback error:', error);
          }
        }

        // Check for turn completion
        if (message.serverContent?.turnComplete) {
          console.log('✅ Turn complete');
          break;
        }
      }
    } catch (error) {
      console.error('❌ Turn processing error:', error);
    } finally {
      processingTurnRef.current = false;
    }
  }, []);

  useEffect(() => {
    // Prevent duplicate initialization
    if (isInitializingRef.current) {
      console.log('⚠️ Already initializing, skipping duplicate');
      return;
    }

    let mounted = true; // Track if component is still mounted

    const initialize = async () => {
      try {
        isInitializingRef.current = true;
        console.log('🚀 Starting live conversation...');

        setStatus('Requesting microphone access...');
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        if (!mounted) {
          console.log('⚠️ Component unmounted before mic access, cleaning up stream');
          stream.getTracks().forEach(track => track.stop());
          return;
        }

        mediaStreamRef.current = stream;
        setMediaStream(stream);

        setStatus('Connecting to AI...');

        // Create audio contexts
        const inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
        const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });

        if (!mounted) {
          console.log('⚠️ Component unmounted before contexts created, cleaning up');
          inputAudioContext.close();
          outputAudioContext.close();
          stream.getTracks().forEach(track => track.stop());
          return;
        }

        inputAudioContextRef.current = inputAudioContext;
        outputAudioContextRef.current = outputAudioContext;

        // Create destination for AI audio visualization
        const aiDestination = outputAudioContext.createMediaStreamDestination();
        aiAudioDestinationRef.current = aiDestination;

        // Dynamically import geminiService to avoid SSR issues
        const { startLiveConversation } = await import('../services/geminiService');

        const session = await startLiveConversation({
          onopen: () => {
            if (!mounted || !inputAudioContextRef.current) {
              console.log('⚠️ Component unmounted, skipping audio setup');
              return;
            }

            console.log('✅ Session opened');
            setStatus('Connected. Start talking!');

            const source = inputAudioContext.createMediaStreamSource(stream);
            const scriptProcessor = inputAudioContext.createScriptProcessor(4096, 1, 1);
            scriptProcessorRef.current = scriptProcessor;

            scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
              const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              if (sessionRef.current && mounted) {
                sessionRef.current.sendRealtimeInput({ media: pcmBlob });
              }
            };

            source.connect(scriptProcessor);
            scriptProcessor.connect(inputAudioContext.destination);
          },
          onmessage: (message: any) => {
            if (!mounted) return;

            // Add message to queue
            messageQueueRef.current.put(message);

            // Start processing turn if not already processing
            if (!processingTurnRef.current) {
              processTurn();
            }
          },
          onerror: (e) => {
            console.error('❌ Connection error:', e);
            setStatus('Connection error.');
            cleanup();
          },
          onclose: () => {
            console.log('🔌 Connection closed');
            setStatus('Connection closed.');
            if (mounted) {
              cleanup();
            }
          },
        }, SYSTEM_INSTRUCTION);

        if (!mounted) {
          console.log('⚠️ Component unmounted, closing session immediately');
          session.close();
          return;
        }

        sessionRef.current = session;
        console.log('✅ Live conversation initialized');

      } catch (err) {
        console.error('❌ Initialization error:', err);
        setStatus('Failed to initialize. Check microphone permissions.');
        isInitializingRef.current = false;
      }
    };

    initialize();

    return () => {
      console.log('🧹 Component unmounting...');
      mounted = false;
      isInitializingRef.current = false;

      // Small delay to allow session to fully initialize before cleanup
      setTimeout(() => {
        cleanup();
      }, 100);
    };
  }, [cleanup, processTurn]);

  // Focus trap
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Auto-focus the close button on open
    const closeBtn = modalRef.current?.querySelector('button');
    if (closeBtn) (closeBtn as HTMLElement).focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-white/10 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="live-chat-title"
    >
      <div
        ref={modalRef}
        className="relative bg-neo-card border-3 border-neo-border rounded-none w-full max-w-lg flex flex-col shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b-3 border-neo-border bg-secondary">
          <div>
            <h2 id="live-chat-title" className="text-xl font-bold uppercase tracking-tight text-neo-text font-mono">
              Voice Interface
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <div className={`w-2 h-2 rounded-full ${status.includes('Connected') ? 'bg-primary animate-pulse' : 'bg-gray-400'}`} />
              <p className="text-xs font-bold uppercase tracking-wider text-neo-text/70">
                {status}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 border-2 border-transparent hover:border-neo-border hover:bg-white transition-all duration-200 group"
            aria-label="Close chat"
          >
            <XIcon className="w-6 h-6 text-neo-text group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Main Visualizer Area */}
        <div className="flex-grow flex flex-col items-center justify-center py-12 min-h-[300px] bg-neo-bg relative overflow-hidden">

          {/* Grid Background */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          />

          {/* Live Waveform Visualizer */}
          <div className="relative z-10 w-full h-64 flex items-center justify-center px-12">
            <LiveWaveform
              active={
                (transcriptions.length > 0 && transcriptions[transcriptions.length - 1].speaker === 'model' && !transcriptions[transcriptions.length - 1].isFinal) ||
                status.includes('talking') ||
                status.includes('Connected')
              }
              processing={status.includes('Connecting')}
              mediaStream={
                (transcriptions.length > 0 && transcriptions[transcriptions.length - 1].speaker === 'model' && !transcriptions[transcriptions.length - 1].isFinal) || status === 'AI Speaking'
                  ? aiAudioDestinationRef.current?.stream || null
                  : mediaStream
              }
              barColor="#39FF14"
              barWidth={4}
              barGap={2}
              height={120}
              className="w-full text-primary"
            />
          </div>
        </div>

        {/* Dynamic Transcription Area */}
        <div className="p-6 bg-white border-t-3 border-neo-border min-h-[140px] flex flex-col justify-center text-center relative">
          {transcriptions.length > 0 ? (
            <div className="space-y-2">
              <p className="font-mono text-xs font-bold text-neo-text/50 uppercase tracking-widest mb-2">
                {transcriptions[transcriptions.length - 1].speaker === 'user' ? 'You said' : 'Assistant says'}
              </p>
              <p className="text-lg font-bold text-neo-text leading-tight md:text-xl transition-all duration-300">
                "{transcriptions[transcriptions.length - 1].text}"
              </p>
            </div>
          ) : (
            <p className="text-neo-text/40 font-mono text-sm">Waiting for conversation to start...</p>
          )}
        </div>
      </div>
    </div>
  );
}

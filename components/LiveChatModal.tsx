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

type WordTiming = {
  word: string;
  startTime: number;
  endTime: number;
};

type Transcription = {
  speaker: 'user' | 'model';
  text: string;
  isFinal: boolean;
  fullText?: string;
  displayedText?: string;
  words?: WordTiming[];
};

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
  const transcriptionTimersRef = useRef<Set<NodeJS.Timeout>>(new Set());

  // Helper to estimate word timings based on audio duration
  const estimateWordTimings = (text: string, audioStartTime: number, audioDuration: number): WordTiming[] => {
    const words = text.split(' ');
    // Simple estimation: distribute time evenly across words
    const timePerWord = audioDuration / Math.max(1, words.length);

    return words.map((word, i) => ({
      word,
      startTime: audioStartTime + (i * timePerWord),
      endTime: audioStartTime + ((i + 1) * timePerWord)
    }));
  };

  const cleanup = useCallback(() => {
    console.log('🧹 Cleaning up resources (Graceful Shutdown)...');

    // Phase 1: Stop New Data Flow (Stop Input)
    if (mediaStreamRef.current) {
      const stream = mediaStreamRef.current;
      mediaStreamRef.current = null;
      stream.getTracks().forEach(track => track.stop());
      console.log('✅ Phase 1: Input stopped');
    }

    // Phase 2: Disconnect Processing Chain
    if (scriptProcessorRef.current) {
      const processor = scriptProcessorRef.current;
      scriptProcessorRef.current = null;
      try {
        processor.disconnect();
        console.log('✅ Phase 2: Processing disconnected');
      } catch (e) {
        console.warn('⚠️ Phase 2 Check:', e);
      }
    }

    // Also disconnect AI audio reference
    if (aiAudioDestinationRef.current) {
      try {
        aiAudioDestinationRef.current.disconnect();
        aiAudioDestinationRef.current = null;
      } catch (e) { }
    }

    // Phase 3: Clear Pending Operations
    audioSourcesRef.current.forEach(source => {
      try {
        source.stop();
        source.disconnect();
      } catch (e) { }
    });
    audioSourcesRef.current.clear();

    transcriptionTimersRef.current.forEach(timer => clearTimeout(timer));
    transcriptionTimersRef.current.clear();

    messageQueueRef.current.clear();
    console.log('✅ Phase 3: Pending operations cleared');

    // Phase 4: Close Communications
    if (sessionRef.current) {
      const session = sessionRef.current;
      sessionRef.current = null;
      try {
        session.close();
      } catch (e) {
        console.error('Error closing session:', e);
      }
      console.log('✅ Phase 4: Session closed');
    }

    // Phase 5: Release Resources (Contexts)
    if (inputAudioContextRef.current) {
      try {
        if (inputAudioContextRef.current.state !== 'closed') {
          inputAudioContextRef.current.close().catch(console.error);
        }
      } catch (e) { }
      inputAudioContextRef.current = null;
    }

    if (outputAudioContextRef.current) {
      try {
        if (outputAudioContextRef.current.state !== 'closed') {
          outputAudioContextRef.current.close().catch(console.error);
        }
      } catch (e) { }
      outputAudioContextRef.current = null;
    }
    console.log('✅ Phase 5: Resources released');
  }, []);

  // Process a complete turn (wait for turnComplete)
  const processTurn = useCallback(async (): Promise<void> => {
    if (processingTurnRef.current) return;

    processingTurnRef.current = true;
    console.log('🔄 Processing turn...');

    try {
      while (true) {
        const message = await messageQueueRef.current.get();

        // 1. Handle Audio FIRST to establish timing
        let audioDuration = 0;
        let currentAudioStartTime = nextStartTimeRef.current;

        const audioData = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
        if (audioData && outputAudioContextRef.current) {
          try {
            const audioCtx = outputAudioContextRef.current;
            const currentTime = audioCtx.currentTime;

            if (nextStartTimeRef.current < currentTime) {
              nextStartTimeRef.current = currentTime + 0.1;
            }

            // Capture accurate start time for this chunk
            currentAudioStartTime = nextStartTimeRef.current;

            const audioBuffer = await decodeAudioData(decode(audioData), audioCtx, 24000, 1);
            audioDuration = audioBuffer.duration;

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

            console.log(`🔊 Scheduled audio: ${audioBuffer.duration.toFixed(2)}s at ${currentAudioStartTime.toFixed(2)}s`);
          } catch (error) {
            console.error('❌ Audio playback error:', error);
          }
        }

        // 2. Handle Model Transcription with Sync
        if (message.serverContent?.outputTranscription) {
          const { text, isFinal } = message.serverContent.outputTranscription;
          const audioCtx = outputAudioContextRef.current;

          if (audioCtx && audioDuration > 0) {
            // We have audio timing, so syncing is possible
            const wordTimings = estimateWordTimings(text, currentAudioStartTime, audioDuration);

            // Initialize transcription with empty displayed text but full data
            setTranscriptions(prev => {
              const last = prev[prev.length - 1];
              // If we're appending to an existing non-final model message
              if (last?.speaker === 'model' && !last.isFinal) {
                const updated = [...prev];
                // Combine with previous words if appending? 
                // Note: typically chunks are separate, but let's just push new entry for simplicity relative to audio chunk
                // Or better: update the last one if it's the same turn.
                // For simplicity in this sync approach, we'll treat each chunk's text as a new segment to sync
                // But typically UI wants one continuous block. 
                // Let's just push a new state update that knows the full text eventually.

                // Correction: The API sends `outputTranscription` for the audio chunk. 
                // We should append to the displayed text only when the timer fires.

                // Let's just track the whole thing as a new entry for now to ensure sync works, 
                // OR better: Append to previous if mostly contiguous.

                // Actually, `estimateWordTimings` relies on the *current* audio chunk duration matching the *current* text chunk.
                // If they come together, they match.

                // We'll append a new transcription entry for each chunk to keep logic simple and robust
                // merging visually is handled by the UI if needed, or we just let it flow.
                return [...prev, {
                  speaker: 'model',
                  text, // Keeps raw text reference
                  fullText: text,
                  displayedText: '', // Start hidden
                  words: wordTimings,
                  isFinal
                }
                ];
              }

              return [...prev, {
                speaker: 'model',
                text,
                fullText: text,
                displayedText: '',
                words: wordTimings,
                isFinal
              }];
            });

            // Schedule word reveals
            wordTimings.forEach((wordTiming) => {
              // Calculate delay relative to NOW
              const delay = (wordTiming.startTime - audioCtx.currentTime) * 1000;

              const timer = setTimeout(() => {
                setTranscriptions(prev => {
                  const updated = [...prev];
                  // Find the last model message (which corresponds to this chunk roughly)
                  // Ideally we'd use IDs, but here we assume FIFO processing matches order
                  const lastIndex = updated.map(t => t.speaker).lastIndexOf('model');

                  if (lastIndex !== -1) {
                    const current = updated[lastIndex];
                    if (current.words) { // Check if it's one of our synced ones
                      // Reveal words that should be shown by now
                      // Actually, we can just append this word to displayedText
                      const currentDisplayed = current.displayedText || '';
                      updated[lastIndex] = {
                        ...current,
                        displayedText: currentDisplayed ? `${currentDisplayed} ${wordTiming.word}` : wordTiming.word
                      };
                    }
                  }
                  return updated;
                });
                // Remove self from set
                transcriptionTimersRef.current.delete(timer);
              }, Math.max(0, delay));

              transcriptionTimersRef.current.add(timer);
            });

          } else {
            // Fallback if no audio context or audio data (e.g. text-only response?)
            // Just show immediately
            setTranscriptions(prev => {
              const last = prev[prev.length - 1];
              if (last?.speaker === 'model' && !last.isFinal) {
                const updated = [...prev];
                updated[updated.length - 1] = { speaker: 'model', text, isFinal, displayedText: text };
                return updated;
              }
              return [...prev, { speaker: 'model', text, isFinal, displayedText: text }];
            });
          }
        }

        // 3. Handle User Transcription (Immediate)
        if (message.serverContent?.inputTranscription) {
          const { text, isFinal } = message.serverContent.inputTranscription;
          console.log(`📝 User: "${text}" (final: ${isFinal})`);

          setTranscriptions(prev => {
            const last = prev[prev.length - 1];
            if (last?.speaker === 'user' && !last.isFinal) {
              const updated = [...prev];
              updated[updated.length - 1] = { speaker: 'user', text, isFinal, displayedText: text }; // User text is immediate
              return updated;
            }
            return [...prev, { speaker: 'user', text, isFinal, displayedText: text }];
          });
        }

        // Check for turn completion
        if (message.serverContent?.turnComplete) {
          console.log('✅ Turn complete');
          break;
        }
      }
    } catch (error: any) {
      if (error?.message === 'Queue cleared') {
        console.log('🏁 Turn processing stopped. (Queue cleared)');
      } else {
        console.error('❌ Turn processing error:', error);
      }
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-5 border-b-3 border-neo-border bg-secondary gap-4 sm:gap-0">
          <div className="w-full sm:w-auto flex flex-row sm:flex-col justify-between items-center sm:items-start">
            <h2 id="live-chat-title" className="text-lg sm:text-xl font-bold uppercase tracking-tight text-neo-text font-mono">
              Voice Interface
            </h2>
            <div className="flex items-center gap-2 mt-0 sm:mt-1">
              <div className={`w-2 h-2 rounded-full ${status.includes('Connected') ? 'bg-primary animate-pulse' : 'bg-gray-400'}`} />
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-neo-text/70 truncate max-w-[150px] sm:max-w-none">
                {status}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {/* End Call Button */}
            <button
              onClick={() => {
                setStatus('Disconnecting...');
                onClose();
              }}
              className="flex-1 sm:flex-none justify-center px-4 py-2 sm:px-3 sm:py-1 bg-red-600 text-white text-xs sm:text-sm font-bold uppercase tracking-wider border-2 border-neo-border shadow-neo-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all flex items-center gap-2"
            >
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              End Call
            </button>
            <button
              onClick={onClose}
              className="p-2 border-2 border-transparent hover:border-neo-border hover:bg-white transition-all duration-200 group"
              aria-label="Close chat"
            >
              <XIcon className="w-6 h-6 text-neo-text group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        {/* Main Visualizer Area - Dark Mode */}
        <div className="flex-grow flex flex-col items-center justify-center py-8 sm:py-12 min-h-[250px] sm:min-h-[300px] bg-black relative overflow-hidden">

          {/* Grid Background - White dots for contrast */}
          <div className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(#333 1px, transparent 1px)',
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

        {/* Dynamic Transcription Area - Dark Mode Compatible */}
        <div className="p-4 sm:p-6 bg-white border-t-3 border-neo-border min-h-[120px] sm:min-h-[140px] flex flex-col justify-center text-center relative">
          {transcriptions.length > 0 ? (
            <div className="space-y-2">
              <p className="font-mono text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 sm:mb-2">
                {transcriptions[transcriptions.length - 1].speaker === 'user' ? 'You said' : 'Assistant says'}
              </p>
              <p className="text-base sm:text-lg md:text-xl font-bold text-black leading-tight transition-all duration-300">
                "{transcriptions[transcriptions.length - 1].displayedText !== undefined ? transcriptions[transcriptions.length - 1].displayedText : transcriptions[transcriptions.length - 1].text}"
              </p>
            </div>
          ) : (
            <p className="text-gray-400 font-mono text-xs sm:text-sm">Waiting for conversation to start...</p>
          )}
        </div>
      </div>
    </div>
  );
}

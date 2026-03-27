import React from 'react';
import { AbsoluteFill, Audio, useCurrentFrame, useVideoConfig, interpolate, staticFile } from 'remotion';
import { COLORS, FONTS, TIMING } from '../brand';

const URL = 'xpdv.vercel.app';

export const TypewriterCTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const totalFrames = TIMING.cta * fps; // 150 frames for 5 seconds
  const typingDuration = totalFrames * 0.7; // 70% of time for typing
  
  // Calculate how many characters to show
  const progress = interpolate(frame, [0, typingDuration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  const charsToShow = Math.floor(progress * URL.length);
  const displayText = URL.slice(0, charsToShow);
  
  // Cursor blink (every 15 frames = 0.5s)
  const cursorVisible = Math.floor(frame / 15) % 2 === 0 || frame < typingDuration;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.ink,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Keyboard typing audio */}
      <Audio
        src={staticFile('assets/iphone-keyboard-typing.mp3')}
        volume={0.6}
        startFrom={0}
      />

      {/* Typewriter Text */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontFamily: FONTS.mono,
            fontWeight: 400,
            fontSize: 64,
            color: COLORS.primary,
            letterSpacing: '0.05em',
          }}
        >
          {displayText}
        </span>
        
        {/* Cursor */}
        <span
          style={{
            fontFamily: FONTS.mono,
            fontSize: 64,
            color: COLORS.primary,
            opacity: cursorVisible ? 1 : 0,
            marginLeft: 2,
          }}
        >
          |
        </span>
      </div>
    </AbsoluteFill>
  );
};

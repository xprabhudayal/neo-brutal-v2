import React from 'react';
import { AbsoluteFill, Audio, useCurrentFrame, useVideoConfig, interpolate, staticFile } from 'remotion';
import { COLORS, FONTS, TIMING } from '../brand';
import { GrainOverlay } from '../components/GrainOverlay';
import { Marquee } from '../components/Marquee';

const URL = 'xpdv.vercel.app';

export const TypewriterCTASceneV2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const totalFrames = TIMING.cta * fps;
  const typingDuration = totalFrames * 0.5; // Fast typing
  
  const progress = interpolate(frame, [0, typingDuration], [0, 1], { extrapolateRight: 'clamp' });
  const charsToShow = Math.floor(progress * URL.length);
  const displayText = URL.slice(0, charsToShow);
  
  // Rapid cursor blink
  const cursorVisible = Math.floor(frame / 5) % 2 === 0;

  // Glitch Effect
  const isGlitch = frame > typingDuration && frame % 10 < 2;
  const showText = isGlitch ? 'XPDV.VERCEL.APP' : displayText;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.primary,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
        {/* Background Terminal Lines */}
        <AbsoluteFill style={{ zIndex: 0, opacity: 0.1, pointerEvents: 'none' }}>
             {new Array(20).fill(0).map((_, i) => (
                 <div key={i} style={{ borderBottom: `2px solid ${COLORS.ink}`, height: 40, width: '100%' }} />
             ))}
        </AbsoluteFill>

        <Marquee text="DEPLOY NOW • DEPLOY NOW • DEPLOY NOW" textStyle={{ fontSize: 40, color: COLORS.ink }} style={{ position: 'absolute', top: 40 }} />
        <Marquee text="DEPLOY NOW • DEPLOY NOW • DEPLOY NOW" textStyle={{ fontSize: 40, color: COLORS.ink }} style={{ position: 'absolute', bottom: 40 }} direction="right" />

      {/* Keyboard typing audio */}
      <Audio
        src={staticFile('assets/iphone-keyboard-typing.mp3')}
        volume={0.6}
        startFrom={0}
      />

      {/* Main Container */}
      <div
        style={{
          border: `4px solid ${COLORS.ink}`,
          padding: '40px 80px',
          backgroundColor: COLORS.ink,
          color: COLORS.primary,
          boxShadow: `10px 10px 0px ${COLORS.bgLight}`,
          zIndex: 10,
          textAlign: 'center'
        }}
      >
        <div style={{ fontFamily: FONTS.mono, fontSize: 24, marginBottom: 20, textAlign: 'left' }}>
            {'>_ INITIALIZING_LAUNCH_SEQUENCE...'}
        </div>
        
        <div
            style={{
                fontFamily: FONTS.display,
                fontWeight: 900,
                fontSize: 80,
                letterSpacing: 0,
                display: 'flex',
                alignItems: 'center',
                gap: 4
            }}
        >
            {showText}
            <div style={{ width: 40, height: 80, backgroundColor: COLORS.primary, opacity: cursorVisible ? 1 : 0 }} />
        </div>

        {/* Progress Bar */}
        <div style={{ marginTop: 20, width: '100%', height: 10, backgroundColor: 'rgba(159, 232, 112, 0.2)' }}>
            <div style={{ width: `${Math.min(100, (frame / totalFrames) * 120)}%`, height: '100%', backgroundColor: COLORS.primary }} />
        </div>
      </div>

      <GrainOverlay />
    </AbsoluteFill>
  );
};

import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { COLORS, FONTS, GRID } from '../brand';

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Spring animation for text entrance
  const textSpring = spring({
    frame,
    fps,
    config: { damping: 100, stiffness: 200 },
  });

  const scale = interpolate(textSpring, [0, 1], [0.8, 1]);
  const opacity = interpolate(textSpring, [0, 1], [0, 1]);
  const translateY = interpolate(textSpring, [0, 1], [50, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.ink,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Grid Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(${COLORS.primary}26 1px, transparent 1px),
            linear-gradient(90deg, ${COLORS.primary}26 1px, transparent 1px)
          `,
          backgroundSize: `${GRID.size}px ${GRID.size}px`,
          opacity: GRID.opacity,
        }}
      />

      {/* Main Text */}
      <h1
        style={{
          fontFamily: FONTS.display,
          fontWeight: 700,
          fontSize: 80,
          color: COLORS.primary,
          textAlign: 'center',
          lineHeight: 1.1,
          padding: '0 60px',
          opacity,
          transform: `scale(${scale}) translateY(${translateY}px)`,
        }}
      >
        STATIC PORTFOLIOS ARE DEAD.
      </h1>
    </AbsoluteFill>
  );
};

import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { COLORS, FONTS, GRID } from '../brand';
import { GrainOverlay } from '../components/GrainOverlay';

export const HookSceneV2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = ['STATIC', 'PORTFOLIOS', 'ARE', 'DEAD'];
  
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.ink, // Dark background
        overflow: 'hidden',
      }}
    >
        {/* Background Animation: Scrolling Diagonal Lines */}
        <div style={{
            position: 'absolute',
            inset: -500,
            backgroundImage: `repeating-linear-gradient(45deg, ${COLORS.primary} 0px, ${COLORS.primary} 2px, transparent 2px, transparent 40px)`,
            opacity: 0.1,
            transform: `translateY(${frame * 2}px)`
        }} />

        {/* Stacked Kinetic Text */}
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', padding: '0 40px' }}>
            {words.map((word, i) => {
                // Staggered spring entrance
                const progress = spring({
                    frame: frame - (i * 5),
                    fps,
                    config: { damping: 12, stiffness: 200 }
                });

                const scale = interpolate(progress, [0, 1], [3, 1]);
                const opacity = interpolate(progress, [0, 1], [0, 1]);
                const y = interpolate(progress, [0, 1], [100, 0]);

                return (
                    <div 
                        key={word}
                        style={{
                            fontFamily: FONTS.display,
                            fontWeight: 900,
                            fontSize: 160, // Massive text
                            lineHeight: 0.85,
                            color: i === 3 ? COLORS.primary : '#FFFFFF', // 'DEAD' is green
                            textAlign: 'center',
                            opacity,
                            transform: `scale(${scale}) translateY(${y}px)`,
                            textShadow: `4px 4px 0px ${COLORS.ink}`,
                            letterSpacing: -6
                        }}
                    >
                        {word}
                    </div>
                );
            })}
        </AbsoluteFill>

        <GrainOverlay />
    </AbsoluteFill>
  );
};

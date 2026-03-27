import React from 'react';
import { AbsoluteFill, OffthreadVideo, useCurrentFrame, useVideoConfig, spring, interpolate, staticFile } from 'remotion';
import { COLORS, FONTS } from '../brand';

export const MiraScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Text overlay animation - appears after 0.5s
  const textSpring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 100 },
  });

  const textOpacity = interpolate(textSpring, [0, 1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const textY = interpolate(textSpring, [0, 1], [30, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000' }}>
      {/* Full-screen Mira video */}
      <OffthreadVideo
        src={staticFile('assets/mira talking portfolio.mov')}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      {/* Text Overlay at Bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 60,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: '16px 40px',
            borderRadius: 4,
          }}
        >
          <h2
            style={{
              fontFamily: FONTS.display,
              fontWeight: 700,
              fontSize: 48,
              color: '#FFFFFF',
              margin: 0,
            }}
          >
            TALK TO MY PORTFOLIO.
          </h2>
        </div>
      </div>
    </AbsoluteFill>
  );
};

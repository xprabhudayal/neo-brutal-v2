import React from 'react';
import { AbsoluteFill, OffthreadVideo, useCurrentFrame, useVideoConfig, spring, interpolate, staticFile } from 'remotion';
import { COLORS, FONTS, BORDER, SHADOW } from '../brand';

export const BentoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Text animation
  const textSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 100, stiffness: 200 },
  });

  const textOpacity = interpolate(textSpring, [0, 1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const textX = interpolate(textSpring, [0, 1], [-40, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bgLight }}>
      {/* Full-screen Bento Grid video */}
      <OffthreadVideo
        src={staticFile('assets/bento-grid.mov')}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      {/* Text Overlay at Top Left */}
      <div
        style={{
          position: 'absolute',
          top: 50,
          left: 50,
          opacity: textOpacity,
          transform: `translateX(${textX}px)`,
        }}
      >
        <div
          style={{
            backgroundColor: COLORS.primary,
            padding: '16px 32px',
            border: `${BORDER.width}px ${BORDER.style} ${BORDER.color}`,
            boxShadow: SHADOW.css,
          }}
        >
          <h2
            style={{
              fontFamily: FONTS.display,
              fontWeight: 700,
              fontSize: 42,
              color: COLORS.ink,
              margin: 0,
            }}
          >
            THE CRAFT.
          </h2>
        </div>
      </div>
    </AbsoluteFill>
  );
};

import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONTS } from '../brand';

interface MarqueeProps {
  text: string;
  duration?: number; // duration for one full loop in frames
  direction?: 'left' | 'right';
  style?: React.CSSProperties;
  textStyle?: React.CSSProperties;
}

export const Marquee: React.FC<MarqueeProps> = ({
  text,
  duration = 150,
  direction = 'left',
  style,
  textStyle,
}) => {
  const frame = useCurrentFrame();
  
  // Create a long string by repeating
  const repeatedText = `${text} • ${text} • ${text} • ${text} • `;
  
  // Calculate offset
  const progress = (frame % duration) / duration;
  const offset = direction === 'left' ? -100 * progress : -100 * (1 - progress);

  return (
    <div
      style={{
        display: 'flex',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        width: '100%',
        ...style,
      }}
    >
      <div
        style={{
          transform: `translateX(${offset}%)`,
          display: 'flex',
          gap: '1rem',
        }}
      >
        {/* Render multiple times to ensure coverage during scroll */}
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            style={{
                fontFamily: FONTS.display,
                fontWeight: 700,
                textTransform: 'uppercase',
                ...textStyle,
            }}
          >
            {repeatedText}
          </span>
        ))}
      </div>
    </div>
  );
};

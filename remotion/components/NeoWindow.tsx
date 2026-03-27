import React, { ReactNode } from 'react';
import { COLORS, BORDER, SHADOW } from '../brand';

interface NeoWindowProps {
  children: ReactNode;
  title?: string;
  style?: React.CSSProperties;
}

export const NeoWindow: React.FC<NeoWindowProps> = ({ children, title = 'WINDOW_01', style }) => {
  return (
    <div
      style={{
        border: `${BORDER.width}px solid ${COLORS.ink}`,
        boxShadow: SHADOW.css,
        backgroundColor: COLORS.bgLight,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden', // Clip content including video
        ...style,
    }}
    >
      {/* Window Header */}
      <div
        style={{
          borderBottom: `${BORDER.width}px solid ${COLORS.ink}`,
          padding: '8px 16px',
          backgroundColor: COLORS.secondary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ fontFamily: 'Space Mono', fontWeight: 700, fontSize: 14 }}>{title}</span>
        <div style={{ display: 'flex', gap: 6 }}>
           {/* Window Buttons */}
           <div style={{ width: 10, height: 10, borderRadius: '50%', border: `2px solid ${COLORS.ink}`, backgroundColor: COLORS.ink }} />
           <div style={{ width: 10, height: 10, borderRadius: '50%', border: `2px solid ${COLORS.ink}` }} />
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, position: 'relative' }}>
        {children}
      </div>
    </div>
  );
};

import React from 'react';
import { AbsoluteFill, OffthreadVideo, useCurrentFrame, useVideoConfig, spring, interpolate, staticFile } from 'remotion';
import { COLORS, FONTS, BORDER } from '../brand';
import { NeoWindow } from '../components/NeoWindow';
import { GrainOverlay } from '../components/GrainOverlay';

export const BentoSceneV2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slide in effect
  const slideProgress = spring({ frame, fps, config: { damping: 15 } });
  const slideX = interpolate(slideProgress, [0, 1], [-100, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.secondary }}>
        
        {/* Split Screen Layout */}
        <div style={{ display: 'flex', width: '100%', height: '100%' }}>
            
            {/* Left Side: Text */}
            <div style={{ flex: 1, backgroundColor: COLORS.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: `${BORDER.width}px solid ${COLORS.ink}`, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 20, left: 20, fontFamily: FONTS.mono, fontSize: 20 }}>03</div>
                <h2 style={{ 
                    fontFamily: FONTS.display, 
                    fontWeight: 900, 
                    fontSize: 140, 
                    lineHeight: 0.8,
                    color: COLORS.ink,
                    transform: 'rotate(-90deg)',
                    whiteSpace: 'nowrap'
                }}>
                    THE CRAFT
                </h2>
            </div>
            
            {/* Right Side: Bento Video */}
            <div style={{ flex: 2, padding: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <NeoWindow title="BENTO_GRID_SYSTEM" style={{ width: '100%', height: '100%', transform: `translateX(${slideX}%)` }}>
                     <OffthreadVideo
                        src={staticFile('assets/bento-grid.mov')}
                        style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: 'white' }}
                     />
                </NeoWindow>
            </div>
        </div>

        {/* Floating Cursor Element */}
         <div style={{ 
            position: 'absolute', 
            top: '60%', 
            left: '40%', 
            transform: `translate(${Math.sin(frame * 0.1) * 50}px, ${Math.cos(frame * 0.1) * 30}px)` 
         }}>
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke={COLORS.ink} strokeWidth="2">
                <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" fill={COLORS.primary} />
            </svg>
         </div>

        <GrainOverlay />
    </AbsoluteFill>
  );
};

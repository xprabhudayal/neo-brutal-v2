import React from 'react';
import { AbsoluteFill, OffthreadVideo, useCurrentFrame, useVideoConfig, spring, interpolate, staticFile } from 'remotion';
import { COLORS, FONTS } from '../brand';
import { Marquee } from '../components/Marquee';
import { NeoWindow } from '../components/NeoWindow';
import { GrainOverlay } from '../components/GrainOverlay';

export const MiraSceneV2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Window pop-in animation
  const windowSpring = spring({ frame, fps, config: { damping: 14, stiffness: 180 } });
  const scale = interpolate(windowSpring, [0, 1], [0.5, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bgLight }}>
      
      {/* Background Marquees */}
      <AbsoluteFill style={{ opacity: 0.1, flexDirection: 'column', justifyContent: 'space-between', padding: '20px 0' }}>
         <Marquee text="INTERACTIVE • DYNAMIC • ALIVE" textStyle={{ color: COLORS.ink, fontSize: 120 }} duration={200} />
         <Marquee text="INTERACTIVE • DYNAMIC • ALIVE" textStyle={{ color: COLORS.ink, fontSize: 120 }} duration={200} direction="right" />
         <Marquee text="INTERACTIVE • DYNAMIC • ALIVE" textStyle={{ color: COLORS.ink, fontSize: 120 }} duration={200} />
      </AbsoluteFill>

      {/* Main Content */}
      <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <NeoWindow 
            title="MIRA_AI_AGENT.exe" 
            style={{ 
                width: 900, 
                height: 700, 
                backgroundColor: '#000',
                transform: `scale(${scale})`
            }}
          >
             <OffthreadVideo
                src={staticFile('assets/mira talking portfolio.mov')}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
             />
          </NeoWindow>
      </AbsoluteFill>
      
      {/* Foreground Overlay Tape */}
      <div style={{ position: 'absolute', bottom: 100, width: '100%', transform: 'rotate(-2deg) scale(1.1)' }}>
        <div style={{ backgroundColor: COLORS.primary, borderTop: `4px solid ${COLORS.ink}`, borderBottom: `4px solid ${COLORS.ink}`, padding: '10px 0' }}>
            <Marquee text="TALK TO MY PORTFOLIO" textStyle={{ color: COLORS.ink, fontSize: 60, fontFamily: FONTS.display, fontWeight: 900 }} duration={120} />
        </div>
      </div>

      <GrainOverlay />
    </AbsoluteFill>
  );
};

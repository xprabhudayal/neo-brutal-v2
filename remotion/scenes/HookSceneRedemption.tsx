import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONTS } from '../brand';
import { GrainOverlay } from '../components/GrainOverlay';

export const HookSceneRedemption: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // 4 words in 2 seconds (60 frames). 
    // 15 frames per beat? No, faster. 
    // STATIC (0) -> PORTFOLIOS (10) -> ARE (20) -> DEAD (30) -> HOLD (30-60)
    
    // Each word slams in and stays
    const words = [
        { text: 'STATIC', start: 0, color: '#FFF' },
        { text: 'PORTFOLIOS', start: 8, color: '#FFF' },
        { text: 'ARE', start: 16, color: '#FFF' },
        { text: 'DEAD', start: 24, color: COLORS.primary },
    ];

    return (
        <AbsoluteFill style={{ backgroundColor: COLORS.ink }}>
            {/* Background strobe on beats */}
            <AbsoluteFill style={{ 
                backgroundColor: frame % 8 < 2 ? COLORS.primary : 'transparent', 
                opacity: 0.2 
            }} />

            <AbsoluteFill style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center',
                gap: 0
            }}>
                {words.map((item, i) => {
                    if (frame < item.start) return null;
                    
                    // Slam effect: Scale 2 -> 1 in 3 frames
                    const sinceStart = frame - item.start;
                    const scale = sinceStart < 3 ? 1.5 - (sinceStart * 0.15) : 1;
                    
                    return (
                        <div key={item.text} style={{
                            fontFamily: FONTS.display,
                            fontWeight: 900,
                            fontSize: 160,
                            lineHeight: 0.85,
                            color: item.color,
                            transform: `scale(${scale})`,
                            letterSpacing: -5,
                            textShadow: '4px 4px 0px rgba(0,0,0,0.5)'
                        }}>
                            {item.text}
                        </div>
                    );
                })}
            </AbsoluteFill>
            <GrainOverlay />
        </AbsoluteFill>
    );
};

import React from 'react';
import { AbsoluteFill, OffthreadVideo, useCurrentFrame, useVideoConfig, interpolate, staticFile } from 'remotion';
import { COLORS, FONTS } from '../brand';
import { GrainOverlay } from '../components/GrainOverlay';

export const BentoSceneRedemption: React.FC = () => {
    const frame = useCurrentFrame();
    const { durationInFrames } = useVideoConfig();

    // Pan effect (Start centered, drift to show detail)
    const scale = 1.2;
    const translateY = interpolate(frame, [0, durationInFrames], [0, -100]);

    return (
        <AbsoluteFill style={{ backgroundColor: '#fff' }}>
             <AbsoluteFill style={{ transform: `scale(${scale}) translateY(${translateY}px)` }}>
                <OffthreadVideo
                    src={staticFile('assets/bento-grid.mov')}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover', // Force cover to fill screen
                    }}
                />
            </AbsoluteFill>

            {/* Giant Background Text LAYERED BEHIND visual using simple CSS mix-blend logic if possible, 
                or just overlay with mix-blend-mode: difference to look technical */}
            <AbsoluteFill style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                pointerEvents: 'none',
                mixBlendMode: 'difference' 
            }}>
                <h1 style={{
                    fontFamily: FONTS.display,
                    fontSize: 200,
                    fontWeight: 900,
                    color: '#FFF',
                    opacity: 0.1
                }}>
                    CRAFT
                </h1>
            </AbsoluteFill>

            <GrainOverlay />
        </AbsoluteFill>
    );
};

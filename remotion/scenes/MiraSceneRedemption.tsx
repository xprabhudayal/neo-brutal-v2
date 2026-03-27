import React from 'react';
import { AbsoluteFill, OffthreadVideo, useCurrentFrame, useVideoConfig, interpolate, staticFile } from 'remotion';
import { COLORS, FONTS } from '../brand';
import { GrainOverlay } from '../components/GrainOverlay';

export const MiraSceneRedemption: React.FC = () => {
    const frame = useCurrentFrame();
    const { durationInFrames } = useVideoConfig();

    // Continuous Zoom In
    // Scale from 1 to 1.5 over the duration
    const scale = interpolate(frame, [0, durationInFrames], [1, 1.3], {
        extrapolateRight: 'clamp',
    });

    return (
        <AbsoluteFill style={{ backgroundColor: '#000' }}>
            <AbsoluteFill style={{ transform: `scale(${scale})` }}>
                <OffthreadVideo
                    src={staticFile('assets/mira talking portfolio.mov')}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
            </AbsoluteFill>
            
            {/* Minimal Overlay - "ALIVE" text glitching briefly */}
             <div style={{
                position: 'absolute',
                bottom: 40,
                left: 40,
                color: COLORS.primary,
                fontFamily: FONTS.mono,
                fontSize: 24,
                opacity: frame % 20 < 10 ? 1 : 0.5
            }}>
                ● LIVE_FEED
            </div>

            <GrainOverlay />
        </AbsoluteFill>
    );
};

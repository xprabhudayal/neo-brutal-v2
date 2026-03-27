import React from 'react';
import { AbsoluteFill, Audio, useCurrentFrame, useVideoConfig, interpolate, staticFile } from 'remotion';
import { COLORS, FONTS, TIMING } from '../brand';
import { GrainOverlay } from '../components/GrainOverlay';

const URL = 'stitch.design';

export const CTASceneRedemption: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    
    // Very fast type - 10 frames total
    const progress = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
    const charsToShow = Math.floor(progress * URL.length);
    const text = URL.slice(0, charsToShow);

    return (
        <AbsoluteFill style={{ 
            backgroundColor: COLORS.primary, // Green Background
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Audio src={staticFile('assets/iphone-keyboard-typing.mp3')} />
            
            <h1 style={{
                fontFamily: FONTS.mono,
                fontSize: 100,
                fontWeight: 700,
                color: '#000', // Black Text
                letterSpacing: -2
            }}>
                {text}
                <span style={{ opacity: frame % 10 < 5 ? 1 : 0 }}>_</span>
            </h1>
            
            <GrainOverlay />
        </AbsoluteFill>
    );
};

import React from 'react';
import { AbsoluteFill } from 'remotion';

export const GrainOverlay: React.FC = () => {
    return (
        <AbsoluteFill style={{ pointerEvents: 'none', zIndex: 999, mixBlendMode: 'overlay', opacity: 0.15 }}>
            <svg
                width="100%"
                height="100%"
            >
                <filter id="grain">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.80"
                        numOctaves="4"
                        stitchTiles="stitch"
                    />
                </filter>
                <rect width="100%" height="100%" filter="url(#grain)" />
            </svg>
        </AbsoluteFill>
    );
};

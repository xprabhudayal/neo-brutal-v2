import React from 'react';
import { Series } from 'remotion';
import { HookSceneV2 } from './scenes/HookSceneV2';
import { MiraSceneV2 } from './scenes/MiraSceneV2';
import { BentoSceneV2 } from './scenes/BentoSceneV2';
import { TypewriterCTASceneV2 } from './scenes/TypewriterCTASceneV2';
import { TIMING, VIDEO_CONFIG } from './brand';

const { fps } = VIDEO_CONFIG;

export const PortfolioShowcase: React.FC = () => {
  return (
    <Series>
      {/* Scene 1: Hook V2 - High Energy Stacks */}
      <Series.Sequence durationInFrames={TIMING.hook * fps}>
        <HookSceneV2 />
      </Series.Sequence>

      {/* Scene 2: Mira V2 - Window + Tape */}
      <Series.Sequence durationInFrames={TIMING.mira * fps}>
        <MiraSceneV2 />
      </Series.Sequence>

      {/* Scene 3: Bento V2 - Split Screen */}
      <Series.Sequence durationInFrames={TIMING.bento * fps}>
        <BentoSceneV2 />
      </Series.Sequence>

      {/* Scene 4: Typewriter CTA V2 - Terminal Glitch */}
      <Series.Sequence durationInFrames={TIMING.cta * fps}>
        <TypewriterCTASceneV2 />
      </Series.Sequence>
    </Series>
  );
};

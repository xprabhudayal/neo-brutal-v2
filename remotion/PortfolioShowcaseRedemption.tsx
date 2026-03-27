import React from 'react';
import { Series } from 'remotion';
import { HookSceneRedemption } from './scenes/HookSceneRedemption';
import { MiraSceneRedemption } from './scenes/MiraSceneRedemption';
import { BentoSceneRedemption } from './scenes/BentoSceneRedemption';
import { CTASceneRedemption } from './scenes/CTASceneRedemption';
import { TIMING, VIDEO_CONFIG } from './brand';

const { fps } = VIDEO_CONFIG;

export const PortfolioShowcaseRedemption: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={TIMING.hook * fps}>
        <HookSceneRedemption />
      </Series.Sequence>

      <Series.Sequence durationInFrames={TIMING.mira * fps}>
        <MiraSceneRedemption />
      </Series.Sequence>

      <Series.Sequence durationInFrames={TIMING.bento * fps}>
        <BentoSceneRedemption />
      </Series.Sequence>

      <Series.Sequence durationInFrames={TIMING.cta * fps}>
        <CTASceneRedemption />
      </Series.Sequence>
    </Series>
  );
};

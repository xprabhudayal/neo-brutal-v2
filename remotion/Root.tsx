import React from 'react';
import { Composition } from 'remotion';
import { PortfolioShowcase } from './PortfolioShowcase';
import { PortfolioShowcaseRedemption } from './PortfolioShowcaseRedemption';
import { VIDEO_CONFIG } from './brand';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="PortfolioShowcase"
        component={PortfolioShowcase}
        durationInFrames={900}
        fps={30}
        width={1200}
        height={960}
      />
      <Composition
        id="RedemptionCut"
        component={PortfolioShowcaseRedemption}
        durationInFrames={VIDEO_CONFIG.durationInFrames}
        fps={VIDEO_CONFIG.fps}
        width={VIDEO_CONFIG.width}
        height={VIDEO_CONFIG.height}
      />
    </>
  );
};

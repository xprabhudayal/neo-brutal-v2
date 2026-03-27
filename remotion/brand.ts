// Brand tokens for NeoBrutal Portfolio Showcase

export const COLORS = {
  primary: '#9FE870',     // Lime green - accents, highlights, CTA
  ink: '#163300',         // Forest green - text, borders, shadows
  bgLight: '#FFFFFF',     // Light mode background
  bgDark: '#163300',      // Dark mode background
  secondary: '#D4F0C4',   // Subtle highlights
  accent: '#A0E1E1',      // Optional accent blue
} as const;

export const FONTS = {
  display: 'Space Grotesk',
  mono: 'Space Mono',
} as const;

export const BORDER = {
  width: 3,
  style: 'solid' as const,
  color: COLORS.ink,
};

export const SHADOW = {
  offsetX: 5,
  offsetY: 5,
  blur: 0,
  color: COLORS.ink,
  css: `5px 5px 0px 0px ${COLORS.ink}`,
};

export const GRID = {
  size: 40,
  opacity: 0.15,
  color: COLORS.primary,
};

// Scene durations in seconds (total 12s - Redemption Cut)
export const TIMING = {
  hook: 2,      // 0-2s (SLAM)
  mira: 4,      // 2-6s (ZOOM)
  bento: 4,    // 6-10s (PAN)
  cta: 2,       // 10-12s (FAST)
} as const;

// Video config
export const VIDEO_CONFIG = {
  fps: 30,
  width: 1200,
  height: 960,  // 5:4 aspect ratio
  durationInFrames: 12 * 30, // 12 seconds
} as const;

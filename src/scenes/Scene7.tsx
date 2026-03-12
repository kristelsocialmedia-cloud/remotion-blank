// ================================================================
// SCENE 7 — Brand End Card  (60 frames / 2.0 s)
// VO: "That's Akave."
//
// TIMING:
//   0–28  "Akave" wordmark scales and fades in
//  28–60  Hold
// ================================================================

import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, COPY } from "../config";
import { fontFamily } from "../font";

export const Scene7 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const wordmarkIn = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 28 });
  const taglineIn = spring({ frame: frame - 20, fps, config: { damping: 200 }, durationInFrames: 20 });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        fontFamily,
      }}
    >
      {/* Wordmark */}
      <div
        style={{
          fontFamily,
          fontSize: 96,
          fontWeight: 300,
          color: COLORS.white,
          letterSpacing: "0.12em",
          opacity: interpolate(wordmarkIn, [0, 1], [0, 1]),
          transform: `scale(${interpolate(wordmarkIn, [0, 1], [0.88, 1])})`,
          lineHeight: 1,
        }}
      >
        {COPY.scene7.brand}
      </div>

      {/* Tagline */}
      <div
        style={{
          fontFamily,
          fontSize: 18,
          fontWeight: 400,
          color: COLORS.whiteDim,
          letterSpacing: "0.08em",
          opacity: interpolate(taglineIn, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(taglineIn, [0, 1], [10, 0])}px)`,
        }}
      >
        {COPY.scene7.tagline}
      </div>

      {/* Thin accent rule under wordmark */}
      <div
        style={{
          position: "absolute",
          bottom: 240,
          width: 240,
          height: 1,
          background: COLORS.highlight,
          opacity: interpolate(taglineIn, [0, 1], [0, 0.3]),
        }}
      />
    </AbsoluteFill>
  );
};

// ================================================================
// SCENE 7 — Brand End Card  (90 frames / 3.0 s)
// VO: "That's Akave."
//
// Uses the real Akave Cloud logo (white version, transparent bg).
// Logo file: public/akave-logo-white.png
//
// TIMING:
//   0–28  Logo scales and fades in
//  20–42  Tagline fades up
//  42–90  Hold (tagline clear for 48 frames = 1.6 s)
// ================================================================

import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, COPY } from "../config";
import { fontFamily } from "../font";

// Logo display width in pixels — adjust to taste
const LOGO_WIDTH = 300;

export const Scene7 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoIn = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 28 });
  const taglineIn = spring({ frame: frame - 20, fps, config: { damping: 200 }, durationInFrames: 22 });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 28,
        fontFamily,
      }}
    >
      {/* Akave Cloud logo — white version on dark background */}
      <Img
        src={staticFile("akave-logo-white.png")}
        style={{
          width: LOGO_WIDTH,
          // height auto-scales with aspect ratio
          opacity: interpolate(logoIn, [0, 1], [0, 1]),
          transform: `scale(${interpolate(logoIn, [0, 1], [0.88, 1])})`,
        }}
      />

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
          textAlign: "center",
        }}
      >
        {COPY.scene7.tagline}
      </div>

      {/* Thin accent rule — appears with tagline */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          width: 48,
          height: 1,
          background: COLORS.highlight,
          opacity: interpolate(taglineIn, [0, 1], [0, 0.35]),
        }}
      />
    </AbsoluteFill>
  );
};

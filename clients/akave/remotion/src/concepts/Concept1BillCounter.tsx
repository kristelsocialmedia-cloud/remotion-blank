// ================================================================
// CONCEPT 01 — The Bill Counter  (240 frames / 8 s)
//
// "Sovereign Storage, Predictable Pricing"
//  → escalating dollar counter (small → catastrophic)
//  → hard stop + brief black
//  → "$14.99 / TB" springs in and locks
//  → "Akave Cloud" fades in below
//
// TIMING:
//   0–52    Opening headline (rises in, holds, fades out)
//   45–156  Bill counter visible (cross-fades with headline at 45–52)
//   156–162 Brief black — no elements visible (6-frame pause)
//   162–215 "$14.99 / TB" + sub-label spring in
//   212–240 "Akave Cloud" brand fades in, hold
//
// To edit copy → src/config.ts → COPY.concept1 / COPY.scene7.brand
// ================================================================

import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, COPY } from "../config";
import { fontFamily } from "../font";

// Counter bounds — the "escalating cloud bill" range
const COUNTER_START = 247;
const COUNTER_END = 12_847;

export const Concept1BillCounter = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ---- Opening headline (0–52) ----
  const headlineSpring = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 22 });
  const headlineFadeOut = interpolate(frame, [40, 52], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headlineOpacity = interpolate(headlineSpring, [0, 1], [0, 1]) * headlineFadeOut;
  const headlineY = interpolate(headlineSpring, [0, 1], [20, 0]);

  // ---- Bill counter (45–156) ----
  const counterFadeIn = interpolate(frame, [45, 57], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const counterFadeOut = interpolate(frame, [148, 156], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const counterOpacity = counterFadeIn * counterFadeOut;

  // Exponential acceleration — starts slow, then rockets
  const counterProgress = interpolate(frame, [47, 148], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });
  const billAmount = interpolate(counterProgress, [0, 1], [COUNTER_START, COUNTER_END]);

  // Rapidly cycling cents gives the "live meter" feeling
  const centsCycle = Math.floor((frame * 13) % 100);
  const displayBill = `$${Math.floor(billAmount).toLocaleString("en-US")}.${String(centsCycle).padStart(2, "0")}`;

  // ---- Price reveal (162–215) ----
  const priceIn = spring({ frame: frame - 162, fps, config: { damping: 200 }, durationInFrames: 28 });
  const priceOpacity = interpolate(priceIn, [0, 1], [0, 1]);
  const priceY = interpolate(priceIn, [0, 1], [18, 0]);

  // Sub-label — slightly after price
  const subIn = spring({ frame: frame - 178, fps, config: { damping: 200 }, durationInFrames: 20 });
  const subOpacity = interpolate(subIn, [0, 1], [0, 1]);
  const subY = interpolate(subIn, [0, 1], [10, 0]);

  // ---- Brand (212–240) ----
  const brandIn = spring({ frame: frame - 212, fps, config: { damping: 200 }, durationInFrames: 20 });
  const brandOpacity = interpolate(brandIn, [0, 1], [0, 1]);
  const brandY = interpolate(brandIn, [0, 1], [10, 0]);

  return (
    <AbsoluteFill style={{ background: COLORS.bg, fontFamily }}>

      {/* Opening headline */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: headlineOpacity,
          transform: `translateY(${headlineY}px)`,
        }}
      >
        <div
          style={{
            fontFamily,
            fontSize: 64,
            fontWeight: 300,
            color: COLORS.white,
            textAlign: "center",
            lineHeight: 1.3,
            letterSpacing: "-0.025em",
          }}
        >
          {COPY.concept1.headline.split("\n").map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
      </AbsoluteFill>

      {/* Bill counter — red, large, center */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: counterOpacity,
        }}
      >
        <div
          style={{
            fontFamily,
            fontSize: 112,
            fontWeight: 300,
            color: COLORS.pain,
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          {displayBill}
        </div>
      </AbsoluteFill>

      {/* Price + sub-label — centered together */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
        }}
      >
        <div
          style={{
            fontFamily,
            fontSize: 100,
            fontWeight: 300,
            color: COLORS.white,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            opacity: priceOpacity,
            transform: `translateY(${priceY}px)`,
          }}
        >
          $14.99&thinsp;/&thinsp;TB
        </div>
        <div
          style={{
            fontFamily,
            fontSize: 18,
            fontWeight: 400,
            color: COLORS.whiteDim,
            letterSpacing: "0.05em",
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
          }}
        >
          {COPY.concept1.priceSub}
        </div>
      </AbsoluteFill>

      {/* Brand end card — bottom of frame */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingBottom: 72,
          opacity: brandOpacity,
          transform: `translateY(${brandY}px)`,
        }}
      >
        <div
          style={{
            fontFamily,
            fontSize: 20,
            fontWeight: 400,
            color: COLORS.whiteDim,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          {COPY.scene7.brand}
        </div>
      </AbsoluteFill>

    </AbsoluteFill>
  );
};

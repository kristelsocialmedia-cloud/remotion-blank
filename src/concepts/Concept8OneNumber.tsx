// ================================================================
// CONCEPT 08 — One Number  (180 frames / 6 s)
//
// The entire video is one price assembling itself on screen.
// Each piece of "$14.99 / TB" materialises separately, staggered,
// then the sub-label and brand appear beneath.
//
// TIMING:
//   15     "$"   springs in
//   25     "14"  springs in
//   34     "."   springs in
//   42     "99"  springs in
//   58     "/ TB" springs in
//   ~78    Full price assembled — subtle lock pulse
//   90     Sub-label fades up
//   135    "Akave Cloud" fades up
//   180    End
//
// To edit copy → src/config.ts → COPY.concept8 / COPY.scene7.brand
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

export const Concept8OneNumber = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Helper — spring entrance for each price part
  const mkSpring = (startFrame: number) =>
    spring({
      frame: frame - startFrame,
      fps,
      config: { damping: 16, stiffness: 200 },
      durationInFrames: 20,
    });

  const dollarIn  = mkSpring(15);
  const wholeIn   = mkSpring(25);
  const dotIn     = mkSpring(34);
  const centsIn   = mkSpring(42);
  const unitIn    = mkSpring(58);

  // Shared entrance animation: lift up + scale from 0.80 → 1
  const mkPartStyle = (progress: number): React.CSSProperties => ({
    opacity: interpolate(progress, [0, 1], [0, 1]),
    transform: `translateY(${interpolate(progress, [0, 1], [16, 0])}px) scale(${interpolate(progress, [0, 1], [0.8, 1])})`,
    display: "inline-block",
  });

  // Subtle scale-pulse when the last part (/ TB) finishes assembling
  const lockPulse = spring({
    frame: frame - 70,
    fps,
    config: { damping: 14, stiffness: 140 },
    durationInFrames: 24,
  });
  // Scale briefly to 1.018 then back to 1 — almost imperceptible, just "settles"
  const lockScale = 1 + interpolate(lockPulse, [0, 0.5, 1], [0, 0.018, 0]);

  // Sub-label
  const subIn = spring({ frame: frame - 90, fps, config: { damping: 200 }, durationInFrames: 20 });
  const subOpacity = interpolate(subIn, [0, 1], [0, 1]);
  const subY = interpolate(subIn, [0, 1], [10, 0]);

  // Brand
  const brandIn = spring({ frame: frame - 135, fps, config: { damping: 200 }, durationInFrames: 20 });
  const brandOpacity = interpolate(brandIn, [0, 1], [0, 1]);
  const brandY = interpolate(brandIn, [0, 1], [10, 0]);

  return (
    <AbsoluteFill style={{ background: COLORS.bg, fontFamily }}>

      {/* Price assembly + sub-label — vertically centered together */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 36,
        }}
      >
        {/* Price row — baseline-aligned parts */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 1,
            transform: `scale(${lockScale})`,
          }}
        >
          {/* $ */}
          <span
            style={{
              ...mkPartStyle(dollarIn),
              fontFamily,
              fontSize: 68,
              fontWeight: 300,
              color: COLORS.white,
              letterSpacing: "-0.02em",
            }}
          >
            {COPY.concept8.priceDollar}
          </span>

          {/* 14 */}
          <span
            style={{
              ...mkPartStyle(wholeIn),
              fontFamily,
              fontSize: 108,
              fontWeight: 300,
              color: COLORS.white,
              letterSpacing: "-0.04em",
            }}
          >
            {COPY.concept8.priceWhole}
          </span>

          {/* . */}
          <span
            style={{
              ...mkPartStyle(dotIn),
              fontFamily,
              fontSize: 108,
              fontWeight: 300,
              color: COLORS.white,
              letterSpacing: 0,
            }}
          >
            {COPY.concept8.priceDot}
          </span>

          {/* 99 */}
          <span
            style={{
              ...mkPartStyle(centsIn),
              fontFamily,
              fontSize: 108,
              fontWeight: 300,
              color: COLORS.white,
              letterSpacing: "-0.04em",
            }}
          >
            {COPY.concept8.priceCents}
          </span>

          {/* / TB — smaller, dimmed, offset left */}
          <span
            style={{
              ...mkPartStyle(unitIn),
              fontFamily,
              fontSize: 44,
              fontWeight: 400,
              color: COLORS.whiteDim,
              letterSpacing: "0.04em",
              marginLeft: 14,
            }}
          >
            {COPY.concept8.priceUnit}
          </span>
        </div>

        {/* Sub-label */}
        <div
          style={{
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
            fontFamily,
            fontSize: 18,
            fontWeight: 400,
            color: COLORS.whiteDim,
            letterSpacing: "0.04em",
            textAlign: "center",
          }}
        >
          {COPY.concept8.sub}
        </div>
      </AbsoluteFill>

      {/* Brand — pinned to bottom */}
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

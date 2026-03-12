// ================================================================
// SCENE 3 — Model Shift  (75 frames / 2.5 s)
// VO: "Akave changes the model."
//
// TIMING:
//   0–30   Three pain symbols converge toward center and shrink
//   25–55  Akave tile scales up from the center
//   48–75  Headline fades in below the tile
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
import { AkaveTile } from "../primitives/AkaveTile";
import { FeeToken } from "../primitives/FeeToken";
import { LedgerLine } from "../primitives/LedgerLine";
import { SceneContainer } from "../primitives/SceneContainer";
import { fontFamily } from "../font";

export const Scene3 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ---- Pain symbols collapsing ----
  const collapseP = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });
  const symbolOpacity = interpolate(frame, [0, 8, 28, 40], [0, 0.65, 0.65, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Each symbol moves toward center as it shrinks
  const invoiceX = interpolate(collapseP, [0, 1], [-210, 0]);
  const invoiceY = interpolate(collapseP, [0, 1], [-70, 0]);
  const invoiceScale = interpolate(collapseP, [0, 1], [0.75, 0.15]);

  const ledgerY = interpolate(collapseP, [0, 1], [90, 0]);
  const ledgerScale = interpolate(collapseP, [0, 1], [0.75, 0.15]);

  const feeX = interpolate(collapseP, [0, 1], [210, 0]);
  const feeY = interpolate(collapseP, [0, 1], [-70, 0]);
  const feeScale = interpolate(collapseP, [0, 1], [0.75, 0.15]);

  // ---- Akave tile entrance ----
  const tileIn = spring({ frame: frame - 25, fps, config: { damping: 200 }, durationInFrames: 28 });
  const tileScale = interpolate(tileIn, [0, 1], [0.5, 1]);
  const tileOpacity = interpolate(tileIn, [0, 1], [0, 1]);

  // ---- Headline entrance ----
  const headlineIn = spring({ frame: frame - 48, fps, config: { damping: 200 }, durationInFrames: 22 });
  const headlineOpacity = interpolate(headlineIn, [0, 1], [0, 1]);
  const headlineY = interpolate(headlineIn, [0, 1], [18, 0]);

  return (
    <SceneContainer>
      {/* Center stage — pain symbols converge here */}
      <AbsoluteFill
        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {/* Invoice stand-in */}
        <div
          style={{
            position: "absolute",
            opacity: symbolOpacity,
            transform: `translate(${invoiceX}px, ${invoiceY}px) scale(${invoiceScale})`,
          }}
        >
          <div
            style={{
              width: 88,
              height: 60,
              background: "rgba(255,255,255,0.04)",
              border: "1.5px solid rgba(228,94,90,0.45)",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily,
              fontSize: 24,
              fontWeight: 300,
              color: COLORS.pain,
            }}
          >
            $
          </div>
        </div>

        {/* Broken ledger */}
        <div
          style={{
            position: "absolute",
            opacity: symbolOpacity,
            transform: `translateY(${ledgerY}px) scale(${ledgerScale})`,
          }}
        >
          <LedgerLine
            nodeCount={5}
            brokenAt={2}
            breakProgress={1}
            width={210}
          />
        </div>

        {/* Fee token */}
        <div
          style={{
            position: "absolute",
            opacity: symbolOpacity,
            transform: `translate(${feeX}px, ${feeY}px) scale(${feeScale})`,
          }}
        >
          <FeeToken size={44} />
        </div>
      </AbsoluteFill>

      {/* Akave tile — expands from center */}
      <AbsoluteFill
        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <div
          style={{
            opacity: tileOpacity,
            transform: `scale(${tileScale})`,
          }}
        >
          <AkaveTile width={224} height={70} />
        </div>
      </AbsoluteFill>

      {/* Headline */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingBottom: 148,
        }}
      >
        <div
          style={{
            opacity: headlineOpacity,
            transform: `translateY(${headlineY}px)`,
            fontFamily,
            fontSize: 64,
            fontWeight: 300,
            color: COLORS.white,
            textAlign: "center",
            letterSpacing: "-0.025em",
            lineHeight: 1.25,
          }}
        >
          {COPY.scene3.headline}
        </div>
      </AbsoluteFill>
    </SceneContainer>
  );
};

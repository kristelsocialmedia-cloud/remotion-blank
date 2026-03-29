// ================================================================
// SCENE 5 — Outcome Relief  (195 frames / 6.5 s)
// VO: "Move data when you want. / Predictable pricing. /
//      Verifiable storage."
//
// Three beats — 65 frames each:
//   Beat 1  0–65    Move freely — open exit path
//   Beat 2  65–130  Predictable pricing — stable price display
//   Beat 3  130–195 Verifiable storage — complete resolved ledger
//
// NOTE: Beat 2 and 3 headlines are short strings; they use a larger
// font size (80px) and a tighter gap to keep the layout balanced.
// ================================================================

import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, COPY } from "../config";
import { ExitFrame } from "../primitives/ExitFrame";
import { LedgerLine } from "../primitives/LedgerLine";
import { SceneContainer } from "../primitives/SceneContainer";
import { fontFamily } from "../font";

const BEAT = 65;

const bv = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, start + 12, end - 10, end], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const bvOpen = (frame: number, start: number) =>
  interpolate(frame, [start, start + 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

export const Scene5 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const b1 = bv(frame, 0, BEAT);
  const b2 = bv(frame, BEAT, BEAT * 2);
  const b3 = bvOpen(frame, BEAT * 2);

  const exitIn = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 22 });
  const costIn = spring({ frame: frame - BEAT, fps, config: { damping: 200 }, durationInFrames: 22 });
  const ledgerIn = spring({ frame: frame - BEAT * 2, fps, config: { damping: 200 }, durationInFrames: 22 });

  const claimStyle: React.CSSProperties = {
    fontFamily,
    fontSize: 68,
    fontWeight: 300,
    color: COLORS.white,
    letterSpacing: "-0.025em",
    textAlign: "center",
    lineHeight: 1.25,
    maxWidth: 860,
  };

  return (
    <SceneContainer>
      {/* ================================================================
          BEAT 1 — Move freely
      ================================================================ */}
      <AbsoluteFill
        style={{
          opacity: b1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
        }}
      >
        <div style={claimStyle}>{COPY.scene5.move}</div>
        <div
          style={{
            opacity: interpolate(exitIn, [0, 1], [0, 1]),
            transform: `scale(${interpolate(exitIn, [0, 1], [0.8, 1])})`,
          }}
        >
          <ExitFrame size={96} color={COLORS.highlight} blocked={false} />
        </div>
      </AbsoluteFill>

      {/* ================================================================
          BEAT 2 — Predictable pricing
          Short string → larger type (80px) + tighter gap
      ================================================================ */}
      <AbsoluteFill
        style={{
          opacity: b2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
        }}
      >
        <div style={{ ...claimStyle, fontSize: 80 }}>{COPY.scene5.cost}</div>
        {/* Fixed price display */}
        <div
          style={{
            opacity: interpolate(costIn, [0, 1], [0, 1]),
            transform: `scale(${interpolate(costIn, [0, 1], [0.85, 1])})`,
            background: "rgba(255,255,255,0.04)",
            border: "1.5px solid rgba(176,229,255,0.18)",
            borderRadius: 16,
            padding: "20px 40px",
            display: "flex",
            alignItems: "baseline",
            gap: 10,
          }}
        >
          <span
            style={{
              fontFamily,
              fontSize: 52,
              fontWeight: 300,
              color: COLORS.highlight,
              letterSpacing: "-0.03em",
            }}
          >
            {COPY.scene5.costPrice}
          </span>
          <span style={{ fontFamily, fontSize: 20, fontWeight: 400, color: COLORS.whiteDim }}>
            {COPY.scene5.costUnit}
          </span>
        </div>
      </AbsoluteFill>

      {/* ================================================================
          BEAT 3 — Verifiable storage
          Short string → larger type (80px) + tighter gap
      ================================================================ */}
      <AbsoluteFill
        style={{
          opacity: b3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
        }}
      >
        <div style={{ ...claimStyle, fontSize: 80 }}>{COPY.scene5.proof}</div>
        <div
          style={{
            opacity: interpolate(ledgerIn, [0, 1], [0, 1]),
            transform: `scale(${interpolate(ledgerIn, [0, 1], [0.88, 1])})`,
          }}
        >
          <LedgerLine
            nodeCount={5}
            brokenAt={-1}
            breakProgress={0}
            width={480}
            resolved={true}
          />
        </div>
      </AbsoluteFill>
    </SceneContainer>
  );
};

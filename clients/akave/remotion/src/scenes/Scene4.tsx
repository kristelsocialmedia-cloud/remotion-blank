// ================================================================
// SCENE 4 — Product Proof  (220 frames / 7.3 s)
// VO: "Zero egress fees. S3-compatible from day one.
//      Verifiable storage you can verify yourself."
//
// Three beats — 64 frames each + 28 fr hold on Beat 3:
//   Beat 1  0–64    Exit path opens — no fee
//   Beat 2  64–128  S3 marker snaps in
//   Beat 3  128–220 Proof ledger resolves (extra hold for resolution to land)
//
// No logo/tile in this scene — product claims speak for themselves.
// Logo appears once in Scene 7 (end card).
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
import { ExitFrame } from "../primitives/ExitFrame";
import { LedgerLine } from "../primitives/LedgerLine";
import { SceneContainer } from "../primitives/SceneContainer";
import { fontFamily } from "../font";

const BEAT = 64;

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

export const Scene4 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const b1 = bv(frame, 0, BEAT);
  const b2 = bv(frame, BEAT, BEAT * 2);
  const b3 = bvOpen(frame, BEAT * 2);

  // ---- Beat 1: Zero egress ----
  const exitIn = spring({ frame: frame - 14, fps, config: { damping: 200 }, durationInFrames: 24 });

  // ---- Beat 2: S3 ----
  const s3In = spring({
    frame: frame - BEAT - 14,
    fps,
    config: { damping: 14, stiffness: 200 }, // snappy arrival
    durationInFrames: 18,
  });
  const s3Scale = interpolate(s3In, [0, 1], [0.7, 1]);

  // ---- Beat 3: Ledger resolves ----
  const ledgerIn = spring({ frame: frame - BEAT * 2 - 12, fps, config: { damping: 200 }, durationInFrames: 24 });
  const resolveProgress = interpolate(frame, [BEAT * 2 + 20, BEAT * 2 + 52], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });

  const diagramStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const claimStyle: React.CSSProperties = {
    fontFamily,
    fontSize: 72,
    fontWeight: 300,
    color: COLORS.white,
    letterSpacing: "-0.025em",
    textAlign: "center",
    lineHeight: 1.2,
  };

  const subStyle: React.CSSProperties = {
    fontFamily,
    fontSize: 22,
    fontWeight: 400,
    color: COLORS.whiteDim,
    letterSpacing: "0.01em",
    textAlign: "center",
    marginTop: 16,
  };

  return (
    <SceneContainer>
      {/* ================================================================
          BEAT 1 — Zero egress
      ================================================================ */}
      <AbsoluteFill
        style={{
          opacity: b1,
          ...diagramStyle,
          flexDirection: "column",
        }}
      >
        <div style={{ ...claimStyle }}>{COPY.scene4.egress}</div>
        {/* Exit frame — no fee token */}
        <div
          style={{
            marginTop: 40,
            opacity: interpolate(exitIn, [0, 1], [0, 1]),
            transform: `scale(${interpolate(exitIn, [0, 1], [0.8, 1])})`,
          }}
        >
          <ExitFrame size={90} color={COLORS.highlight} />
        </div>
        <div style={{ ...subStyle, marginTop: 20 }}>{COPY.scene4.egressSub}</div>
      </AbsoluteFill>

      {/* ================================================================
          BEAT 2 — S3-compatible
      ================================================================ */}
      <AbsoluteFill
        style={{ opacity: b2, ...diagramStyle, flexDirection: "column" }}
      >
        <div style={claimStyle}>{COPY.scene4.s3}</div>
        {/* S3 badge */}
        <div
          style={{
            marginTop: 40,
            transform: `scale(${s3Scale})`,
            opacity: interpolate(s3In, [0, 1], [0, 1]),
          }}
        >
          <svg width={140} height={52} viewBox="0 0 140 52">
            <rect
              x={2}
              y={2}
              width={136}
              height={48}
              rx={10}
              fill="rgba(176,229,255,0.06)"
              stroke={COLORS.highlight}
              strokeWidth={2}
            />
            <text
              x={70}
              y={33}
              textAnchor="middle"
              fill={COLORS.highlight}
              fontSize={20}
              fontWeight="500"
              letterSpacing="0.08em"
              fontFamily={fontFamily}
            >
              {COPY.scene4.s3Badge}
            </text>
          </svg>
        </div>
        <div style={{ ...subStyle, marginTop: 20 }}>{COPY.scene4.s3Sub}</div>
      </AbsoluteFill>

      {/* ================================================================
          BEAT 3 — Proof ledger
      ================================================================ */}
      <AbsoluteFill
        style={{ opacity: b3, ...diagramStyle, flexDirection: "column" }}
      >
        <div style={{ ...claimStyle, fontSize: 58, maxWidth: 860 }}>
          {COPY.scene4.proof}
        </div>
        <div
          style={{
            marginTop: 42,
            opacity: interpolate(ledgerIn, [0, 1], [0, 1]),
            transform: `scale(${interpolate(ledgerIn, [0, 1], [0.9, 1])})`,
          }}
        >
          <LedgerLine
            nodeCount={5}
            brokenAt={-1}
            breakProgress={0}
            width={480}
            resolved={resolveProgress > 0.6}
          />
        </div>
        <div style={{ ...subStyle, marginTop: 20, color: resolveProgress > 0.6 ? "#7AFFC4" : COLORS.whiteDim }}>
          {resolveProgress > 0.6 ? COPY.scene4.proofVerified : COPY.scene4.proofVerifying}
        </div>
      </AbsoluteFill>
    </SceneContainer>
  );
};

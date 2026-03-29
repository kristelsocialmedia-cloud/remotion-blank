// ================================================================
// SCENE 4 — Product Introduction  (256 frames / 8.5 s)
// VO: "Meet Akave Cloud. / Zero egress fees. /
//      Save up to 80% vs. hyperscalers. / Move data as often as you want."
//
// Four beats — 64 frames each:
//   Beat 1  0–64    Brand intro — Meet Akave Cloud + logo
//   Beat 2  64–128  Zero egress — open exit path
//   Beat 3  128–192 Cost savings — 80% callout
//   Beat 4  192–256 Data freedom — open exit (bvOpen, holds to end)
//
// Headline position: top 120 (consistent with Scene 2 and Scene 5)
// All claims: 68px — same as every other scene headline
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
import { ExitFrame } from "../primitives/ExitFrame";
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
  const b3 = bv(frame, BEAT * 2, BEAT * 3);
  const b4 = bvOpen(frame, BEAT * 3);

  // Beat 1: logo springs in with slight delay after headline
  const logoIn = spring({ frame: frame - 16, fps, config: { damping: 200 }, durationInFrames: 22 });

  // Beat 2: exit path diagram
  const exitIn = spring({ frame: frame - BEAT - 14, fps, config: { damping: 200 }, durationInFrames: 24 });

  // Beat 3: savings number
  const savingsIn = spring({ frame: frame - BEAT * 2 - 14, fps, config: { damping: 200 }, durationInFrames: 22 });

  // Beat 4: open exit for freedom beat
  const freedomIn = spring({ frame: frame - BEAT * 3 - 14, fps, config: { damping: 200 }, durationInFrames: 24 });

  // Headline pinned at top: 120 — matches Scene 2 and Scene 5
  const headlineWrap: React.CSSProperties = {
    position: "absolute",
    top: 120,
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "center",
  };

  const claimStyle: React.CSSProperties = {
    fontFamily,
    fontSize: 68,
    fontWeight: 300,
    color: COLORS.white,
    letterSpacing: "-0.025em",
    textAlign: "center",
    lineHeight: 1.25,
    maxWidth: 900,
  };

  const subStyle: React.CSSProperties = {
    fontFamily,
    fontSize: 22,
    fontWeight: 400,
    color: COLORS.whiteDim,
    letterSpacing: "0.01em",
    textAlign: "center",
    marginTop: 18,
  };

  // Diagrams anchor consistently below the headline
  const diagramTop = 360;

  return (
    <SceneContainer>
      {/* ================================================================
          BEAT 1 — Meet Akave Cloud
      ================================================================ */}
      <AbsoluteFill style={{ opacity: b1 }}>
        <div style={headlineWrap}>
          <div style={claimStyle}>{COPY.scene4.meet}</div>
        </div>
        <div
          style={{
            position: "absolute",
            top: diagramTop,
            left: "50%",
            transform: "translateX(-50%)",
            opacity: interpolate(logoIn, [0, 1], [0, 1]),
          }}
        >
          <Img
            src={staticFile("akave-logo-white.png")}
            style={{ width: 260 }}
          />
        </div>
      </AbsoluteFill>

      {/* ================================================================
          BEAT 2 — Zero egress fees
      ================================================================ */}
      <AbsoluteFill style={{ opacity: b2 }}>
        <div style={headlineWrap}>
          <div style={claimStyle}>{COPY.scene4.egress}</div>
        </div>
        <div
          style={{
            position: "absolute",
            top: diagramTop,
            left: "50%",
            transform: `translateX(-50%) scale(${interpolate(exitIn, [0, 1], [0.8, 1])})`,
            opacity: exitIn,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ExitFrame size={90} color={COLORS.highlight} />
          <div style={subStyle}>{COPY.scene4.egressSub}</div>
        </div>
      </AbsoluteFill>

      {/* ================================================================
          BEAT 3 — Save up to 80% vs. hyperscalers
      ================================================================ */}
      <AbsoluteFill style={{ opacity: b3 }}>
        <div style={headlineWrap}>
          <div style={claimStyle}>{COPY.scene4.savings}</div>
        </div>
        <div
          style={{
            position: "absolute",
            top: diagramTop,
            left: "50%",
            transform: `translateX(-50%) scale(${interpolate(savingsIn, [0, 1], [0.85, 1])})`,
            opacity: savingsIn,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontFamily,
              fontSize: 100,
              fontWeight: 300,
              color: COLORS.highlight,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            80%
          </div>
          <div style={subStyle}>{COPY.scene4.savingsSub}</div>
        </div>
      </AbsoluteFill>

      {/* ================================================================
          BEAT 4 — Move data as often as you want
      ================================================================ */}
      <AbsoluteFill style={{ opacity: b4 }}>
        <div style={headlineWrap}>
          <div style={claimStyle}>{COPY.scene4.freedom}</div>
        </div>
        <div
          style={{
            position: "absolute",
            top: diagramTop,
            left: "50%",
            transform: `translateX(-50%) scale(${interpolate(freedomIn, [0, 1], [0.8, 1])})`,
            opacity: freedomIn,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ExitFrame size={90} color={COLORS.highlight} blocked={false} />
          <div style={subStyle}>{COPY.scene4.freedomSub}</div>
        </div>
      </AbsoluteFill>
    </SceneContainer>
  );
};

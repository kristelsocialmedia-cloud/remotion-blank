// ================================================================
// SCENE 1 — Invisible Problem  (135 frames / 4.5 s)
// VO: "You don't notice the problem when data goes in.
//      You notice it when you need it back."
//
// TIMING (local frames):
//   0–12   Storage block + track fade in
//   0–12   Headline 1 entrance
//   15–55  Packet travels LEFT → RIGHT  (calm, blue)
//   58–68  Headline cross-fade
//   68–82  Track transitions to pain colour
//   72–118 Packet travels RIGHT → LEFT  (heavy, red)
//  118–135 Hold on headline 2
// ================================================================

import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, COPY } from "../config";
import { DataPacket } from "../primitives/DataPacket";
import { SceneContainer } from "../primitives/SceneContainer";
import { StorageBlock } from "../primitives/StorageBlock";
import { fontFamily } from "../font";

// Layout constants
const TRACK_Y = 420;
const SOURCE_X = 220;
const STORAGE_CX = 1000;
const STORAGE_W = 120;
const STORAGE_H = 80;
const PKT_W = 44;
const PKT_H = 28;

// Packet travel bounds  (left edge of packet)
const TRAVEL_L = SOURCE_X + 12;
const TRAVEL_R = STORAGE_CX - STORAGE_W / 2 - PKT_W - 12; // = 804

export const Scene1 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ---- Storage block entrance ----
  const storageIn = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 20 });
  const storageOpacity = interpolate(storageIn, [0, 1], [0, 1]);

  // ---- Phase-1 packet (going IN — calm) ----
  const pkt1Progress = interpolate(frame, [15, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const pkt1X = interpolate(pkt1Progress, [0, 1], [TRAVEL_L, TRAVEL_R]);
  const pkt1Opacity = interpolate(frame, [15, 22, 52, 58], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ---- Track colour transition (calm → pain) ----
  const trackShift = interpolate(frame, [62, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ---- Phase-2 packet (coming OUT — heavy / red) ----
  const pkt2Progress = interpolate(frame, [72, 118], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic), // starts slow — reluctant / heavy
  });
  const pkt2X = interpolate(pkt2Progress, [0, 1], [TRAVEL_R, TRAVEL_L]);
  const pkt2Opacity = interpolate(frame, [72, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ---- Headline 1 ----
  const h1Opacity = interpolate(frame, [0, 12, 58, 70], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ---- Headline 2 ----
  const h2Entrance = spring({ frame: frame - 68, fps, config: { damping: 200 }, durationInFrames: 20 });
  const h2Opacity = interpolate(h2Entrance, [0, 1], [0, 1]);
  const h2Y = interpolate(h2Entrance, [0, 1], [20, 0]);

  const headlineStyle: React.CSSProperties = {
    fontFamily,
    fontSize: 68,
    fontWeight: 300,
    color: COLORS.white,
    textAlign: "center",
    lineHeight: 1.25,
    letterSpacing: "-0.022em",
    maxWidth: 860,
  };

  return (
    <SceneContainer>
      {/* Track lines (two overlapping: calm fades out, pain fades in) */}
      <AbsoluteFill style={{ pointerEvents: "none" }}>
        <svg width={1280} height={720} style={{ position: "absolute", inset: 0 }}>
          {/* Calm track */}
          <line
            x1={SOURCE_X + PKT_W}
            y1={TRACK_Y}
            x2={STORAGE_CX - STORAGE_W / 2 - 4}
            y2={TRACK_Y}
            stroke={COLORS.highlight}
            strokeWidth={1.5}
            strokeOpacity={0.22 * (1 - trackShift)}
          />
          {/* Pain track */}
          <line
            x1={SOURCE_X + PKT_W}
            y1={TRACK_Y}
            x2={STORAGE_CX - STORAGE_W / 2 - 4}
            y2={TRACK_Y}
            stroke={COLORS.pain}
            strokeWidth={2}
            strokeOpacity={0.38 * trackShift}
            strokeDasharray="8 6"
          />
          {/* Source dot */}
          <circle
            cx={SOURCE_X}
            cy={TRACK_Y}
            r={5}
            fill={COLORS.highlight}
            fillOpacity={0.35}
            stroke={COLORS.highlight}
            strokeWidth={1.5}
            strokeOpacity={0.5}
          />
        </svg>
      </AbsoluteFill>

      {/* Storage block */}
      <div
        style={{
          position: "absolute",
          left: STORAGE_CX - STORAGE_W / 2,
          top: TRACK_Y - STORAGE_H / 2,
          opacity: storageOpacity,
        }}
      >
        <StorageBlock width={STORAGE_W} height={STORAGE_H} />
      </div>

      {/* Phase-1 packet (calm / blue) */}
      <div
        style={{
          position: "absolute",
          left: pkt1X,
          top: TRACK_Y - PKT_H / 2,
          opacity: pkt1Opacity,
        }}
      >
        <DataPacket color={COLORS.highlight} width={PKT_W} height={PKT_H} />
      </div>

      {/* Phase-2 packet (heavy / red) */}
      <div
        style={{
          position: "absolute",
          left: pkt2X,
          top: TRACK_Y - PKT_H / 2,
          opacity: pkt2Opacity,
        }}
      >
        <DataPacket color={COLORS.pain} width={PKT_W} height={PKT_H} />
      </div>

      {/* Headline 1 */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: 112,
          opacity: h1Opacity,
        }}
      >
        <div style={headlineStyle}>
          {COPY.scene1.in.split("\n").map((l, i) => (
            <div key={i}>{l}</div>
          ))}
        </div>
      </AbsoluteFill>

      {/* Headline 2 */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: 112,
          opacity: h2Opacity,
          transform: `translateY(${h2Y}px)`,
        }}
      >
        <div style={{ ...headlineStyle, color: COLORS.white }}>
          {COPY.scene1.out.split("\n").map((l, i) => (
            <div key={i}>{l}</div>
          ))}
        </div>
      </AbsoluteFill>
    </SceneContainer>
  );
};

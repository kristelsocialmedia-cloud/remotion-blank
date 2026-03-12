// ================================================================
// SCENE 6 — Closing Promise  (135 frames / 4.5 s)
// VO: "Predictable pricing. / Verifiable storage. / Exit on your terms."
//
// Pure typography. Three lines appear sequentially — no competing visuals.
//
// TIMING:
//   0–15   Line 1 "Predictable pricing."
//   42–57  Line 2 "Verifiable storage."
//   84–99  Line 3 "Exit on your terms."
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

export const Scene6 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const line1In = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 22 });
  const line2In = spring({ frame: frame - 42, fps, config: { damping: 200 }, durationInFrames: 22 });
  const line3In = spring({ frame: frame - 84, fps, config: { damping: 200 }, durationInFrames: 22 });

  const mkStyle = (progress: number, dim: boolean): React.CSSProperties => ({
    fontFamily,
    fontSize: 68,
    fontWeight: 300,
    color: dim ? COLORS.whiteDim : COLORS.white,
    letterSpacing: "-0.025em",
    lineHeight: 1,
    opacity: interpolate(progress, [0, 1], [0, 1]),
    transform: `translateY(${interpolate(progress, [0, 1], [18, 0])}px)`,
    textAlign: "center",
  });

  // The first two lines subtly dim once the next line appears
  const p1Dim =
    interpolate(frame, [42, 54], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }) > 0.5;
  const p2Dim =
    interpolate(frame, [84, 96], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }) > 0.5;

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 32,
        fontFamily,
      }}
    >
      <div style={mkStyle(line1In, p1Dim)}>{COPY.scene6.p1}</div>
      <div style={mkStyle(line2In, p2Dim)}>{COPY.scene6.p2}</div>
      <div style={mkStyle(line3In, false)}>{COPY.scene6.p3}</div>
    </AbsoluteFill>
  );
};

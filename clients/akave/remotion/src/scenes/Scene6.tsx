// ================================================================
// SCENE 6 — Closing Promise  (165 frames / 5.5 s)
// VO: "Run AI without lock-in. / Own your data. /
//      A modern S3-Compatible object storage."
//
// Pure typography. Three lines appear sequentially — no competing visuals.
// NOTE: p3 uses a smaller font size (52px) because it is a longer string.
//
// TIMING:
//   0–15   Line 1 "Run AI without lock-in."
//   42–57  Line 2 "Own your data."
//   84–99  Line 3 "A modern S3-Compatible object storage."
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

  // size defaults to 68; pass a smaller value for longer strings to keep
  // every line on a single row within the 1280px canvas.
  const mkStyle = (progress: number, dim: boolean, size = 68): React.CSSProperties => ({
    fontFamily,
    fontSize: size,
    fontWeight: 300,
    color: dim ? COLORS.whiteDim : COLORS.white,
    letterSpacing: "-0.025em",
    lineHeight: 1,
    opacity: interpolate(progress, [0, 1], [0, 1]),
    transform: `translateY(${interpolate(progress, [0, 1], [18, 0])}px)`,
    textAlign: "center",
    maxWidth: 1100, // safety net for unexpectedly long strings
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
        // Tighter gap keeps the three lines reading as one cohesive block
        gap: 24,
        fontFamily,
      }}
    >
      <div style={mkStyle(line1In, p1Dim)}>{COPY.scene6.p1}</div>
      <div style={mkStyle(line2In, p2Dim)}>{COPY.scene6.p2}</div>
      {/* p3 is a longer descriptor string — 52px balances it against the lines above */}
      <div style={mkStyle(line3In, false, 52)}>{COPY.scene6.p3}</div>
    </AbsoluteFill>
  );
};

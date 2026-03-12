import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../config";
import { fontFamily } from "../font";

interface HeadlineTextProps {
  text: string;
  size?: number;
  weight?: number;
  color?: string;
  delay?: number;       // frames to wait before entrance
  maxWidth?: number;
  align?: "center" | "left";
  style?: React.CSSProperties;
}

// Large animated headline — slides up from 20px + fades in on entrance.
// Pass `delay` to stagger multiple headlines in the same scene.
export const HeadlineText = ({
  text,
  size = 72,
  weight = 300,
  color = COLORS.white,
  delay = 0,
  maxWidth = 960,
  align = "center",
  style,
}: HeadlineTextProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
    durationInFrames: 24,
  });

  return (
    <div
      style={{
        opacity: interpolate(progress, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(progress, [0, 1], [22, 0])}px)`,
        fontFamily,
        fontSize: size,
        fontWeight: weight,
        color,
        textAlign: align,
        lineHeight: 1.25,
        letterSpacing: "-0.025em",
        maxWidth,
        ...style,
      }}
    >
      {text.split("\n").map((line, i) => (
        <div key={i}>{line}</div>
      ))}
    </div>
  );
};

import { AbsoluteFill } from "remotion";
import { COLORS } from "../config";
import { fontFamily } from "../font";

// Full-screen wrapper for every scene — dark navy background + Inter font
export const SceneContainer = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => (
  <AbsoluteFill
    style={{
      background: COLORS.bg,
      fontFamily,
      overflow: "hidden",
      ...style,
    }}
  >
    {children}
  </AbsoluteFill>
);

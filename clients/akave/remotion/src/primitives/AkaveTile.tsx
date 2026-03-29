import { COLORS } from "../config";
import { fontFamily } from "../font";

interface AkaveTileProps {
  width?: number;
  height?: number;
  opacity?: number;
  scale?: number;
}

// The product-state tile — appears when Akave enters the frame.
// Deep accent blue with a light highlight border and the AKAVE wordmark.
export const AkaveTile = ({
  width = 220,
  height = 68,
  opacity = 1,
  scale = 1,
}: AkaveTileProps) => (
  <svg
    width={width * scale}
    height={height * scale}
    viewBox={`0 0 ${width} ${height}`}
    style={{ overflow: "visible", opacity }}
  >
    <rect
      x={2}
      y={2}
      width={width - 4}
      height={height - 4}
      rx={12}
      ry={12}
      fill={COLORS.accent}
      stroke={COLORS.highlight}
      strokeWidth={2}
    />
    <text
      x={width / 2}
      y={height / 2 + 7}
      textAnchor="middle"
      fill={COLORS.highlight}
      fontSize={20}
      fontWeight="500"
      letterSpacing="0.14em"
      fontFamily={fontFamily}
    >
      AKAVE
    </text>
  </svg>
);

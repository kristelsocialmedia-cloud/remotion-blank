import { COLORS } from "../config";

interface StorageBlockProps {
  width?: number;
  height?: number;
  color?: string;
  opacity?: number;
}

// Rounded storage block with horizontal layer lines —
// represents a unit of stored data.
export const StorageBlock = ({
  width = 110,
  height = 76,
  color = COLORS.highlight,
  opacity = 1,
}: StorageBlockProps) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    style={{ overflow: "visible", opacity }}
  >
    {/* Outer rounded rect */}
    <rect
      x={2}
      y={2}
      width={width - 4}
      height={height - 4}
      rx={10}
      ry={10}
      fill="rgba(0,25,153,0.35)"
      stroke={color}
      strokeWidth={2.5}
    />
    {/* Three horizontal layer lines — suggest data density */}
    <line
      x1={14}
      y1={height * 0.35}
      x2={width - 14}
      y2={height * 0.35}
      stroke={color}
      strokeWidth={1.5}
      strokeOpacity={0.5}
    />
    <line
      x1={14}
      y1={height * 0.55}
      x2={width - 14}
      y2={height * 0.55}
      stroke={color}
      strokeWidth={1.5}
      strokeOpacity={0.4}
    />
    <line
      x1={14}
      y1={height * 0.72}
      x2={width - 14}
      y2={height * 0.72}
      stroke={color}
      strokeWidth={1.5}
      strokeOpacity={0.2}
    />
  </svg>
);

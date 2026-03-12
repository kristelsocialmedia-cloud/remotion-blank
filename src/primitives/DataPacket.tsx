import { COLORS } from "../config";

interface DataPacketProps {
  color?: string;
  width?: number;
  height?: number;
  opacity?: number;
}

// Small rounded rectangle representing a data packet in motion.
// Color changes between calm (highlight) and pain (red) depending on context.
export const DataPacket = ({
  color = COLORS.highlight,
  width = 44,
  height = 28,
  opacity = 1,
}: DataPacketProps) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    style={{ overflow: "visible", opacity }}
  >
    <rect
      x={1.5}
      y={1.5}
      width={width - 3}
      height={height - 3}
      rx={6}
      ry={6}
      fill={color}
      fillOpacity={0.92}
    />
    {/* Internal lines suggest data payload */}
    <line
      x1={8}
      y1={height * 0.4}
      x2={width - 8}
      y2={height * 0.4}
      stroke="rgba(2,0,56,0.45)"
      strokeWidth={1.5}
    />
    <line
      x1={8}
      y1={height * 0.65}
      x2={width - 12}
      y2={height * 0.65}
      stroke="rgba(2,0,56,0.3)"
      strokeWidth={1.5}
    />
  </svg>
);

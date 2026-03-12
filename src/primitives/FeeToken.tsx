import { COLORS } from "../config";
import { fontFamily } from "../font";

interface FeeTokenProps {
  size?: number;
  opacity?: number;
  scale?: number;
}

// Red coin with a $ sign — represents egress or exit cost.
export const FeeToken = ({ size = 44, opacity = 1, scale = 1 }: FeeTokenProps) => (
  <svg
    width={size * scale}
    height={size * scale}
    viewBox="0 0 44 44"
    style={{ overflow: "visible", opacity }}
  >
    <circle
      cx={22}
      cy={22}
      r={20}
      fill="rgba(228,94,90,0.22)"
      stroke={COLORS.pain}
      strokeWidth={2.5}
    />
    <text
      x={22}
      y={28}
      textAnchor="middle"
      fill={COLORS.pain}
      fontSize={18}
      fontWeight="600"
      fontFamily={fontFamily}
    >
      $
    </text>
  </svg>
);

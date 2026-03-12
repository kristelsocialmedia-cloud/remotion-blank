import { COLORS } from "../config";

interface ExitFrameProps {
  size?: number;
  color?: string;
  opacity?: number;
  blocked?: boolean;   // shows red X when exit is penalised
}

// Three-sided open frame (left/top/bottom) with a right-pointing arrow —
// represents data leaving storage. `blocked` overlays a red X.
export const ExitFrame = ({
  size = 72,
  color = COLORS.highlight,
  opacity = 1,
  blocked = false,
}: ExitFrameProps) => {
  const s = size;
  const pad = 5;
  const sw = 3;
  const frameColor = blocked ? COLORS.pain : color;

  return (
    <svg
      width={s}
      height={s}
      viewBox={`0 0 ${s} ${s}`}
      style={{ overflow: "visible", opacity }}
    >
      {/* Left / top / bottom edges — open on the right */}
      <path
        d={`M ${s - pad} ${pad} L ${pad} ${pad} L ${pad} ${s - pad} L ${s - pad} ${s - pad}`}
        fill="none"
        stroke={frameColor}
        strokeWidth={sw}
        strokeLinecap="round"
        strokeOpacity={0.8}
      />
      {/* Horizontal arrow shaft */}
      <line
        x1={s * 0.22}
        y1={s / 2}
        x2={s * 0.84}
        y2={s / 2}
        stroke={frameColor}
        strokeWidth={sw - 0.5}
        strokeOpacity={0.9}
      />
      {/* Arrow head */}
      <path
        d={`M ${s * 0.70} ${s / 2 - 9} L ${s * 0.84} ${s / 2} L ${s * 0.70} ${s / 2 + 9}`}
        fill="none"
        stroke={frameColor}
        strokeWidth={sw - 0.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Blocked X overlay */}
      {blocked && (
        <g>
          <line
            x1={s * 0.54}
            y1={s * 0.34}
            x2={s * 0.82}
            y2={s * 0.66}
            stroke={COLORS.pain}
            strokeWidth={2.5}
            strokeLinecap="round"
          />
          <line
            x1={s * 0.82}
            y1={s * 0.34}
            x2={s * 0.54}
            y2={s * 0.66}
            stroke={COLORS.pain}
            strokeWidth={2.5}
            strokeLinecap="round"
          />
        </g>
      )}
    </svg>
  );
};

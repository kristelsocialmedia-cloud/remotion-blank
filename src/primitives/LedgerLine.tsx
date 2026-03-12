import { COLORS } from "../config";

interface LedgerLineProps {
  nodeCount?: number;
  brokenAt?: number;       // index of the node that breaks (0-based); -1 = none
  breakProgress?: number;  // 0→1 animates the break
  width?: number;
  resolved?: boolean;      // all nodes healthy (green-ish highlight)
}

// Horizontal proof chain — nodes connected by lines.
// A broken segment reveals a gap in the audit trail.
// A resolved state shows a fully connected, verified chain.
export const LedgerLine = ({
  nodeCount = 5,
  brokenAt = -1,
  breakProgress = 0,
  width = 480,
  resolved = false,
}: LedgerLineProps) => {
  const h = 48;
  const r = 8;        // node radius
  const cy = h / 2;

  // Evenly space nodes across the full width
  const gap = (width - r * 2 * nodeCount) / (nodeCount + 1);
  const nodes = Array.from({ length: nodeCount }, (_, i) =>
    gap + r + i * (gap + r * 2)
  );

  const healthyColor = resolved ? "#7AFFC4" : COLORS.highlight;

  return (
    <svg width={width} height={h} viewBox={`0 0 ${width} ${h}`}>
      {/* Connecting lines between nodes */}
      {nodes.map((x, i) => {
        if (i === nodeCount - 1) return null;
        const nx = nodes[i + 1];
        const isBrokenSeg = brokenAt !== -1 && i === brokenAt - 1;
        const isAfter = brokenAt !== -1 && i >= brokenAt;

        if (isBrokenSeg && breakProgress > 0.25) {
          const mid = (x + nx) / 2;
          const gapPx = 18 * breakProgress;
          return (
            <g key={i}>
              <line
                x1={x + r}
                y1={cy}
                x2={mid - gapPx}
                y2={cy}
                stroke={COLORS.pain}
                strokeWidth={2}
                strokeOpacity={0.8}
              />
              <line
                x1={mid + gapPx}
                y1={cy}
                x2={nx - r}
                y2={cy}
                stroke={COLORS.pain}
                strokeWidth={2}
                strokeOpacity={0.35}
                strokeDasharray="4 5"
              />
            </g>
          );
        }

        return (
          <line
            key={i}
            x1={x + r}
            y1={cy}
            x2={nx - r}
            y2={cy}
            stroke={isAfter ? "rgba(176,229,255,0.18)" : healthyColor}
            strokeWidth={2}
            strokeOpacity={isAfter ? 1 : 0.5}
          />
        );
      })}

      {/* Nodes */}
      {nodes.map((x, i) => {
        const isBroken = i === brokenAt;
        const isAfter = brokenAt !== -1 && i > brokenAt;

        const fill = isBroken
          ? `rgba(228,94,90,${breakProgress * 0.3})`
          : isAfter
          ? "rgba(176,229,255,0.06)"
          : resolved
          ? "rgba(122,255,196,0.15)"
          : "rgba(0,25,153,0.45)";

        const stroke = isBroken
          ? COLORS.pain
          : isAfter
          ? "rgba(176,229,255,0.22)"
          : healthyColor;

        const strokeOpacity = isBroken ? breakProgress : isAfter ? 1 : 0.85;

        return (
          <g key={i}>
            <circle
              cx={x}
              cy={cy}
              r={r}
              fill={fill}
              stroke={stroke}
              strokeWidth={2.5}
              strokeOpacity={strokeOpacity}
            />
            {/* Question mark on broken node once sufficiently broken */}
            {isBroken && breakProgress > 0.55 && (
              <text
                x={x}
                y={cy + 4}
                textAnchor="middle"
                fill={COLORS.pain}
                fontSize={10}
                fontWeight="600"
              >
                ?
              </text>
            )}
            {/* Check mark on resolved nodes */}
            {resolved && (
              <text
                x={x}
                y={cy + 4}
                textAnchor="middle"
                fill="#7AFFC4"
                fontSize={9}
                fontWeight="700"
              >
                ✓
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
};

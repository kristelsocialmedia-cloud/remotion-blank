// ================================================================
// SCENE 2 — Pain Escalation  (225 frames / 7.5 s)
// VO: "The bill jumps. / The audit turns into guesswork. /
//      And every exit gets taxed on the way out."
//
// Three beats — each 75 frames long:
//   Beat 1  0–75    Invoice card with rising cost
//   Beat 2  75–150  Broken ledger proof chain
//   Beat 3  150–225 Packet moving toward penalised exit
// ================================================================

import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, COPY } from "../config";
import { DataPacket } from "../primitives/DataPacket";
import { ExitFrame } from "../primitives/ExitFrame";
import { FeeToken } from "../primitives/FeeToken";
import { LedgerLine } from "../primitives/LedgerLine";
import { SceneContainer } from "../primitives/SceneContainer";
import { StorageBlock } from "../primitives/StorageBlock";
import { fontFamily } from "../font";

const BEAT = 75;

// Beat opacity helper: fade in, hold, fade out
const bv = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, start + 12, end - 10, end], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

// Last beat stays visible (no fade-out)
const bvOpen = (frame: number, start: number) =>
  interpolate(frame, [start, start + 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

export const Scene2 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const b1 = bv(frame, 0, BEAT);
  const b2 = bv(frame, BEAT, BEAT * 2);
  const b3 = bvOpen(frame, BEAT * 2);

  // ---- Beat 1: Invoice ----
  const cardIn = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 20 });
  const billAmount = interpolate(frame, [18, 54], [0, 847], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  const bars = [18, 26, 22, 30, 45, 68, 100]; // percentage heights
  const barReveal = interpolate(frame, [22, 52], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ---- Beat 2: Ledger ----
  const ledgerIn = spring({ frame: frame - BEAT, fps, config: { damping: 200 }, durationInFrames: 20 });
  const breakProgress = interpolate(frame, [BEAT + 22, BEAT + 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const missingLabelOpacity = interpolate(frame, [BEAT + 45, BEAT + 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ---- Beat 3: Exit taxed ----
  const exitIn = spring({ frame: frame - BEAT * 2, fps, config: { damping: 200 }, durationInFrames: 20 });
  const packetProgress = interpolate(frame, [BEAT * 2 + 18, BEAT * 2 + 58], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });
  const feeIn = spring({
    frame: frame - BEAT * 2 - 30,
    fps,
    config: { damping: 200 },
    durationInFrames: 16,
  });

  const headlineStyle: React.CSSProperties = {
    fontFamily,
    fontSize: 58,
    fontWeight: 300,
    color: COLORS.white,
    letterSpacing: "-0.022em",
    textAlign: "center",
  };

  return (
    <SceneContainer>
      {/* ================================================================
          BEAT 1 — The bill jumps
      ================================================================ */}
      <AbsoluteFill style={{ opacity: b1 }}>
        <div
          style={{
            position: "absolute",
            top: 100,
            left: 0,
            right: 0,
            textAlign: "center",
          }}
        >
          <div style={headlineStyle}>{COPY.scene2.beat1}</div>
        </div>

        {/* Invoice card */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -46%) scale(${interpolate(cardIn, [0, 1], [0.88, 1])})`,
            opacity: cardIn,
            width: 300,
            background: "rgba(255,255,255,0.035)",
            border: "1.5px solid rgba(176,229,255,0.16)",
            borderRadius: 20,
            padding: "28px 30px 24px",
          }}
        >
          <div
            style={{
              fontFamily,
              fontSize: 11,
              fontWeight: 500,
              color: COLORS.whiteDim,
              letterSpacing: "0.14em",
              marginBottom: 14,
            }}
          >
            {COPY.scene2.invoiceLabel}
          </div>
          <div
            style={{
              fontFamily,
              fontSize: 54,
              fontWeight: 300,
              color: COLORS.pain,
              letterSpacing: "-0.03em",
              lineHeight: 1,
              marginBottom: 22,
            }}
          >
            ${Math.floor(billAmount).toLocaleString()}
          </div>

          {/* Bar chart */}
          <div
            style={{
              display: "flex",
              gap: 5,
              alignItems: "flex-end",
              height: 60,
              marginBottom: 10,
            }}
          >
            {bars.map((pct, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${pct * barReveal}%`,
                  background:
                    i === bars.length - 1
                      ? COLORS.pain
                      : i >= bars.length - 3
                      ? "rgba(228,94,90,0.5)"
                      : "rgba(176,229,255,0.28)",
                  borderRadius: "2px 2px 0 0",
                  minHeight: 1,
                }}
              />
            ))}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontFamily,
              fontSize: 11,
              color: COLORS.whiteDim,
            }}
          >
            <span>{COPY.scene2.storageLabel}</span>
            <span style={{ color: COLORS.pain }}>{COPY.scene2.egressLabel}</span>
          </div>
        </div>
      </AbsoluteFill>

      {/* ================================================================
          BEAT 2 — The audit turns into guesswork
      ================================================================ */}
      <AbsoluteFill style={{ opacity: b2 }}>
        <div style={{ position: "absolute", top: 100, left: 0, right: 0, textAlign: "center" }}>
          <div style={headlineStyle}>{COPY.scene2.beat2}</div>
        </div>

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) scale(${interpolate(ledgerIn, [0, 1], [0.9, 1])})`,
            opacity: ledgerIn,
          }}
        >
          <LedgerLine
            nodeCount={5}
            brokenAt={2}
            breakProgress={breakProgress}
            width={540}
          />
          {/* "Missing proof" label below the broken node */}
          <div
            style={{
              position: "absolute",
              top: 52,
              left: "44%",
              transform: "translateX(-50%)",
              fontFamily,
              fontSize: 13,
              fontWeight: 400,
              color: COLORS.pain,
              letterSpacing: "0.04em",
              opacity: missingLabelOpacity,
              whiteSpace: "nowrap",
            }}
          >
            {COPY.scene2.missingProof}
          </div>
        </div>
      </AbsoluteFill>

      {/* ================================================================
          BEAT 3 — Every exit gets taxed
      ================================================================ */}
      <AbsoluteFill style={{ opacity: b3 }}>
        <div style={{ position: "absolute", top: 100, left: 0, right: 0, textAlign: "center" }}>
          <div style={{ ...headlineStyle, fontSize: 52 }}>{COPY.scene2.beat3}</div>
        </div>

        {/* Layout: StorageBlock — path+packet+feeToken — ExitFrame */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -44%) scale(${interpolate(exitIn, [0, 1], [0.9, 1])})`,
            opacity: exitIn,
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* Left: storage */}
          <StorageBlock width={100} height={70} />

          {/* Middle: path + moving packet + fee token */}
          <div style={{ position: "relative", width: 320, height: 70 }}>
            {/* Track line */}
            <svg
              width={320}
              height={70}
              style={{ position: "absolute", inset: 0 }}
            >
              <line
                x1={0}
                y1={35}
                x2={320}
                y2={35}
                stroke={COLORS.highlight}
                strokeWidth={1.5}
                strokeOpacity={0.2}
              />
            </svg>

            {/* Moving packet */}
            <div
              style={{
                position: "absolute",
                left: interpolate(packetProgress, [0, 1], [10, 260]),
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <DataPacket color={COLORS.highlight} width={40} height={26} />
            </div>

            {/* Fee token — appears mid-journey */}
            <div
              style={{
                position: "absolute",
                left: 130,
                top: "50%",
                transform: `translate(-50%, -50%) scale(${interpolate(feeIn, [0, 1], [0, 1])})`,
                opacity: feeIn,
              }}
            >
              <FeeToken size={44} />
            </div>
          </div>

          {/* Right: exit frame */}
          <ExitFrame size={70} blocked={false} color={COLORS.whiteDim} />
        </div>
      </AbsoluteFill>
    </SceneContainer>
  );
};

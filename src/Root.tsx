import "./index.css";
import { Composition } from "remotion";
import { AkaveExplainer } from "./AkaveExplainer";
import { Concept1BillCounter } from "./concepts/Concept1BillCounter";
import { Concept8OneNumber } from "./concepts/Concept8OneNumber";
import { FPS, TOTAL_FRAMES } from "./config";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ---- Main explainer ---- */}
      <Composition
        id="AkaveExplainer"
        component={AkaveExplainer}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1280}
        height={720}
      />

      {/* ---- Concept demos ---- */}

      {/* Concept 01 — The Bill Counter (8 s)
          Opening headline → escalating dollar counter → $14.99/TB locks in */}
      <Composition
        id="Concept01-BillCounter"
        component={Concept1BillCounter}
        durationInFrames={240}
        fps={FPS}
        width={1280}
        height={720}
      />

      {/* Concept 08 — One Number (6 s)
          $14.99/TB assembles piece-by-piece → sub-label → brand */}
      <Composition
        id="Concept08-OneNumber"
        component={Concept8OneNumber}
        durationInFrames={180}
        fps={FPS}
        width={1280}
        height={720}
      />
    </>
  );
};

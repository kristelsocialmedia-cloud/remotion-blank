// ================================================================
// AKAVE EXPLAINER — Master Composition
//
// Sequences all 7 scenes with cross-fade transitions.
//
// Total duration calculation:
//   Sum of scene frames : 135+225+75+255+165+135+60 = 1050
//   Minus 6 × 20 (transitions) = −120
//   Total = 930 frames = 31 s at 30 fps
//
// To adjust a scene duration, change the matching value in
// src/config.ts (SCENE_FRAMES) AND update TOTAL_FRAMES.
// ================================================================

import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { SCENE_FRAMES, TRANSITION_FRAMES } from "./config";
import { Scene1 } from "./scenes/Scene1";
import { Scene2 } from "./scenes/Scene2";
import { Scene3 } from "./scenes/Scene3";
import { Scene4 } from "./scenes/Scene4";
import { Scene5 } from "./scenes/Scene5";
import { Scene6 } from "./scenes/Scene6";
import { Scene7 } from "./scenes/Scene7";

// Shared transition — smooth cross-fade, 20 frames
const transition = (
  <TransitionSeries.Transition
    presentation={fade()}
    timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
  />
);

export const AkaveExplainer = () => (
  <TransitionSeries>
    {/* Scene 1 — Invisible Problem */}
    <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES.s1}>
      <Scene1 />
    </TransitionSeries.Sequence>
    {transition}

    {/* Scene 2 — Pain Escalation */}
    <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES.s2}>
      <Scene2 />
    </TransitionSeries.Sequence>
    {transition}

    {/* Scene 3 — Model Shift */}
    <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES.s3}>
      <Scene3 />
    </TransitionSeries.Sequence>
    {transition}

    {/* Scene 4 — Product Proof */}
    <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES.s4}>
      <Scene4 />
    </TransitionSeries.Sequence>
    {transition}

    {/* Scene 5 — Outcome Relief */}
    <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES.s5}>
      <Scene5 />
    </TransitionSeries.Sequence>
    {transition}

    {/* Scene 6 — Closing Promise */}
    <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES.s6}>
      <Scene6 />
    </TransitionSeries.Sequence>
    {transition}

    {/* Scene 7 — Brand End Card */}
    <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES.s7}>
      <Scene7 />
    </TransitionSeries.Sequence>
  </TransitionSeries>
);

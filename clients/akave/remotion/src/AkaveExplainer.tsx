// ================================================================
// AKAVE EXPLAINER — Master Composition
//
// Sequences 6 scenes with cross-fade transitions.
// Scene 3 (Model Shift) removed — pain flows directly into product proof.
//
// Total duration calculation:
//   Sum of scene frames : 135+225+220+195+165+90 = 1030
//   Minus 5 × 20 (transitions) = −100
//   Total = 930 frames = 31.0 s at 30 fps
//
// To adjust a scene duration, change the matching value in
// src/config.ts (SCENE_FRAMES) AND update TOTAL_FRAMES.
// Scene3.tsx is kept in /scenes in case it needs to be restored.
// ================================================================

import { Audio, interpolate, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { SCENE_FRAMES, TOTAL_FRAMES, TRANSITION_FRAMES } from "./config";
import { Scene1 } from "./scenes/Scene1";
import { Scene2 } from "./scenes/Scene2";
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

// Music volume envelope:
//   0 → 45 fr   fade in  (1.5 s)
//   45 → 885 fr  hold at 0.18  (leaves headroom for voiceover)
//   885 → 930 fr fade out (1.5 s)
const MUSIC_FADE = 45;
const MUSIC_PEAK = 0.40;

const musicVolume = (frame: number): number => {
  if (frame < MUSIC_FADE) {
    return interpolate(frame, [0, MUSIC_FADE], [0, MUSIC_PEAK], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  }
  if (frame > TOTAL_FRAMES - MUSIC_FADE) {
    return interpolate(
      frame,
      [TOTAL_FRAMES - MUSIC_FADE, TOTAL_FRAMES],
      [MUSIC_PEAK, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );
  }
  return MUSIC_PEAK;
};

export const AkaveExplainer = () => {
  return (
    <>
      {/* Background music — subtle underscore, leaves room for VO */}
      <Audio
        src={staticFile("music/akave-track.mp3.mp3")}
        volume={musicVolume}
      />

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

        {/* Scene 4 — Product Proof (follows directly from pain) */}
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
    </>
  );
};

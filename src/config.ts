// ================================================================
// AKAVE EXPLAINER — CENTRAL CONFIG
// All copy, colors, and timing lives here for easy editing.
// ================================================================

// ---- Brand colors -----------------------------------------------
export const COLORS = {
  bg: "#020038",                        // Primary navy background
  accent: "#001999",                    // Accent blue (tile fills)
  highlight: "#B0E5FF",                 // Light blue (data, proof)
  pain: "#E45E5A",                      // Pain / cost red
  painSoft: "#FECCCA",                  // Soft pain fill
  white: "#FFFFFF",
  whiteDim: "rgba(255,255,255,0.55)",
  accentLight: "rgba(0,25,153,0.4)",
  strokeDim: "rgba(176,229,255,0.22)",
} as const;

// ---- Scene durations (frames at 30 fps) -------------------------
// Edit these numbers to adjust how long each scene holds on screen.
export const FPS = 30;

export const SCENE_FRAMES = {
  s1: 135,  // Scene 1 — Invisible Problem   (4.5 s)
  s2: 225,  // Scene 2 — Pain Escalation     (7.5 s)
  s3: 75,   // Scene 3 — Model Shift         (2.5 s)
  s4: 255,  // Scene 4 — Product Proof       (8.5 s)
  s5: 165,  // Scene 5 — Outcome Relief      (5.5 s)
  s6: 135,  // Scene 6 — Closing Promise     (4.5 s)
  s7: 60,   // Scene 7 — Brand End Card      (2.0 s)
} as const;

// Cross-fade duration between every scene pair
export const TRANSITION_FRAMES = 20;

// Total composition duration (auto-calculated; keep in sync with Root.tsx)
// = sum(SCENE_FRAMES) − 6 × TRANSITION_FRAMES  = 1050 − 120 = 930
export const TOTAL_FRAMES = 930;

// ---- VO copy — edit text here -----------------------------------
export const COPY = {
  scene1: {
    in: "You don't notice the problem\nwhen data goes in.",
    out: "You notice it\nwhen you need it back.",
  },
  scene2: {
    beat1: "The bill jumps.",
    beat2: "The audit turns into guesswork.",
    beat3: "And every exit gets taxed on the way out.",
  },
  scene3: {
    headline: "Akave changes the model.",
  },
  scene4: {
    price: "$14.99 / TB",
    egress: "Zero egress fees.",
    s3: "S3-compatible from day one.",
    proof: "A proof ledger you can verify yourself.",
  },
  scene5: {
    move: "Move data when you want.",
    cost: "Know the cost before the month begins.",
    proof: "Show what happened, with proof.",
  },
  scene6: {
    p1: "Predictable pricing.",
    p2: "Verifiable storage.",
    p3: "Exit on your terms.",
  },
  scene7: {
    brand: "Akave",
    tagline: "Predictable. Verifiable. Yours.",
  },
} as const;

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
  // s3 removed — Scene3.tsx kept in /scenes for reference
  s4: 256,  // Scene 4 — Product Introduction (8.5 s)
  s5: 195,  // Scene 5 — Outcome Relief      (6.5 s)
  s6: 165,  // Scene 6 — Closing Promise     (5.5 s)
  s7: 90,   // Scene 7 — Brand End Card      (3.0 s)
} as const;

// Cross-fade duration between every scene pair
export const TRANSITION_FRAMES = 20;

// Total composition duration (auto-calculated; keep in sync with Root.tsx)
// 6 scenes, 5 transitions:
// = (135+225+256+195+165+90) − 5 × 20  = 1066 − 100 = 966 frames (32.2 s)
export const TOTAL_FRAMES = 966;

// ---- VO copy — edit text here -----------------------------------
// Every string that appears on screen lives in this object.
// No user-visible text should be hardcoded inside scene files.
export const COPY = {
  scene1: {
    // \n sets a controlled line break — Scene 1 uses split("\n") to render
    in: "You don't notice the problem when you move data in.",
    out: "You notice it when you move data out of the cloud.",
  },
  scene2: {
    // Beat headlines (VO lines)
    // \n in beat1 prevents canvas overflow at 68px — Scene2 uses whiteSpace: pre-line
    beat1: "Your cloud bill jumps\nwhen you need data back.",
    beat2: "The audit turns into guesswork.",
    // \n forces a clean 2-line break at 68px
    beat3: "And every exit gets taxed\non the way out.",
    // Invoice card labels
    invoiceLabel: "INVOICE",
    storageLabel: "Storage",
    egressLabel: "+ Egress ↑",
    // Ledger annotation
    missingProof: "missing proof",
  },
  scene3: {
    headline: "Akave Cloud changes the model.",
  },
  scene4: {
    // Beat headlines (VO lines) — four beats
    meet: "Meet Akave Cloud",
    egress: "Zero egress fees.",
    savings: "Save up to 80% vs. hyperscalers.",
    freedom: "Move data as often as you want.",
    // Sub-labels beneath each beat diagram
    egressSub: "Move out. No charge.",
    savingsSub: "Compared to AWS S3, GCP, Azure.",
    freedomSub: "Any time. Any frequency.",
  },
  scene5: {
    // Beat headlines (VO lines)
    move: "Move data when you want.",
    cost: "Predictable pricing.",
    proof: "Verifiable object storage.",
    // Price display in the cost beat
    costPrice: "$14.99",
    costUnit: "/ TB / month",
  },
  scene6: {
    p1: "Run AI without lock-in.",
    p2: "Save up 80%.",
    p3: "Own your data.",
  },
  scene7: {
    brand: "Akave Cloud",
    tagline: "The AI-Ready Sovereign Cloud.",
  },

  // ---- Standalone concept compositions ------------------------
  // Copy for demo compositions (separate from main explainer).
  // Both concepts also reuse COPY.scene7.brand for the end card.
  concept1: {
    headline: "Sovereign Storage,\nPredictable Pricing",
    priceSub: "Flat rate. No egress fees.",
  },
  concept8: {
    // Individual price parts — each animates in separately
    priceDollar: "$",
    priceWhole: "14",
    priceDot: ".",
    priceCents: "99",
    priceUnit: "/ TB",
    sub: "Flat rate. No surprises. No egress fees.",
  },
} as const;

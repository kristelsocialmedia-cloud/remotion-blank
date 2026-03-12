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
  s4: 255,  // Scene 4 — Product Proof       (8.5 s)
  s5: 165,  // Scene 5 — Outcome Relief      (5.5 s)
  s6: 135,  // Scene 6 — Closing Promise     (4.5 s)
  s7: 60,   // Scene 7 — Brand End Card      (2.0 s)
} as const;

// Cross-fade duration between every scene pair
export const TRANSITION_FRAMES = 20;

// Total composition duration (auto-calculated; keep in sync with Root.tsx)
// 6 scenes, 5 transitions:
// = (135+225+255+165+135+60) − 5 × 20  = 975 − 100 = 875 frames (29.2 s)
export const TOTAL_FRAMES = 875;

// ---- VO copy — edit text here -----------------------------------
// Every string that appears on screen lives in this object.
// No user-visible text should be hardcoded inside scene files.
export const COPY = {
  scene1: {
    // \n sets a controlled line break — Scene 1 uses split("\n") to render
    in: "You don't notice the problem\nwhen data goes in the cloud.",
    out: "You notice it\nwhen you need it back.",
  },
  scene2: {
    // Beat headlines (VO lines)
    // \n in beat1 prevents canvas overflow at 58px — Scene2 uses whiteSpace: pre-line
    beat1: "Your cloud bill jumps\nwhen you need data back.",
    beat2: "The audit turns into guesswork.",
    beat3: "And every exit gets taxed on the way out.",
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
    // Beat headlines (VO lines)
    price: "$14.99 / TB",
    egress: "Zero egress fees.",
    s3: "S3-compatible from day one.",
    proof: "Verifiable storage you can verify yourself.",
    // Sub-labels beneath each beat diagram
    priceSub: "Flat rate. No surprises.",
    egressSub: "Move out. No charge.",
    s3Badge: "S3",              // text inside the S3 badge
    s3Sub: "Drop-in compatible.",
    proofVerifying: "Verifying...",
    proofVerified: "✓ Verified",
    // Numeric target used for the price count-down animation
    priceTarget: 14.99,
    priceUnit: "/ TB",
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
    p2: "Own your data.",
    p3: "A modern S3-Compatible object storage.",
  },
  scene7: {
    brand: "Akave Cloud",
    tagline: "The Al-Ready Sovereign Cloud.",
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

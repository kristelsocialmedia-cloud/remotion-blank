# Claude Code – Client Workspace

Multi-client creative production workspace managed with Claude Code.

## Structure

```
clients/
  akave/
    remotion/       ← Remotion video project (React, TypeScript)
    references/     ← Brand guides, research, source docs
    assets/         ← Logos, fonts, images, audio
    copy/           ← Scripts, headlines, body copy
    strategy/       ← Briefs, decks, positioning docs
    deliverables/   ← Final approved outputs
  send/             ← Future client (same structure)
  hyatt/            ← Future client (same structure)

shared/
  templates/        ← Reusable Remotion/design templates
  prompts/          ← Claude prompts for recurring tasks
  scripts/          ← Shared utility scripts (PDF extraction, etc.)
```

## Getting Started – Akave Remotion Project

```bash
cd clients/akave/remotion
npm install        # first time only
npm run dev        # open Remotion Studio
npm run render:explainer
```

## Adding a New Client

1. `mkdir -p clients/<name>/{remotion,copy,strategy,assets,references,deliverables}`
2. Scaffold the Remotion project if needed: `npx create-video@latest`
3. Drop brand assets into `clients/<name>/references/`

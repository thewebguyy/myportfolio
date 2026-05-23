# Design Tokens: Portfolio 2026

This document specifies the canonical design tokens for the portfolio rewrite.

## 1. Canonical Color Palette

| Token | Hex Value | Usage |
|---|---|---|
| `background` | `#020816` | Deep navy/black base for all pages |
| `surface` | `#0a1124` | Slightly lighter navy for cards, panes, nav |
| `surface-2` | `#111a32` | Border/highlight navy for cards and active states |
| `text-primary` | `#ffffff` | Primary text (headings, active nav) |
| `text-secondary` | `#94a3b8` | Slate-400 for secondary text and descriptions |
| `text-muted` | `#475569` | Slate-600 for timestamps, subtle metadata |
| `text-accent` | `#3A7BD5` | The blue accent (for brackets, system labels) |
| `border-wire` | `rgba(255, 255, 255, 0.1)` | Low-contrast borders mapping out layout |
| `primary` | `#3A7BD5` | Core brand blue |
| `primary-light` | `#5b95e8` | Hover state for primary buttons |
| `secondary` | `#f59e0b` | Amber/gold for high contrast CTAs |
| `secondary-light` | `#fbbf24` | Hover state for secondary buttons |

## 2. Typography Scale

- **Display**: Serif (`Cormorant`), `64px-96px`, tight tracking, leading `1.0`. Used for hero headers.
- **H1**: Serif, `48px-64px`, leading `1.1`.
- **H2**: Serif, `36px-48px`, leading `1.15`. Used for section headers.
- **H3**: Serif, `28px-32px`, leading `1.2`. Used for card titles.
- **Body / p**: Mono/Sans, `14px`, leading `1.7`, `text-primary`. Used for prose and descriptions.
- **Small**: Mono, `12px`, leading `1.5`, `text-primary/70`. Used for fine print, disclaimers.
- **Label**: Mono, uppercase, `11px`, tracking `0.1em`, `text-accent`. Used for small system markers and overlines.

## 3. Utility Component Classes

These are defined in `globals.css` under `@layer components`:

- `.btn-primary`: High-contrast solid button (`bg-primary text-white font-semibold rounded`).
- `.btn-secondary`: Outline or secondary color button (`bg-secondary text-background font-semibold rounded`).
- `.pill-tag`: Small mono uppercase tag (`bg-surface border border-border-wire rounded-full`).
- `.glass`: Translucent pane (`bg-surface/50 backdrop-blur-md border border-border-wire rounded-xl`).
- `.gradient-text`: Text with linear gradient background (`text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary`).
- `.section-padding`: Standardized vertical padding `py-24 lg:py-32 px-6 lg:px-8`.
- `.container-grid`: `max-w-[1440px] mx-auto w-full grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-0 border-x border-border-wire`.

## 4. Swatch Grid

*(Visual reference screenshot pending built-in browser capture of the styled components)*

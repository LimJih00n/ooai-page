# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LabA (fathermarine-research-platform) is a Next.js 15 marketing/demo website showcasing AI-powered research automation platform for Korean academic laboratories. The site features interactive demos simulating multi-agent AI workflows, Docker reproducibility, and human-in-the-loop research processes.

## Commands

```bash
npm run dev      # Development server with Turbopack (port 3000)
npm run build    # Production build with Turbopack
npm run lint     # ESLint check
npm run start    # Start production server
```

## Architecture

### Directory Structure
```
app/                    # Next.js App Router pages
├── page.tsx           # Main landing page
├── layout.tsx         # Root layout with Geist fonts
├── demo/              # Demo pages for various features
│   ├── page.tsx                 # Basic AI agent demo
│   ├── multi-agent/             # LangGraph multi-agent demo
│   ├── hybrid-ai-workflow/      # Hybrid AI (Jeni + Exaone + Specialist)
│   ├── docker-reproducibility/  # Docker container demo
│   ├── human-loop/              # Human-in-the-loop demo
│   └── auto-report/             # Auto report generation demo
components/
├── ui/                # shadcn/ui base components (Button, Card, Badge, etc.)
├── diagrams/          # Landing page visualization components
│   ├── DemoShowcase.tsx              # Demo hub with all demo links
│   ├── InteractiveFeatureShowcase.tsx # Feature exploration
│   ├── ResearchProcessComparison.tsx  # Before/after comparison
│   ├── SolutionsOverview.tsx         # Three-pillar tech overview
│   └── TechStackArchitecture.tsx     # 5-layer architecture diagram
└── demo/              # Demo page components
    ├── DemoContainer.tsx             # Basic demo wrapper
    ├── docker/                       # Docker demo components
    ├── hybrid/                       # Hybrid AI demo components
    ├── multi-agent/                  # Multi-agent demo components
    ├── auto-report/                  # Report generation demo
    └── human-loop/                   # Human-in-the-loop demo
lib/
└── utils.ts           # cn() utility for Tailwind class merging
```

### Key Patterns

**UI Components**: Built with shadcn/ui pattern using class-variance-authority (cva) for variants. Custom variants include `research` and `research-outline` for branded buttons.

**Animations**: Framer Motion is used throughout for page transitions and interactive elements. Common patterns:
- Entry animations: `initial={{ opacity: 0, y: 20 }}` with staggered delays
- Hover effects: `whileHover={{ scale: 1.05 }}`

**Styling**: Tailwind CSS with custom glass effect and gradient utilities defined in `globals.css`. Path alias `@/*` maps to project root.

**Demo Simulations**: All demos are client-side simulations (not real AI calls). They use `useState` and `useEffect` with `setTimeout`/`setInterval` to animate step-by-step processes.

### Tech Stack
- Next.js 15.5 with App Router and Turbopack
- React 19
- TypeScript (strict mode)
- Tailwind CSS 3.4
- Framer Motion for animations
- Recharts for data visualization
- Lucide React and React Icons for icons
- Radix UI primitives (Progress, Slot)

## Language

The UI content is in Korean. Code comments should remain in English.

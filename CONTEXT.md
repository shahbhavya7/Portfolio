# Project Context — Bhavya Shah Portfolio

## Owner
Bhavya Shah | AI & Data Science, MIT-WPU | bhavyshah.work@gmail.com | github.com/shahbhavya7

## Project
Ultra-modern portfolio site. Next.js 14 (App Router) + React Three Fiber + GSAP + Framer Motion + Lenis + Tailwind.
Design concept: "Neural Gravity" — liquid glass panels floating in 3D space, AI/CS native aesthetic.

## Design Tokens
- Background: #050508 (void)
- Primary accent: #6E3AFA (plasma/violet)
- Secondary: #00D4FF (flux/cyan)
- Highlight: #FF4D6D (heat — rare)
- Code accent: #A0FF6F (neural green)
- Text: #F0EEF8 / muted: #6B6880
- Glass surface: rgba(255,255,255,0.04) + border rgba(255,255,255,0.12) + blur(24px)

## Fonts
- Display: Syne (headings)
- Body: Inter
- Mono: JetBrains Mono

## Sections (in order)
- Hero: 3D neural particle mesh (R3F), glass title card, GSAP intro
- About: glassmorphic card, 3D tilt hover
- Skills: 3D orbiting nodes (R3F)
- Projects: glassmorphic tilt cards
- Research: timeline + Springer publication card
- Experience: vertical timeline
- Contact: glass terminal aesthetic

## Completed
- [x] Scaffolding (layout, tokens, globals, Lenis, folder structure)
- [x] Hero
- [x] Nav
- [x] About
- [ ] Skills
- [ ] Projects
- [ ] Research + Experience
- [ ] Contact + Footer
- [ ] Polish (bloom, postprocessing, mobile)

## Key Rules
- NO SSR for any Three.js/R3F component — always dynamic() with ssr:false
- Glass utility class: .glass-panel in globals.css
- All sections get id= attributes for scroll-spy nav
- No em dashes anywhere in copy
- Cars are Bhavya's personal signature — can be referenced subtly in about/contact copy

## Current Status
Performance pass complete. Neural mesh: 60 nodes, 30fps cap, no postprocessing.
CSS animations: GPU only, reduced count. Lenis: rAF loop. GSAP: context cleanup.
Site should run smoothly now.
Next: Prompt 5 - Skills section.

## Color Hierarchy Note
Cyan (#00D4FF / flux) is the primary visual color. Plasma/violet (#6E3AFA) is accent only. All gradients lead with cyan.

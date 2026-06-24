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

## Key Rules
- NO SSR for any Three.js/R3F component — always dynamic() with ssr:false
- Glass utility class: .glass-panel in globals.css
- All sections get id= attributes for scroll-spy nav
- No em dashes anywhere in copy
- Cars are Bhavya's personal signature — can be referenced subtly in about/contact copy

## Color Hierarchy Note
Cyan (#00D4FF / flux) is the primary visual color. Plasma/violet (#6E3AFA) is accent only. All gradients lead with cyan.

## Current Status
SITE COMPLETE.
All 8 sections built and polished:
Hero, About, Skills, Projects, Research, 
Experience, Contact, Footer.

Final additions:
- Loader screen (1.8s, status cycling)
- Custom cursor dot with hover expand
- Back to top button
- Global consistency: spacing, fades, fonts
- SEO metadata complete
- Performance: dynamic imports, no console.log,
  reduce motion, key props audit

Ready for deployment on Vercel.
To deploy: push to GitHub, connect repo on vercel.com,
set framework to Next.js, deploy.

To add content later:
- New project: add object to PROJECTS array 
  in Projects.tsx
- New experience: add object to EXPERIENCES array 
  in Experience.tsx
- New paper: add object to RESEARCH_ITEMS array 
  in Research.tsx

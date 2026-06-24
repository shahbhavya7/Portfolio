Read CONTEXT.md first. Build three new sections: Skills, Projects, 
and Research. All three must be data-driven — content lives in 
config arrays at the top of each component file so adding new items 
later requires only editing the data array, not the JSX layout.

The site uses: Syne (headings), JetBrains Mono (labels/code),
Inter (body). Colors: --cyan: #00D4FF, --violet: #6E3AFA,
--bg: #050508, --surface: rgba(255,255,255,0.03), 
--text-primary: #F0EEF8, --text-muted: rgba(160,150,190,0.7).
.glass-panel = backdrop-filter blur(12px), 
background rgba(255,255,255,0.04), border 1px solid rgba(255,255,255,0.08).
Lenis smooth scroll is active. GSAP + ScrollTrigger available.

==============================================================
## SECTION A — SKILLS
## File: components/sections/Skills.tsx
==============================================================

### DATA ARRAY (at top of file, outside component):

const SKILL_CATEGORIES = [
  {
    id: "genai",
    label: "GenAI & LLMs",
    icon: "◈",
    color: "#00D4FF",
    skills: [
      { name: "LangChain", level: 90 },
      { name: "RAG Pipelines", level: 92 },
      { name: "LLaMA / Gemini API", level: 85 },
      { name: "RAGAS Evaluation", level: 82 },
      { name: "FAISS / pgvector", level: 88 },
      { name: "HuggingFace", level: 80 },
    ],
  },
  {
    id: "ml",
    label: "Machine Learning",
    icon: "◇",
    color: "#6E3AFA",
    skills: [
      { name: "Scikit-learn", level: 88 },
      { name: "TensorFlow / Keras", level: 82 },
      { name: "Feature Engineering", level: 85 },
      { name: "Model Evaluation", level: 87 },
      { name: "Deep Learning", level: 78 },
      { name: "PyTorch", level: 70 },
    ],
  },
  {
    id: "backend",
    label: "Backend & APIs",
    icon: "◉",
    color: "#A0FF6F",
    skills: [
      { name: "FastAPI", level: 88 },
      { name: "Node.js / Express", level: 80 },
      { name: "Flask", level: 85 },
      { name: "REST API Design", level: 87 },
      { name: "JWT Auth", level: 78 },
      { name: "gRPC", level: 72 },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    icon: "◫",
    color: "#FF6B9D",
    skills: [
      { name: "React / Next.js", level: 82 },
      { name: "TypeScript", level: 78 },
      { name: "Tailwind CSS", level: 85 },
      { name: "Three.js / R3F", level: 68 },
      { name: "Framer Motion", level: 72 },
      { name: "GSAP", level: 70 },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    icon: "◰",
    color: "#FFB347",
    skills: [
      { name: "PostgreSQL (pgvector)", level: 87 },
      { name: "MongoDB", level: 78 },
      { name: "MySQL", level: 82 },
      { name: "Supabase", level: 80 },
      { name: "Firebase Firestore", level: 75 },
      { name: "Neon DB", level: 72 },
    ],
  },
  {
    id: "langs",
    label: "Languages",
    icon: "◑",
    color: "#00D4FF",
    skills: [
      { name: "Python", level: 93 },
      { name: "JavaScript", level: 85 },
      { name: "Java", level: 80 },
      { name: "TypeScript", level: 78 },
      { name: "C / C++", level: 72 },
      { name: "SQL", level: 85 },
    ],
  },
];

---

### SECTION WRAPPER:
id="skills"
min-height: 100vh
padding: 120px 0
position: relative
overflow: hidden

Background: a diagonal grid (not the same as about's grid):
  background-image: 
    linear-gradient(45deg, rgba(110,58,250,0.03) 1px, transparent 1px),
    linear-gradient(-45deg, rgba(0,212,255,0.03) 1px, transparent 1px)
  background-size: 64px 64px
  Fade at edges with radial mask: same pattern as About.

---

### LAYOUT:

Max-width 1280px wrapper, margin auto, padding 0 48px.

1. SECTION HEADER (centered, margin-bottom 80px):
   Eyebrow: JetBrains Mono 10px, #00D4FF, uppercase, 
   letter-spacing 0.2em — "002 / SKILLS"
   
   Heading: Syne 800, clamp(40px, 5vw, 64px), #F0EEF8,
   line-height 1.1 — "What I build with."
   
   Subtext: Inter 16px, rgba(160,150,190,0.7), max-width 480px,
   margin 16px auto 0 —
   "From neural nets to distributed systems — 
   the full stack I use to ship things."

2. CATEGORY TABS ROW (below header, margin-bottom 48px):
   Horizontally scrollable row (overflow-x: auto, scrollbar hidden).
   flex row, gap 12px, justify-content center.
   
   Each tab button:
     padding: 10px 20px
     border-radius: 40px
     border: 1px solid rgba(255,255,255,0.08)
     background: rgba(255,255,255,0.03)
     JetBrains Mono 11px, color rgba(240,238,248,0.6)
     cursor: pointer
     transition: all 0.2s ease
     
   ACTIVE tab:
     background: rgba(0,212,255,0.1)
     border-color: rgba(0,212,255,0.4)
     color: #00D4FF
     box-shadow: 0 0 16px rgba(0,212,255,0.15)
   
   Each tab shows: icon + " " + label from SKILL_CATEGORIES
   
   Default active tab: "genai" (first one).
   
   State: useState to track activeCategory (string id).
   Clicking a tab sets the active category.

3. SKILL CARDS GRID (below tabs):
   Render ONLY the skills array of the active category.
   
   Layout:
     display: grid
     grid-template-columns: repeat(3, 1fr)
     gap: 16px
     
     (On tablet ≤ 1024px: repeat(2, 1fr))
     (On mobile ≤ 768px: repeat(1, 1fr))
   
   Each skill card:
     .glass-panel
     padding: 20px 24px
     border-radius: 10px
     position: relative
     overflow: hidden
     border: 1px solid rgba(255,255,255,0.06)
     transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s
     
     On hover:
       border-color: rgba of active category color at 0.3 opacity
       transform: translateY(-2px)
       box-shadow: 0 8px 32px rgba of active category color at 0.08
   
   Card inner layout (flex column, gap 12px):
   
   A) TOP ROW: flex, justify-between, align-items center
      Left: skill name — JetBrains Mono 13px, #F0EEF8
      Right: percentage — JetBrains Mono 11px, 
             color = active category color, opacity 0.8
   
   B) PROGRESS BAR:
      Track: height 3px, background rgba(255,255,255,0.06),
             border-radius 2px, width 100%, overflow hidden
      
      Fill: height 100%, border-radius 2px
            background: linear-gradient(90deg, 
              [category color] 0%, 
              [category color] + 40deg hue shifted 100%)
            width = skill.level% (animated on mount)
      
      On category switch and on mount, animate bar width 
      from 0 to skill.level using CSS transition:
        transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1)
        Add a small delay per card: nth-child * 0.05s stagger
      
      To trigger: use a useEffect + requestAnimationFrame to 
      set width to 0, then 1 frame later set to skill.level%.
      Store width in a state object keyed by skill name.
      Re-trigger on activeCategory change.
   
   C) DECORATIVE CORNER DOT (position absolute):
      top: 16px, right: 16px
      8px circle
      background: category color
      opacity: 0.15
      border-radius: 50%

4. CATEGORY SWITCH ANIMATION:
   When switching tabs, the grid should:
   - Fade out (opacity 0, y: 10px) over 150ms
   - Swap category
   - Fade in (opacity 1, y: 0) over 250ms
   Use CSS transition on a wrapper div with key or state change.
   Simplest: use a boolean isTransitioning state.
   On tab click: setIsTransitioning(true), setTimeout 150ms, 
   setActiveCategory, setIsTransitioning(false), re-trigger bars.

---

### SCROLL ANIMATION (IntersectionObserver, fires once):
Section header: y: 40 → 0, opacity: 0 → 1, 0.8s, ease-out.
Tab row: y: 20 → 0, opacity: 0 → 1, delay 0.2s.
Grid: stagger each card y: 30 → 0, opacity: 0 → 1, 
  0.05s per card delay, starting at 0.3s.

---

### RESPONSIVE:
≤ 1024px: grid-template-columns repeat(2, 1fr)
≤ 768px:  grid-template-columns repeat(1, 1fr)
          max-width wrapper: padding 0 24px
          Section heading: clamp(32px, 8vw, 48px)
≤ 480px:  Tab row: justify-content flex-start (left-align, scrollable)

==============================================================
## SECTION B — PROJECTS
## File: components/sections/Projects.tsx
==============================================================

### DATA ARRAY (at top of file, outside component):

const PROJECTS = [
  {
    id: "helix",
    title: "Helix",
    subtitle: "Live Fleet Intelligence",
    description: "Real-time distributed fleet monitoring with SIEM 
      threat detection. Tri-protocol Java server (gRPC, REST, WebSocket) 
      ingesting cross-platform telemetry with sub-second latency and 
      severity-classified alerts under 2 seconds.",
    tags: ["Java", "gRPC", "WebSocket", "Protobuf", "Azure", "SIEM"],
    highlight: "Sub-second telemetry · Deployed on Azure · SIEM threat scoring",
    category: "SYSTEMS",
    categoryColor: "#A0FF6F",
    github: "https://github.com/shahbhavya7/Helix",
    featured: true,
  },
  {
    id: "contractiq",
    title: "ContractIQ",
    subtitle: "Intelligent Contract Analysis Tool",
    description: "RAG pipeline using Groq LLaMA 3.3 and LangChain 
      for automated contract analysis. pgvector-backed semantic search 
      with RAGAS-evaluated retrieval quality and synthetic testset generation.",
    tags: ["Python", "LangChain", "FastAPI", "pgvector", "RAGAS", "LLaMA 3.3"],
    highlight: "RAG + pgvector · RAGAS evaluation · Multi-doc reasoning",
    category: "GENAI",
    categoryColor: "#00D4FF",
    github: "https://github.com/shahbhavya7/ContractIQ",
    featured: true,
  },
  {
    id: "globaldigest",
    title: "Global Digest",
    subtitle: "AI News Aggregator",
    description: "Multi-agent system using Gemini for automated 
      content aggregation and summarization. Serverless Neon DB with 
      custom ranking algorithm and end-to-end pipeline deploying 
      daily HTML digests via SMTP.",
    tags: ["Python", "Gemini", "LangChain", "Neon DB", "SQLAlchemy", "Pydantic"],
    highlight: "Multi-agent · Daily digest automation · Serverless DB",
    category: "GENAI",
    categoryColor: "#00D4FF",
    github: "https://github.com/shahbhavya7/Global_Digest",
    featured: true,
  },
  {
    id: "researchpilot",
    title: "Research Pilot AI",
    subtitle: "RAG Research Assistant",
    description: "RAG pipeline using Gemini and FAISS to synthesize 
      and compare multiple academic papers. Automated extraction of 
      datasets and metrics into structured methodology analysis tables. 
      State-aware Streamlit workspace.",
    tags: ["Python", "Gemini", "LangChain", "FAISS", "Streamlit"],
    highlight: "Multi-paper RAG · Auto methodology tables · Literature review",
    category: "GENAI",
    categoryColor: "#00D4FF",
    github: "https://github.com/shahbhavya7/ResearchPilot_AI",
    featured: false,
  },
  {
    id: "ace360",
    title: "Ace 360",
    subtitle: "AI Career Coach",
    description: "Serverless workflow engine delivering role-specific 
      AI interview sessions with under 1.8s prompt-to-response. Resume 
      generation with Neon DB hydration producing ATS-formatted output 
      in under 3 seconds. Served 100+ beta users.",
    tags: ["Next.js", "Gemini API", "Neon DB", "Prisma", "Inngest", "Tailwind"],
    highlight: "1.8s P2R latency · ATS resume gen · 100+ beta users",
    category: "FULLSTACK",
    categoryColor: "#FF6B9D",
    github: "https://github.com/shahbhavya7/Ace_360",
    featured: false,
  },
  {
    id: "resona",
    title: "Resona",
    subtitle: "Intelligent Audio Analysis",
    description: "Dynamic deep learning platform for audio analysis 
      with real-time visualizations. Combines signal processing with 
      neural network classification and interactive waveform displays.",
    tags: ["Python", "TensorFlow", "Streamlit", "Deep Learning"],
    highlight: "Audio ML · Real-time viz · DL classification",
    category: "ML",
    categoryColor: "#6E3AFA",
    github: "https://github.com/shahbhavya7/Resona",
    featured: false,
  },
];

---

### SECTION WRAPPER:
id="projects"
min-height: 100vh
padding: 120px 0
position: relative
overflow: hidden

No background pattern — clean dark. One subtle glow:
  position: absolute
  width: 600px, height: 600px
  border-radius: 50%
  background: radial-gradient(circle, rgba(110,58,250,0.04) 0%, transparent 70%)
  top: 20%, left: -200px
  pointer-events: none, z-index: 0

---

### LAYOUT:

Max-width 1280px wrapper, margin auto, padding 0 48px, 
position relative, z-index 1.

1. SECTION HEADER (margin-bottom 64px):
   Left-aligned (not centered, different from Skills).
   
   Eyebrow: JetBrains Mono 10px, #6E3AFA, uppercase,
   letter-spacing 0.2em — "003 / PROJECTS"
   
   Heading: Syne 800, clamp(40px, 5vw, 64px), #F0EEF8,
   line-height 1.1 — "Things I've shipped."
   
   Right side of header row: a small GitHub link button
   (only visible on desktop ≥ 768px):
     flex, gap 8px, align-items center
     href: https://github.com/shahbhavya7
     JetBrains Mono 11px, #00D4FF, opacity 0.7
     border: 1px solid rgba(0,212,255,0.2)
     padding: 8px 16px, border-radius: 6px
     Text: "⌥ View all repos"
     Hover: opacity 1, border-color rgba(0,212,255,0.5)
   
   Header wrapper: display flex, justify-content space-between,
   align-items flex-end.

2. FILTER TABS (below header, margin-bottom 48px):
   State: useState activeFilter, default "ALL"
   Filters: "ALL", "GENAI", "SYSTEMS", "FULLSTACK", "ML"
   
   Each tab:
     Same style as Skills tabs above.
     When active, use the categoryColor of matching projects 
     for the tab glow (or cyan for "ALL").
   
   Filter logic:
     "ALL" shows all PROJECTS
     Others filter by project.category === activeFilter

3. PROJECTS GRID:
   
   HOW TO SPLIT:
   - Featured projects (featured: true) render first as 
     "large" cards spanning full columns.
   - Non-featured render as "small" cards.
   
   Grid layout when filter is "ALL":
     First 3 projects → display as "featured" grid:
       display: grid
       grid-template-columns: 1fr 1fr
       gap: 24px
       
       Card 0 (Helix) → spans 2 columns (grid-column: 1 / -1)
         height: 320px, landscape card
       Cards 1+2 (ContractIQ, GlobalDigest) → each 1fr
         height: 280px
     
     Remaining projects 3-5 → "small" grid below:
       margin-top: 24px
       grid-template-columns: repeat(3, 1fr)
       gap: 24px
       height: 240px each
   
   When a filter is active (not ALL):
     All matching projects show in equal grid:
       grid-template-columns: repeat(2, 1fr)
       (if only 1 result: 1fr)
       height: 280px each

4. LARGE CARD DESIGN (featured horizontal card):

   position: relative, overflow: hidden
   .glass-panel, border-radius: 12px
   border: 1px solid rgba(255,255,255,0.08)
   padding: 40px 48px
   height: 100% (fills grid area)
   display: flex, flex-direction: column, justify-content: space-between
   cursor: pointer
   transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s
   
   On hover:
     border-color: rgba of project.categoryColor at 0.3
     box-shadow: 0 16px 64px rgba of project.categoryColor at 0.08
     transform: translateY(-3px)
   
   Background noise texture on hover (::before):
     position: absolute, inset: 0
     background: radial-gradient(ellipse 60% 50% at 70% 50%,
       rgba of project.categoryColor at 0.05, transparent 70%)
     opacity: 0, transition: opacity 0.3s
     On hover: opacity 1
   
   TOP SECTION:
     display: flex, justify-content: space-between, align-items: flex-start
     gap: 24px
     
     Left:
       Category badge:
         display: inline-flex, gap: 6px, align-items: center
         JetBrains Mono 9px, letter-spacing 0.15em, uppercase
         color: project.categoryColor
         margin-bottom: 16px
         Before badge: 6px colored dot (same color)
       
       Title: Syne 700, 28px, #F0EEF8
       Subtitle: JetBrains Mono 12px, rgba(160,150,190,0.6), 
                 margin-top 4px
       
       Description: Inter 14px, rgba(160,150,190,0.75), 
                    line-height 1.7, margin-top 16px
                    max-width: 600px (for the wide card)
     
     Right (only on wide card ≥ 2-col span):
       A large decorative ASCII/code block:
         position: relative, flex-shrink: 0
         width: 180px
         font-family: JetBrains Mono, font-size: 10px
         color: rgba(0,212,255,0.15)
         line-height: 1.6
         user-select: none
         Display 8-10 lines of fake code/metrics relevant to project.
         
         For Helix show:
           gRPC  ██████████ 9090
           REST  ████████░░ 8080  
           WS    ███████░░░ 8081
           CPU   █████░░░░░ 67%
           ALERT ██░░░░░░░░ WARN
         
         For ContractIQ show:
           CHUNK ██████████ 512t
           EMBED ████████░░ 1536d
           SIM   ███████░░░ 0.91
           EVAL  █████░░░░░ RAGAS
           RANK  ██░░░░░░░░ MMR
   
   BOTTOM SECTION:
     display: flex, justify-content: space-between, align-items: center
     margin-top: auto, padding-top: 24px
     
     Left: TAGS ROW
       display: flex, flex-wrap: wrap, gap: 8px
       Each tag:
         JetBrains Mono 10px
         padding: 4px 10px
         border-radius: 4px
         background: rgba(255,255,255,0.04)
         border: 1px solid rgba(255,255,255,0.08)
         color: rgba(240,238,248,0.6)
         transition: border-color 0.15s, color 0.15s
         On card hover (inherit): border-color categoryColor 0.25 opacity
     
     Right: highlight text + GitHub icon
       Highlight: JetBrains Mono 10px, rgba(160,150,190,0.5),
                  max-width 240px, text-align right
       GitHub link: "↗ GitHub" 
                    JetBrains Mono 11px, #00D4FF, opacity 0.7
                    margin-top 8px
                    href: project.github
                    target="_blank", rel="noopener noreferrer"
                    Stop propagation on click.
                    Hover: opacity 1

5. SMALL CARD DESIGN (non-featured cards):

   Same as large card but:
   - Simpler, no code block on right
   - No wide description, shorter (2 lines max via CSS -webkit-line-clamp: 2)
   - Padding: 28px 32px
   - Title: Syne 700, 20px
   - No split header, just top-to-bottom flex column
   - Bottom row same (tags + github link)

6. EMPTY STATE (if filter matches 0 projects):
   Center the grid area.
   JetBrains Mono 13px, rgba(160,150,190,0.4)
   "// no projects in this category yet"

7. TRANSITION between filter states:
   Same fade technique as Skills — isTransitioning state,
   opacity 0/1 with 150ms out + 250ms in.

---

### SCROLL ANIMATION (IntersectionObserver, fires once):
Section header: x: -40 → 0, opacity: 0 → 1, 0.7s.
Featured grid: y: 60 → 0, opacity: 0 → 1, 0.8s, delay 0.2s.
Small cards: stagger y: 40 → 0, opacity: 0 → 1, 0.1s per card.
Use GSAP ScrollTrigger with start: "top 75%".

---

### RESPONSIVE:
≤ 1024px:
  Featured grid: grid-template-columns 1fr (stack vertically)
  Card 0 (wide): grid-column auto (not spanning), height 280px
  Small grid: repeat(2, 1fr)

≤ 768px:
  ALL grids: 1fr
  padding: 0 24px
  Large card padding: 28px 24px
  Code block (right side): display none (hide on mobile)
  Description: 3 line clamp

≤ 480px:
  Small card height: auto (not fixed)
  Tags: wrap freely

==============================================================
## SECTION C — RESEARCH
## File: components/sections/Research.tsx
==============================================================

### DATA ARRAY (at top of file, outside component):

const RESEARCH_ITEMS = [
  {
    id: "mysql-paper",
    title: "Query Optimization: Techniques and Strategies for MySQL Performance Improvement",
    authors: ["Pranali Kosamkar", "Gautam Sharma", "Lakshya Upadhyaya", 
              "Bhavya Shah", "Samarth Patel"],
    myRole: "Co-Author",
    venue: "ICT Systems and Sustainability",
    publisher: "Springer",
    series: "Lecture Notes in Networks and Systems, Vol. 1645",
    date: "October 30, 2025",
    doi: "10.1007/978-3-032-06662-6_13",
    doiUrl: "https://doi.org/10.1007/978-3-032-06662-6_13",
    topics: ["MySQL", "Query Optimization", "Database Performance", 
             "Index Tuning", "Execution Plans"],
    type: "CONFERENCE",
    typeColor: "#00D4FF",
    abstract: "A systematic analysis of MySQL query optimization strategies 
      covering index design, execution plan analysis, and performance 
      benchmarking across enterprise-scale workloads.",
    status: "PUBLISHED",
  },
  // NEW ITEMS: add more objects here following the same shape.
  // To add a preprint, set type: "PREPRINT", typeColor: "#FFB347", status: "IN REVIEW"
  // To add a journal, set type: "JOURNAL", typeColor: "#A0FF6F", status: "PUBLISHED"
];

---

### SECTION WRAPPER:
id="research"
min-height: 60vh   ← (shorter than other sections, only 1 item for now)
padding: 120px 0
position: relative
overflow: hidden

Background:
  Faint horizontal scan line effect:
    repeating-linear-gradient(
      0deg,
      transparent 0px,
      transparent 39px,
      rgba(0,212,255,0.015) 40px
    )
  position: absolute, inset: 0, z-index: 0

---

### LAYOUT:

Max-width 1280px wrapper, margin auto, padding 0 48px,
position relative, z-index 1.

1. SECTION HEADER (margin-bottom 64px):
   Eyebrow: JetBrains Mono 10px, #A0FF6F, uppercase,
   letter-spacing 0.2em — "004 / RESEARCH"
   
   Heading: Syne 800, clamp(40px, 5vw, 64px), #F0EEF8 —
   "Published work."

2. RESEARCH CARDS (map over RESEARCH_ITEMS):
   Render one card per item.
   
   Card wrapper:
     .glass-panel
     border-radius: 12px
     padding: 40px 48px
     border: 1px solid rgba(255,255,255,0.08)
     margin-bottom: 20px
     position: relative
     overflow: hidden
     transition: border-color 0.25s, box-shadow 0.25s
     
     On hover:
       border-color: rgba of item.typeColor at 0.3
       box-shadow: 0 8px 48px rgba of item.typeColor at 0.06
   
   Background accent (position absolute):
     top: 0, right: 0
     width: 200px, height: 200px
     background: radial-gradient(circle at top right,
       rgba of item.typeColor at 0.04, transparent 60%)
     pointer-events: none
   
   Card layout: flex, gap 48px.
   
   LEFT COLUMN (flex-shrink 0, width 200px):
   
     Type badge:
       display: inline-flex, align-items center, gap 6px
       JetBrains Mono 9px, letter-spacing 0.15em, uppercase
       color: item.typeColor
       margin-bottom 20px
       6px dot before
     
     Status chip:
       padding: 6px 12px, border-radius 4px
       If PUBLISHED:
         background: rgba(160,255,111,0.08)
         border: 1px solid rgba(160,255,111,0.25)
         color: #A0FF6F
         JetBrains Mono 10px, uppercase
       If IN REVIEW:
         background: rgba(255,179,71,0.08)
         border: 1px solid rgba(255,179,71,0.25)
         color: #FFB347
       Text: "● " + item.status
       The dot pulses if status is "IN REVIEW":
         @keyframes soft-pulse: opacity 1→0.3→1, 2s infinite
     
     Below status, margin-top 24px:
       Publisher info stack:
         JetBrains Mono 10px, rgba(160,150,190,0.5), 
         line-height 1.8
         Display: item.publisher, item.venue, item.date
         Each on its own line, label + value format:
           "PUBLISHER" in #6B6880, value in #A09CB8
     
     DOI link (margin-top 16px):
       JetBrains Mono 10px, #00D4FF, opacity 0.7
       href: item.doiUrl, target blank
       Text: "DOI ↗"
       Hover: opacity 1, underline
   
   RIGHT COLUMN (flex: 1, min-width 0):
   
     TITLE: Syne 700, 22px, #F0EEF8, line-height 1.3
             margin-bottom 12px
     
     AUTHORS ROW (flex wrap, gap 8px, margin-bottom 20px):
       For each author in item.authors:
         If author === "Bhavya Shah":
           chip: JetBrains Mono 11px
                 background: rgba(0,212,255,0.1)
                 border: 1px solid rgba(0,212,255,0.3)
                 color: #00D4FF
                 padding: 4px 10px, border-radius: 4px
         Else:
           chip: JetBrains Mono 11px
                 background: rgba(255,255,255,0.03)
                 border: 1px solid rgba(255,255,255,0.07)
                 color: rgba(240,238,248,0.55)
                 padding: 4px 10px, border-radius: 4px
       
       My role badge (at the end of row):
         background: rgba(160,255,111,0.08)
         border: 1px solid rgba(160,255,111,0.2)
         color: #A0FF6F
         JetBrains Mono 10px, padding: 4px 10px
         Text: "// " + item.myRole
     
     ABSTRACT: Inter 14px, rgba(160,150,190,0.7),
               line-height 1.75, margin-bottom 24px
               Display item.abstract
     
     TOPICS row (flex wrap, gap 8px):
       Label: JetBrains Mono 9px, #6B6880, uppercase,
              letter-spacing 0.15em, margin-right 8px
              "KEYWORDS"
       Each topic:
         Same small chip style: JetBrains Mono 10px,
         background rgba(255,255,255,0.03),
         border rgba(255,255,255,0.07),
         color rgba(240,238,248,0.5)
         padding 3px 8px, border-radius 3px

3. BOTTOM CALLOUT (below all cards, margin-top 48px):
   A subtle centered CTA to encourage future additions.
   
   Flex row, gap 12px, align-items center, justify-content center.
   
   Dashed border box:
     border: 1px dashed rgba(255,255,255,0.08)
     border-radius: 8px
     padding: 24px 40px
     max-width: 480px, margin: 0 auto
     
     Text: JetBrains Mono 11px, rgba(160,150,190,0.4)
     "// more papers incoming · currently writing on LLM sycophancy"
     
     A small blinking cursor after the text:
       display inline-block, width 8px, height 14px
       background: #00D4FF, opacity 0.6
       vertical-align: bottom, margin-left 4px
       @keyframes cursor-blink: opacity 1→0→1, 1s step-end infinite

---

### SCROLL ANIMATION (IntersectionObserver, fires once):
Header: y: 40 → 0, opacity: 0 → 1, 0.7s.
Each research card: y: 50 → 0, opacity: 0 → 1, 0.7s, 
  stagger 0.15s per card.
Callout box: opacity: 0 → 1, 0.5s, delay 0.4s.

---

### RESPONSIVE:
≤ 1024px: Card layout → flex-direction column, gap 32px
           Left column → width auto, flex-direction row, 
           flex-wrap wrap, gap 24px
≤ 768px:  padding 0 24px, card padding 24px
          Title: 18px
          Left column: full width row layout
≤ 480px:  Authors row: allow 2-per-row via flex-wrap

==============================================================
## AFTER ALL THREE SECTIONS ARE BUILT
==============================================================

Import and add them to the main page in this order 
(in app/page.tsx or wherever sections are composed):
  <Hero />
  <About />
  <Skills />
  <Projects />
  <Research />

In Nav.tsx, add three new nav links:
  { label: "Skills", href: "#skills" }
  { label: "Projects", href: "#projects" }
  { label: "Research", href: "#research" }
Make sure the nav link click scrolls smoothly (Lenis handles this 
automatically if the hrefs match section IDs).

Update CONTEXT.md:
  "Prompt 5 complete.
  Skills section: 6 categories, tabbed, animated progress bars.
  Projects section: 6 pinned projects, filter by category, 
    featured/small card grid, data-driven.
  Research section: 1 published paper, fully extensible — 
    add items to RESEARCH_ITEMS array to extend.
  All sections: responsive, scroll-animated, dynamic data arrays.
  Next: Prompt 6 — Contact section + footer + final polish."
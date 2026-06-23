"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PROJECTS = [
  {
    id: "helix",
    title: "Helix",
    subtitle: "Live Fleet Intelligence",
    description: "Real-time distributed fleet monitoring with SIEM threat detection. Tri-protocol Java server (gRPC, REST, WebSocket) ingesting cross-platform telemetry with sub-second latency and severity-classified alerts under 2 seconds.",
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
    description: "RAG pipeline using Groq LLaMA 3.3 and LangChain for automated contract analysis. pgvector-backed semantic search with RAGAS-evaluated retrieval quality and synthetic testset generation.",
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
    description: "Multi-agent system using Gemini for automated content aggregation and summarization. Serverless Neon DB with custom ranking algorithm and end-to-end pipeline deploying daily HTML digests via SMTP.",
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
    description: "RAG pipeline using Gemini and FAISS to synthesize and compare multiple academic papers. Automated extraction of datasets and metrics into structured methodology analysis tables. State-aware Streamlit workspace.",
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
    description: "Serverless workflow engine delivering role-specific AI interview sessions with under 1.8s prompt-to-response. Resume generation with Neon DB hydration producing ATS-formatted output in under 3 seconds. Served 100+ beta users.",
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
    description: "Dynamic deep learning platform for audio analysis with real-time visualizations. Combines signal processing with neural network classification and interactive waveform displays.",
    tags: ["Python", "TensorFlow", "Streamlit", "Deep Learning"],
    highlight: "Audio ML · Real-time viz · DL classification",
    category: "ML",
    categoryColor: "#6E3AFA",
    github: "https://github.com/shahbhavya7/Resona",
    featured: false,
  },
];

const FILTERS = ["ALL", "GENAI", "SYSTEMS", "FULLSTACK", "ML"];

const ASCII_ART: Record<string, string[]> = {
  helix: [
    "gRPC  ██████████ 9090",
    "REST  ████████░░ 8080",
    "WS    ███████░░░ 8081",
    "CPU   █████░░░░░ 67%",
    "ALERT ██░░░░░░░░ WARN"
  ],
  contractiq: [
    "vector = [",
    "  0.892,  0.114,",
    " -0.034,  0.441,",
    "  0.551, -0.992",
    "] // sim: 0.94"
  ],
  globaldigest: [
    "> AGENT_1: Crawling...",
    "> AGENT_2: Summarizing",
    "> DB: Stored 42 items",
    "> SMTP: 250 Requested",
    "> status: DELIVERED"
  ],
  researchpilot: [
    "{",
    "  \"docs\": 54,",
    "  \"nodes\": 1240,",
    "  \"edges\": 4390",
    "} // RAG_OK"
  ],
  ace360: [
    "SYS: init_coach()",
    "USR: [audio_input]",
    "AI (1.8s): processing",
    "ATS_SCORE: 92/100",
    "[SESSION_CLOSED]"
  ],
  resona: [
    "Hz: 44100 | FFT: 1024",
    " ▂▃▅▇████▇▅▃▂ ",
    "  ▂▄▆████▆▄▂  ",
    "   ▃▅████▅▃   ",
    "    ▂▄▆▆▄▂    "
  ]
};

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredProjects = activeFilter === "ALL"
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeFilter);

  const getActiveFilterColor = () => {
    if (activeFilter === "ALL") return "#00D4FF";
    const matchingProj = PROJECTS.find(p => p.category === activeFilter);
    return matchingProj ? matchingProj.categoryColor : "#00D4FF";
  };

  const handleFilterClick = (filter: string) => {
    if (filter === activeFilter || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveFilter(filter);
      setIsTransitioning(false);
    }, 150);
  };

  // Scroll animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo("[data-anim='featured-grid']",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo("[data-anim='small-card']",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "[data-anim='small-grid']",
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen py-[120px] overflow-hidden bg-void"
    >
      {/* Background Glow */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, rgba(110,58,250,0.04) 0%, transparent 70%)",
          top: "20%",
          left: "-200px",
        }}
      />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-[64px] gap-6">
          <div className="text-left">
            <h3 className="font-mono text-[10px] text-plasma uppercase tracking-[0.2em] mb-4">
              003 / PROJECTS
            </h3>
            <h2 className="font-syne font-extrabold text-[#F0EEF8] leading-[1.1] pb-2 text-[clamp(40px,5vw,64px)]">
              Things I&apos;ve shipped.
            </h2>
          </div>

          <a
            href="https://github.com/shahbhavya7"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 font-mono text-[11px] text-flux/70 border border-flux/20 px-4 py-2 rounded-md hover:opacity-100 hover:border-flux/50 transition-all"
          >
            ⌥ View all repos
          </a>
        </div>

        {/* Filter Tabs */}
        <div
          className="flex flex-row gap-3 justify-start overflow-x-auto pb-4 mb-[48px] hide-scrollbar"
        >
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            const activeColor = getActiveFilterColor();
            return (
              <button
                key={filter}
                onClick={() => handleFilterClick(filter)}
                className="whitespace-nowrap font-mono text-[11px] px-5 py-2.5 rounded-[40px] border transition-all duration-200 ease-in-out"
                style={{
                  backgroundColor: isActive ? `${activeColor}1A` : "rgba(255,255,255,0.03)",
                  borderColor: isActive ? `${activeColor}66` : "rgba(255,255,255,0.08)",
                  color: isActive ? activeColor : "rgba(240,238,248,0.6)",
                  boxShadow: isActive ? `0 0 16px ${activeColor}26` : "none",
                }}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div
          ref={gridRef}
          style={{
            transition: "opacity 150ms ease-in-out, transform 150ms ease-in-out",
            opacity: isTransitioning ? 0 : 1,
            transform: isTransitioning ? "translateY(10px)" : "translateY(0)",
          }}
        >
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20 font-mono text-[13px] text-text-muted/40">
              {`// no projects in this category yet`}
            </div>
          ) : activeFilter === "ALL" ? (
            // ALL layout: Featured + Small grid
            <>
              {/* Featured Grid (first 3) */}
              <div data-anim="featured-grid" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredProjects.slice(0, 3).map((project, index) => {
                  const isWide = index === 0;
                  return (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      isWide={isWide}
                      type="featured"
                    />
                  );
                })}
              </div>

              {/* Small Grid (remaining) */}
              <div data-anim="small-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {filteredProjects.slice(3).map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    isWide={false}
                    type="small"
                  />
                ))}
              </div>
            </>
          ) : (
            // FILTERED layout: Equal grid
            <div data-anim="featured-grid" className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isWide={false}
                  type="equal"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ProjectCard({ project, isWide, type }: { project: any; isWide: boolean; type: string }) {
  const isSmall = type === "small";

  return (
    <div
      data-anim={isSmall ? "small-card" : ""}
      className={`about-card-glass glass-panel rounded-xl border border-white/10 relative flex flex-col justify-between group cursor-pointer transition-all duration-250 ease-out overflow-hidden proj-card shadow-[0_24px_80px_rgba(0,0,0,0.4),_0_0_0_1px_rgba(255,255,255,0.05)_inset] ${isWide ? "lg:col-span-2 lg:min-h-[320px] h-auto" : type === "equal" ? "min-h-[280px] h-auto" : "h-auto md:min-h-[280px]"
        } ${isSmall ? "p-[28px] md:p-[32px] min-h-[240px]" : "p-[28px] md:p-[40px] lg:px-[48px]"}`}
      style={{
        "--hover-border": `${project.categoryColor}4D`,
        "--hover-shadow": `${project.categoryColor}14`,
      } as React.CSSProperties}
      onClick={() => window.open(project.github as string, "_blank", "noopener,noreferrer")}
    >
      {/* Background noise texture on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 70% 50%, ${project.categoryColor}0D, transparent 70%)`
        }}
      />

      {/* Top Section */}
      <div className={`relative z-10 flex justify-between items-start gap-6 ${isSmall ? "flex-col" : ""}`}>
        <div>
          <div className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.15em] mb-4" style={{ color: project.categoryColor }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.categoryColor }} />
            {project.category}
          </div>

          <h3 className={`font-syne font-bold text-[#F0EEF8] ${isSmall ? "text-[20px]" : "text-[28px]"}`}>
            {project.title}
          </h3>
          <p className="font-mono text-[12px] text-text-muted mt-1">
            {project.subtitle}
          </p>

          {!isSmall && (
            <p className="font-sans text-[14px] text-text-muted/75 leading-[1.7] mt-4 max-w-[600px] line-clamp-3 md:line-clamp-none">
              {project.description}
            </p>
          )}
          {isSmall && (
            <p className="font-sans text-[14px] text-text-muted/75 leading-[1.7] mt-4 line-clamp-2">
              {project.description}
            </p>
          )}
        </div>

        {/* ASCII block */}
        {!isSmall && ASCII_ART[project.id] && (
          <div className={`hidden md:block ${isWide ? 'relative flex-shrink-0 w-[180px]' : 'absolute top-6 right-6 scale-[0.85] origin-top-right pointer-events-none'} text-flux/20 font-semibold font-mono text-[10px] leading-[1.6] select-none z-0`}>
            {ASCII_ART[project.id].map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Section */}
      <div className={`relative z-10 flex justify-between items-end md:items-center pt-6 mt-auto flex-col md:flex-row gap-4`}>
        {/* Tags Row */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {project.tags.map((tag: string) => (
            <span
              key={tag}
              className="font-mono text-[10px] px-2.5 py-1 rounded border border-white/10 bg-white/5 text-[#F0EEF8]/60 transition-colors duration-150 proj-tag"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Highlight & Link */}
        <div className="flex flex-col items-start md:items-end w-full md:w-auto mt-2 md:mt-0">
          <span className="font-mono text-[10px] text-text-muted/50 text-left md:text-right max-w-full md:max-w-[240px]">
            {project.highlight}
          </span>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="font-mono text-[11px] text-flux/70 mt-2 hover:opacity-100 hover:underline transition-opacity"
          >
            ↗ GitHub
          </a>
        </div>
      </div>

      <style jsx>{`
        .proj-card:hover {
          border-color: var(--hover-border) !important;
          box-shadow: 0 16px 64px var(--hover-shadow), 0 0 0 1px rgba(255,255,255,0.05) inset;
          transform: translateY(-3px);
        }
        .proj-card:hover .proj-tag {
          border-color: var(--hover-border);
        }
      `}</style>
    </div>
  );
}

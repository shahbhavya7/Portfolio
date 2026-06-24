"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * EXPERIENCE DATA
 * To add a new experience:
 * 1. Add a new object to the EXPERIENCES array below
 * 2. Follow the exact same shape as existing entries
 * 3. status: "CURRENT" | "COMPLETED" | "IN REVIEW" | "INCOMING"
 * 4. typeColor + accentColor: any hex color
 * 5. The UI updates automatically — no JSX changes needed
 * 
 * To remove an experience:
 * Simply delete the object from the array.
 * The layout adjusts automatically.
 */
const EXPERIENCES = [
  {
    id: "calfus",
    role: "Incoming Gen AI Intern",
    company: "Calfus",
    companyUrl: "https://calfus.com",
    type: "INTERNSHIP",
    typeColor: "#00D4FF",
    period: "Starts Jul 2026",
    location: "On site · Pune, India",
    status: "INCOMING",
    description: "Incoming intern joining the Gen AI team. Details about specific projects, products, and system architectures will be updated here as the internship progresses.",
    highlights: [
      "Details on architecture and system design to be added",
      "Key contributions and project outcomes will be documented here",
      "Tech stack specifics and implementation details pending",
    ],
    stack: ["TBD"],
    accentColor: "#00D4FF",
  },
  {
    id: "info-origin",
    role: "AI Engineer Intern",
    company: "Info Origin",
    companyUrl: "https://www.infoorigin.com/",
    type: "INTERNSHIP",
    typeColor: "#6E3AFA",
    period: "2025",
    location: "Remote",
    status: "COMPLETED",
    description: "Built enterprise-grade RAG systems for document intelligence. Designed retrieval pipelines handling large-scale internal knowledge bases with semantic search and reranking strategies.",
    highlights: [
      "Enterprise RAG architecture with FAISS and pgvector",
      "Document chunking and embedding pipeline optimization",
      "Semantic reranking with cross-encoder models",
      "REST API layer with FastAPI for production serving",
    ],
    stack: ["FAISS", "pgvector", "FastAPI", "HuggingFace", "Python", "LangChain"],
    accentColor: "#6E3AFA",
  },
];

export default function Experience() {
  const [activeId, setActiveId] = useState("calfus");
  const [displayId, setDisplayId] = useState("calfus");
  const [isFading, setIsFading] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  const displayExperience = EXPERIENCES.find(e => e.id === displayId) || EXPERIENCES[0];

  // Handle tab switching with fade animation
  const handleTabClick = (id: string) => {
    if (id === activeId || isFading) return;
    setActiveId(id);
    setIsFading(true);
    
    // Fade out
    setTimeout(() => {
      setDisplayId(id);
      // Wait a tick then fade in
      requestAnimationFrame(() => {
        setIsFading(false);
      });
    }, 150); // matches CSS transition duration
  };

  // Scroll animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "cubic-bezier(0.4, 0, 0.2, 1)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

      // Left column tabs stagger
      gsap.fromTo("[data-anim='exp-tab']",
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "cubic-bezier(0.4, 0, 0.2, 1)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

      // Right column panel
      gsap.fromTo(rightColRef.current,
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          delay: 0.2,
          ease: "cubic-bezier(0.4, 0, 0.2, 1)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
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
      id="experience"
      ref={sectionRef}
      className="relative min-h-screen py-[120px] overflow-hidden"
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(0,212,255,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-12 lg:px-[48px]">
        {/* Header */}
        <div ref={headerRef} className="mb-[80px]">
          <h3 className="font-mono text-[10px] text-flux uppercase tracking-[0.2em] mb-4">
            005 / EXPERIENCE
          </h3>
          <h2 className="font-syne font-extrabold text-[#F0EEF8] leading-[1.1] pb-2 text-[clamp(40px,5vw,64px)]">
            Where I have shipped.
          </h2>
          <p className="font-sans text-[16px] max-w-[480px] mt-4" style={{ color: "rgba(160,150,190,0.65)", lineHeight: 1.7 }}>
            Internships and research roles where real systems got built and shipped.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="flex flex-col md:flex-row items-start gap-8 lg:gap-[80px]">
          
          {/* Left Column — Selector */}
          <div ref={leftColRef} className="w-full md:w-[280px] flex-shrink-0 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-y-auto pb-2 md:pb-0 hide-scrollbar md:experience-tabs-container">
            {EXPERIENCES.map((item) => {
              const isActive = activeId === item.id;
              
              return (
                <div
                  key={item.id}
                  data-anim="exp-tab"
                  onClick={() => handleTabClick(item.id)}
                  className="relative p-[10px_16px] md:p-[16px_20px] rounded-[8px] cursor-pointer transition-all duration-200 whitespace-nowrap md:whitespace-normal min-w-fit md:min-w-0"
                  style={{
                    backgroundColor: isActive ? `rgba(${hexToRgb(item.accentColor)}, 0.06)` : "transparent",
                    border: `1px solid ${isActive ? `rgba(${hexToRgb(item.accentColor)}, 0.2)` : "transparent"}`,
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.02)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.borderColor = "transparent";
                    }
                  }}
                >
                  {/* Active Left Bar */}
                  {isActive && (
                    <div
                      className="absolute left-0 top-0 bottom-0 w-[2px] rounded-[2px_0_0_2px] hidden md:block"
                      style={{ backgroundColor: item.accentColor }}
                    />
                  )}

                  <div className="flex flex-col gap-1">
                    {/* Top row */}
                    <div className="flex justify-between items-center gap-4">
                      <span className="font-syne text-[15px] font-bold transition-colors duration-200" style={{ color: isActive ? "#F0EEF8" : "rgba(240,238,248,0.5)" }}>
                        {(item.status === "CURRENT" || item.status === "INCOMING") && (
                          <span className="inline-block w-[6px] h-[6px] rounded-full mr-2 mb-0.5 animate-[current-pulse_2s_ease_infinite]" style={{ backgroundColor: item.status === "INCOMING" ? "#00D4FF" : "#A0FF6F", boxShadow: `0 0 6px ${item.status === "INCOMING" ? "rgba(0,212,255,0.6)" : "rgba(160,255,111,0.6)"}` }} />
                        )}
                        {item.company}
                      </span>
                      <span className="font-mono text-[8px] uppercase tracking-[0.12em] px-1.5 py-0.5 rounded-[3px] flex-shrink-0" style={{ color: item.typeColor, backgroundColor: `rgba(${hexToRgb(item.typeColor)}, 0.08)` }}>
                        {item.type}
                      </span>
                    </div>
                    {/* Period */}
                    <span className="font-mono text-[10px] transition-colors duration-200" style={{ color: isActive ? "rgba(160,150,190,0.65)" : "rgba(160,150,190,0.35)" }}>
                      {item.period}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column — Details Panel */}
          <div ref={rightColRef} className="flex-1 min-w-0 w-full relative">
            <div
              className="flex flex-col gap-[28px] transition-all duration-150"
              style={{
                opacity: isFading ? 0 : 1,
                transform: isFading ? "translateY(10px)" : "translateY(0)",
              }}
            >
              {/* Header Block */}
              <div>
                <h3 className="font-syne font-extrabold text-[28px] md:text-[32px] text-[#F0EEF8] leading-[1.2]">
                  {displayExperience.role}
                </h3>
                
                <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-2">
                  <a
                    href={displayExperience.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-syne text-[16px] font-semibold transition-all hover:underline"
                    style={{ color: displayExperience.accentColor, textUnderlineOffset: "3px" }}
                  >
                    {displayExperience.company} <span className="opacity-60 text-[12px]">↗</span>
                  </a>
                  
                  <div className="w-[1px] h-[14px] bg-white/10 hidden sm:block" />
                  
                  <span className="font-mono text-[11px] text-text-muted/50 hidden sm:block">
                    {displayExperience.location}
                  </span>
                  
                  <div className="w-[1px] h-[14px] bg-white/10 hidden sm:block" />
                  
                  <span className="font-mono text-[11px] text-text-muted/50">
                    {displayExperience.period}
                  </span>
                  
                  {(displayExperience.status === "CURRENT" || displayExperience.status === "INCOMING") && (
                    <span className="font-mono text-[9px] uppercase tracking-[0.1em] px-2 py-[3px] rounded ml-auto sm:ml-0" style={{
                      backgroundColor: displayExperience.status === "INCOMING" ? "rgba(0,212,255,0.1)" : "rgba(160,255,111,0.1)",
                      borderColor: displayExperience.status === "INCOMING" ? "rgba(0,212,255,0.25)" : "rgba(160,255,111,0.25)",
                      borderWidth: "1px",
                      color: displayExperience.status === "INCOMING" ? "#00D4FF" : "#A0FF6F"
                    }}>
                      ● {displayExperience.status}
                    </span>
                  )}
                </div>
                {/* Mobile only location */}
                <span className="font-mono text-[11px] text-text-muted/50 block sm:hidden mt-2">
                    {displayExperience.location}
                </span>
              </div>

              {/* Description Block */}
              <div>
                <div className="w-full h-[1px] bg-white/5 my-1" />
                <p className="font-sans text-[15px] text-text-muted/75 leading-[1.8] mt-4">
                  {displayExperience.description}
                </p>
              </div>

              {/* Highlights Block */}
              <div>
                <h4 className="font-mono text-[10px] text-text-muted/40 uppercase tracking-[0.15em] mb-3">
                  {`// KEY CONTRIBUTIONS`}
                </h4>
                <div className="flex flex-col gap-2.5">
                  {displayExperience.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <span className="font-mono text-[12px] mt-px flex-shrink-0" style={{ color: displayExperience.accentColor, opacity: 0.7 }}>
                        →
                      </span>
                      <span className="font-mono text-[12px] text-[#F0EEF8]/70 leading-[1.6]">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Block */}
              <div>
                <h4 className="font-mono text-[10px] text-text-muted/40 uppercase tracking-[0.15em] mb-2.5">
                  {`// STACK`}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {displayExperience.stack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="font-mono text-[10px] px-2.5 py-1 rounded bg-black/30 border border-white/5 text-[#F0EEF8]/55 transition-colors duration-200"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = `rgba(${hexToRgb(displayExperience.accentColor)}, 0.3)`;
                        e.currentTarget.style.color = displayExperience.accentColor;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                        e.currentTarget.style.color = "rgba(240,238,248,0.55)";
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
            </div>
          </div>

        </div>
      </div>
      
      <style jsx>{`
        @keyframes current-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.7); }
        }
        
        @media (min-width: 768px) {
          .experience-tabs-container {
            max-height: 480px;
            scrollbar-width: thin;
            scrollbar-color: rgba(0,212,255,0.2) transparent;
          }
          .experience-tabs-container::-webkit-scrollbar {
            width: 3px;
            background: transparent;
          }
          .experience-tabs-container::-webkit-scrollbar-thumb {
            background: rgba(0,212,255,0.2);
            border-radius: 2px;
          }
        }
      `}</style>

      {/* Section bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[120px] z-[2] pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #050508)" }}
      />
    </section>
  );
}

// Utility to convert hex to rgb string for rgba()
function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? 
    `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
    "255, 255, 255";
}

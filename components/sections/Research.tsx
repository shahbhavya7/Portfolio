"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const RESEARCH_ITEMS = [
  {
    id: "mysql-paper",
    title: "Query Optimization: Techniques and Strategies for MySQL Performance Improvement",
    authors: ["Pranali Kosamkar", "Gautam Sharma", "Lakshya Upadhyaya", "Bhavya Shah", "Samarth Patel"],
    myRole: "Co-Author",
    venue: "ICT Systems and Sustainability",
    publisher: "Springer",
    series: "Lecture Notes in Networks and Systems, Vol. 1645",
    date: "October 30, 2025",
    doi: "10.1007/978-3-032-06662-6_13",
    doiUrl: "https://doi.org/10.1007/978-3-032-06662-6_13",
    topics: ["MySQL", "Query Optimization", "Database Performance", "Index Tuning", "Execution Plans"],
    type: "CONFERENCE",
    typeColor: "#00D4FF",
    abstract: "A systematic analysis of MySQL query optimization strategies covering index design, execution plan analysis, and performance benchmarking across enterprise-scale workloads.",
    status: "PUBLISHED",
  },
];

export default function Research() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const calloutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo("[data-anim='research-card']",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(calloutRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          delay: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: calloutRef.current,
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
      id="research"
      ref={sectionRef}
      className="relative min-h-[60vh] py-[120px] overflow-hidden"
    >
      {/* Background scan lines */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent 0px,
            transparent 39px,
            rgba(0,212,255,0.015) 40px
          )`
        }}
      />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div ref={headerRef} className="mb-[64px]">
          <h3 className="font-mono text-[10px] text-[#A0FF6F] uppercase tracking-[0.2em] mb-4">
            004 / RESEARCH
          </h3>
          <h2 className="font-syne font-extrabold text-[#F0EEF8] leading-[1.1] pb-2 text-[clamp(40px,5vw,64px)]">
            Published work.
          </h2>
        </div>

        {/* Research Cards */}
        <div>
          {RESEARCH_ITEMS.map((item) => {
            const isPublished = item.status === "PUBLISHED";

            return (
              <div
                key={item.id}
                data-anim="research-card"
                className="about-card-glass glass-panel rounded-xl p-[24px] md:p-[40px] lg:px-[48px] mb-5 relative overflow-hidden group transition-all duration-250 flex flex-col lg:flex-row gap-8 lg:gap-12 research-card border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.4),_0_0_0_1px_rgba(255,255,255,0.05)_inset]"
                style={{
                  "--hover-border": `${item.typeColor}4D`,
                  "--hover-shadow": `${item.typeColor}0F`,
                } as React.CSSProperties}
              >
                {/* Background accent */}
                <div
                  className="absolute top-0 right-0 w-[200px] h-[200px] pointer-events-none z-0"
                  style={{
                    background: `radial-gradient(circle at top right, ${item.typeColor}0A, transparent 60%)`
                  }}
                />

                {/* Springer Easter Egg Watermark */}
                {item.publisher === "Springer" && (
                  <span
                    className="absolute -bottom-6 right-8 font-syne font-extrabold text-[80px] md:text-[120px] pointer-events-none z-0 select-none opacity-5 transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-2"
                    style={{ 
                      color: "transparent",
                      WebkitTextStroke: "1px rgba(240,238,248,0.8)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    SPRINGER
                  </span>
                )}

                {/* Left Column */}
                <div className="relative z-10 flex-shrink-0 w-auto lg:w-[200px] flex flex-row lg:flex-col flex-wrap gap-6 lg:gap-0">
                  <div className="w-full sm:w-auto lg:w-full">
                    <div className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.15em] mb-4 lg:mb-5" style={{ color: item.typeColor }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.typeColor }} />
                      {item.type}
                    </div>

                    <div className="block">
                      <span
                        className="inline-block px-3 py-1.5 rounded font-mono text-[10px] uppercase border"
                        style={isPublished ? {
                          backgroundColor: "rgba(160,255,111,0.08)",
                          borderColor: "rgba(160,255,111,0.25)",
                          color: "#A0FF6F"
                        } : {
                          backgroundColor: "rgba(255,179,71,0.08)",
                          borderColor: "rgba(255,179,71,0.25)",
                          color: "#FFB347"
                        }}
                      >
                        <span className={`inline-block mr-1.5 ${!isPublished ? "animate-[soft-pulse_2s_infinite]" : ""}`}>●</span>
                        {item.status}
                      </span>
                    </div>
                  </div>

                  <div className="mt-0 lg:mt-6 font-mono text-[10px] text-text-muted/50 leading-[1.8] flex flex-col gap-1 w-full sm:w-auto lg:w-full">
                    <div>
                      <span className="text-[#6B6880] mr-2">PUBLISHER</span>
                      <span className="text-[#A09CB8]">{item.publisher}</span>
                    </div>
                    <div>
                      <span className="text-[#6B6880] mr-2">VENUE</span>
                      <span className="text-[#A09CB8]">{item.venue}</span>
                    </div>
                    <div>
                      <span className="text-[#6B6880] mr-2">DATE</span>
                      <span className="text-[#A09CB8]">{item.date}</span>
                    </div>
                  </div>

                  <div className="mt-2 lg:mt-4 w-full sm:w-auto lg:w-full">
                    <a
                      href={item.doiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[10px] text-flux/70 hover:opacity-100 hover:underline transition-opacity"
                    >
                      DOI ↗
                    </a>
                  </div>
                </div>

                {/* Right Column */}
                <div className="relative z-10 flex-1 min-w-0">
                  <h3 className="font-syne font-bold text-[#F0EEF8] text-[18px] md:text-[22px] leading-[1.3] mb-3">
                    {item.title}
                  </h3>

                  {/* Authors Row */}
                  <div className="flex flex-wrap gap-2 mb-5 items-center">
                    {item.authors.map((author, i) => {
                      const isMe = author === "Bhavya Shah";
                      return (
                        <span
                          key={i}
                          className={`font-mono text-[11px] px-2.5 py-1 rounded border ${isMe
                              ? "bg-flux/10 border-flux/30 text-flux"
                              : "bg-white/5 border-white/10 text-[#F0EEF8]/55"
                            }`}
                        >
                          {author}
                        </span>
                      );
                    })}
                    <span className="font-mono text-[10px] px-2.5 py-1 rounded bg-[#A0FF6F]/10 border border-[#A0FF6F]/20 text-[#A0FF6F] ml-auto sm:ml-2 mt-2 sm:mt-0">
                      {`// ${item.myRole}`}
                    </span>
                  </div>

                  <p className="font-sans text-[14px] text-text-muted/70 leading-[1.75] mb-6">
                    {item.abstract}
                  </p>

                  {/* Topics Row */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[9px] text-[#6B6880] uppercase tracking-[0.15em] mr-2">
                      KEYWORDS
                    </span>
                    {item.topics.map((topic, i) => (
                      <span
                        key={i}
                        className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[#F0EEF8]/50"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <style jsx>{`
                  .research-card:hover {
                    border-color: var(--hover-border) !important;
                    box-shadow: 0 8px 48px var(--hover-shadow), 0 0 0 1px rgba(255,255,255,0.05) inset;
                  }
                  @keyframes soft-pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.3; }
                  }
                `}</style>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout */}
        <div
          ref={calloutRef}
          className="mt-[48px] flex justify-center items-center gap-3"
        >
          <div className="border border-dashed border-white/10 rounded-lg py-6 px-10 max-w-[480px] w-full text-center">
            <span className="font-mono text-[11px] text-text-muted/40">
              {`// more papers incoming · currently writing on LLM sycophancy`}
            </span>
            <span className="inline-block w-2 h-[14px] bg-flux/60 align-bottom ml-1 animate-[blink-cursor_1s_step-end_infinite]" />
          </div>
        </div>
      </div>

      {/* Section bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[120px] z-[2] pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #050508)" }}
      />
    </section>
  );
}

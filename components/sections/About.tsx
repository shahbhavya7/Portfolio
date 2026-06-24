"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// Toggle this to true when you are open to new opportunities
const IS_OPEN_TO_WORK = false;

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // 3D Tilt logic
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate mouse position relative to center
    const deltaX = e.clientX - rect.left - width / 2;
    const deltaY = e.clientY - rect.top - height / 2;

    // As per prompt specs (with inversion for natural feel)
    const rotateX = (deltaY / height) * -15;
    const rotateY = (deltaX / width) * 15;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const infoRows = [
    { label: "LOCATION", value: "Pune, India" },
    { label: "UNIVERSITY", value: "MIT-WPU · 2027" },
    { label: "STATUS", value: "Interning @ Calfus · Jul 2026" },
    { label: "INTERESTS", value: "LLMs, RAG, NLP, IR" },
  ];

  const coreStack = [
    "Python · LangChain",
    "React · Next.js",
    "FastAPI · pgvector",
    "Three.js · R3F",
    "HuggingFace · FAISS",
    "Groq · Gemini API",
  ];

  const currentlyBuilding = [
    "Agentic Code-Eval Pipeline",
    "AdversarialRAG-Eval Framework",
    "LLM Sycophancy Research",
    "This Portfolio",
  ];
  // Duplicate for seamless scroll
  const tickerItems = [...currentlyBuilding, ...currentlyBuilding];

  // Animation variants
  const leftCardVariants = {
    hidden: { x: -60, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.175, 0.885, 0.32, 1] },
    },
  } as const;

  const rightColumnVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  } as const;

  const rightItemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.175, 0.885, 0.32, 1] },
    },
  } as const;

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen flex items-center py-[120px] overflow-hidden"
    >
      {/* Subtle Grid Background Pattern */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-[380px_1fr] gap-12 md:gap-[80px] items-start overflow-hidden box-border">
        {/* LEFT COLUMN: Identity Card */}
        <motion.div
          variants={leftCardVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="w-full"
          style={{ perspective: "1000px" }}
        >
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full max-w-[380px] mx-auto md:ml-auto"
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition:
                tilt.x === 0 && tilt.y === 0
                  ? "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
                  : "transform 0.1s ease-out",
              transformStyle: "preserve-3d",
            }}
          >
            <div className="about-card-glass glass-panel w-full p-10 relative flex flex-col gap-6 border border-flux/15 shadow-[0_24px_80px_rgba(0,0,0,0.4),_0_0_0_1px_rgba(255,255,255,0.05)_inset]">

              {/* Floating Element */}
              {IS_OPEN_TO_WORK && (
                <div
                  className="absolute -top-3 right-6 bg-gradient-to-br from-flux to-plasma text-void font-mono text-[9px] font-bold uppercase tracking-[0.15em] py-1 px-2.5 rounded shadow-lg"
                  style={{ transform: "translateZ(20px)" }}
                >
                  {`// OPEN TO WORK`}
                </div>
              )}

              {/* Avatar Area */}
              <div className="flex items-center gap-4">
                <div className="w-[72px] h-[72px] shrink-0 rounded-full bg-gradient-to-br from-flux to-plasma p-[2px] avatar-ring-spin">
                  <div className="w-full h-full rounded-full bg-void flex items-center justify-center">
                    <span className="font-syne text-[28px] font-extrabold bg-gradient-to-br from-flux to-plasma bg-clip-text text-transparent">
                      BS
                    </span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <h3 className="font-syne text-[18px] font-bold text-text-primary">
                    Bhavya Shah
                  </h3>
                  <p className="font-mono text-[11px] text-text-muted tracking-[0.1em] mt-1">
                    AI Engineer · MIT-WPU
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              {IS_OPEN_TO_WORK && (
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full bg-neural shadow-[0_0_8px_rgba(160,255,111,0.6)] shrink-0"
                    style={{ animation: "status-pulse 2s infinite" }}
                  />
                  <span className="font-mono text-[11px] text-neural tracking-[0.08em]">
                    Available for Research Collab
                  </span>
                </div>
              )}

              <div className="w-full h-[1px] bg-white/5" />

              {/* Info Rows */}
              <div className="flex flex-col gap-3">
                {infoRows.map((row) => (
                  <div
                    key={row.label}
                    className="flex justify-between items-center rounded px-2 -mx-2 transition-all duration-200 hover:bg-flux/[0.04] group/row cursor-default"
                    style={{ padding: "4px 8px" }}
                  >
                    <span className="font-mono text-[10px] text-text-muted uppercase tracking-[0.15em]">
                      {row.label}
                    </span>
                    <span className="font-mono text-[11px] text-text-primary/70 transition-colors duration-200 group-hover/row:text-text-primary">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="w-full h-[1px] bg-white/5" />

              {/* Links Row */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://github.com/shahbhavya7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] text-flux/70 hover:text-flux hover:underline underline-offset-4 transition-all flex items-center gap-1.5"
                >
                  <span className="text-[12px]">⌥</span> github.com/shahbhavya7
                </a>
                <a
                  href="mailto:bhavyshah.work@gmail.com"
                  className="font-mono text-[10px] text-flux/70 hover:text-flux hover:underline underline-offset-4 transition-all flex items-center gap-1.5"
                >
                  <span className="text-[12px]">@</span> bhavyshah.work@gmail.com
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Bio & Content */}
        <motion.div
          variants={rightColumnVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col w-full min-w-0 overflow-hidden"
        >
          <motion.div variants={rightItemVariants} className="mb-4">
            <span className="font-mono text-[10px] text-flux uppercase tracking-[0.2em]">
              001 / ABOUT
            </span>
          </motion.div>

          <motion.h2
            variants={rightItemVariants}
            className="font-syne font-extrabold text-[clamp(28px,8vw,40px)] md:text-[clamp(32px,3.5vw,52px)] text-text-primary leading-[1.15] tracking-tight max-w-full break-words"
            style={{ wordBreak: "break-word" }}
          >
            The human behind the model.
          </motion.h2>

          <motion.div
            variants={rightItemVariants}
            className="mt-6 flex flex-col gap-4 text-[16px] text-[#A096BE]/80 leading-[1.8]"
          >
            <p className="max-w-[560px] break-words" style={{ overflowWrap: "break-word", wordWrap: "break-word" }}>
              <span style={{ color: "rgba(240,238,248,0.95)", fontSize: "17px" }}>Third-year AI &amp; Data Science student at MIT-WPU, Pune.</span>{" "}
              I build
              production GenAI systems like RAG pipelines, multi-agent
              architectures, and LLM evaluation frameworks that actually ship.
            </p>
            <p className="max-w-[560px] break-words" style={{ overflowWrap: "break-word", wordWrap: "break-word" }}>
              Currently interning at Calfus building Gen AI products, and co-authored a Springer publication on MySQL query optimization (ICT4SD 2025). Research is not a side quest for me. It is part of how I think about engineering.
            </p>
            <p className="max-w-[560px] break-words" style={{ overflowWrap: "break-word", wordWrap: "break-word" }}>
              When I&apos;m not training models or writing papers, I&apos;m probably
              thinking about cars, the engineering, the design, the physics. Same
              obsession with how systems work, different domain.
            </p>
          </motion.div>

          <motion.div variants={rightItemVariants} className="mt-8">
            <h4 className="font-mono text-[10px] text-text-muted uppercase tracking-[0.15em] mb-3">
              {`// CURRENTLY BUILDING`}<span className="terminal-cursor text-flux ml-1">▋</span>
            </h4>
            <div
              className="relative overflow-hidden w-full"
              style={{
                maskImage:
                  "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
              }}
            >
              <div
                className="inline-flex items-center gap-[32px] whitespace-nowrap"
                style={{ animation: "ticker-scroll 25s linear infinite" }}
              >
                {tickerItems.map((item, i) => (
                  <div
                    key={i}
                    className="font-mono text-[12px] text-flux/60 flex items-center gap-[32px]"
                  >
                    {item} <span className="text-flux/30">·</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div variants={rightItemVariants} className="mt-8">
            <h4 className="font-mono text-[10px] text-text-muted uppercase tracking-[0.15em] mb-3">
              {`// CORE STACK`}
            </h4>
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-[10px]">
              {coreStack.map((skill) => (
                <div
                  key={skill}
                  className="group relative overflow-hidden pl-[20px] pr-[16px] py-[14px] rounded-[8px] bg-white/[0.02] border border-flux/12 cursor-default transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:border-flux/35 hover:bg-flux/5 hover:translate-x-1 hover:shadow-[0_0_20px_rgba(0,212,255,0.08),_-4px_0_12px_rgba(0,212,255,0.1)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-flux/5 to-transparent opacity-0 transition-opacity duration-[250ms] ease-out group-hover:opacity-100 pointer-events-none" />
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-flux to-plasma rounded-l-[2px]" />
                  <div className="relative z-10 flex flex-col">
                    <span className="block mb-1 font-mono text-[9px] text-text-muted tracking-[0.2em] uppercase">
                      {`// STACK`}
                    </span>
                    <span className="font-mono text-[12px] text-[#F0EEF8]/85 tracking-[0.04em]">
                      {skill}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Section bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[120px] z-[2] pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #050508)" }}
      />

      {/* Ambient floating particles (reduced to 4, slower for perf) */}
      {[
        { top: "15%", left: "10%", size: 3, opacity: 0.2, anim: "float-1", dur: "10s", delay: "0s" },
        { top: "40%", left: "88%", size: 2, opacity: 0.15, anim: "float-2", dur: "12s", delay: "1.5s" },
        { top: "65%", left: "5%", size: 3, opacity: 0.22, anim: "float-3", dur: "9s", delay: "0.5s" },
        { top: "80%", left: "72%", size: 2, opacity: 0.18, anim: "float-4", dur: "11s", delay: "3s" },
      ].map((p, i) => (
        <div
          key={i}
          className="absolute z-[1] rounded-full pointer-events-none"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            background: "#00D4FF",
            opacity: p.opacity,
            animation: `${p.anim} ${p.dur} ease-in-out infinite`,
            animationDelay: p.delay,
            willChange: "transform",
          }}
        />
      ))}
    </section>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiPostgresql, SiHuggingface, SiScikitlearn, SiTensorflow, SiPytorch,
  SiFastapi, SiNodedotjs, SiFlask, SiJsonwebtokens, SiReact, SiTypescript, SiTailwindcss,
  SiThreedotjs, SiFramer, SiGreensock, SiMongodb, SiMysql, SiSupabase, SiFirebase,
  SiPython, SiJavascript, SiCplusplus, SiLangchain, SiOpenai
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { TbBrain } from "react-icons/tb";
import { VscDatabase, VscChecklist, VscSettingsGear, VscGraph, VscServerProcess, VscRadioTower } from "react-icons/vsc";

const SKILL_CATEGORIES = [
  {
    id: "genai",
    label: "GenAI & LLMs",
    icon: "◈",
    color: "#00D4FF",
    skills: [
      { name: "LangChain", level: 90, Icon: SiLangchain },
      { name: "RAG Pipelines", level: 92, Icon: VscDatabase },
      { name: "LLaMA / Gemini API", level: 85, Icon: SiOpenai },
      { name: "RAGAS Evaluation", level: 82, Icon: VscChecklist },
      { name: "FAISS / pgvector", level: 88, Icon: SiPostgresql },
      { name: "HuggingFace", level: 80, Icon: SiHuggingface },
    ],
  },
  {
    id: "ml",
    label: "Machine Learning",
    icon: "◇",
    color: "#6E3AFA",
    skills: [
      { name: "Scikit-learn", level: 88, Icon: SiScikitlearn },
      { name: "TensorFlow / Keras", level: 82, Icon: SiTensorflow },
      { name: "Feature Engineering", level: 85, Icon: VscSettingsGear },
      { name: "Model Evaluation", level: 87, Icon: VscGraph },
      { name: "Deep Learning", level: 78, Icon: TbBrain },
      { name: "PyTorch", level: 70, Icon: SiPytorch },
    ],
  },
  {
    id: "backend",
    label: "Backend & APIs",
    icon: "◉",
    color: "#A0FF6F",
    skills: [
      { name: "FastAPI", level: 88, Icon: SiFastapi },
      { name: "Node.js / Express", level: 80, Icon: SiNodedotjs },
      { name: "Flask", level: 85, Icon: SiFlask },
      { name: "REST API Design", level: 87, Icon: VscServerProcess },
      { name: "JWT Auth", level: 78, Icon: SiJsonwebtokens },
      { name: "gRPC", level: 72, Icon: VscRadioTower },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    icon: "◫",
    color: "#FF6B9D",
    skills: [
      { name: "React / Next.js", level: 82, Icon: SiReact },
      { name: "TypeScript", level: 78, Icon: SiTypescript },
      { name: "Tailwind CSS", level: 85, Icon: SiTailwindcss },
      { name: "Three.js / R3F", level: 68, Icon: SiThreedotjs },
      { name: "Framer Motion", level: 72, Icon: SiFramer },
      { name: "GSAP", level: 70, Icon: SiGreensock },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    icon: "◰",
    color: "#FFB347",
    skills: [
      { name: "PostgreSQL (pgvector)", level: 87, Icon: SiPostgresql },
      { name: "MongoDB", level: 78, Icon: SiMongodb },
      { name: "MySQL", level: 82, Icon: SiMysql },
      { name: "Supabase", level: 80, Icon: SiSupabase },
      { name: "Firebase Firestore", level: 75, Icon: SiFirebase },
      { name: "Neon DB", level: 72, Icon: VscDatabase },
    ],
  },
  {
    id: "langs",
    label: "Languages",
    icon: "◑",
    color: "#00D4FF",
    skills: [
      { name: "Python", level: 93, Icon: SiPython },
      { name: "JavaScript", level: 85, Icon: SiJavascript },
      { name: "Java", level: 80, Icon: FaJava },
      { name: "TypeScript", level: 78, Icon: SiTypescript },
      { name: "C / C++", level: 72, Icon: SiCplusplus },
      { name: "SQL", level: 85, Icon: VscDatabase },
    ],
  },
];

// A2 — Proficiency label mapper
function getProficiencyLabel(level: number): { label: string; color: string } {
  if (level >= 90) return { label: "EXPERT", color: "#A0FF6F" };
  if (level >= 80) return { label: "ADVANCED", color: "CATEGORY" }; // replaced at render
  if (level >= 70) return { label: "PROFICIENT", color: "rgba(240,238,248,0.6)" };
  return { label: "LEARNING", color: "#FFB347" };
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("genai");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [animatedLevels, setAnimatedLevels] = useState<Record<string, number>>({});
  const [prevCategory, setPrevCategory] = useState("genai");

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const activeData = SKILL_CATEGORIES.find((c) => c.id === activeCategory)!;

  // Initialize and trigger progress bar animations
  useEffect(() => {
    // Reset levels to 0 first
    const resetLevels = activeData.skills.reduce((acc, skill) => {
      acc[skill.name] = 0;
      return acc;
    }, {} as Record<string, number>);
    setAnimatedLevels(resetLevels);

    // Trigger animation next frame
    let rafId: number;
    rafId = requestAnimationFrame(() => {
      rafId = requestAnimationFrame(() => {
        const targetLevels = activeData.skills.reduce((acc, skill) => {
          acc[skill.name] = skill.level;
          return acc;
        }, {} as Record<string, number>);
        setAnimatedLevels(targetLevels);
      });
    });

    return () => cancelAnimationFrame(rafId);
  }, [activeCategory, activeData]);

  // A3 + A4 — Enhanced tab switching with clip-path
  const handleTabClick = (id: string) => {
    if (id === activeCategory || isTransitioning) return;
    setPrevCategory(activeCategory);
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveCategory(id);
      requestAnimationFrame(() => {
        setIsTransitioning(false);
      });
    }, 150);
  };

  // Scroll animations — G4 differentiated timing
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
          duration: 0.7, // G4: fast, confident
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(tabsRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          delay: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo("[data-anim='skill-card']",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5, // G4: quick cascade
          stagger: 0.04,
          ease: "power2.out",
          delay: 0.25,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
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
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen py-[120px] overflow-hidden"
    >
      {/* A5 — Background pattern (boosted opacity) */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(110,58,250,0.05) 1px, transparent 1px),
            linear-gradient(-45deg, rgba(0,212,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      {/* A5 — Large ambient orb top-right */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          top: "-200px",
          right: "-200px",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(110,58,250,0.06) 0%, transparent 70%)",
        }}
      />

      {/* A5 — Smaller cyan orb bottom-left */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          bottom: "-100px",
          left: "-100px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-[80px]">
          <h3 className="font-mono text-[10px] text-flux uppercase tracking-[0.2em] mb-4">
            002 / SKILLS
          </h3>
          <h2 className="font-syne font-extrabold text-[#F0EEF8] leading-relaxed py-2 text-[clamp(32px,8vw,64px)] md:text-[clamp(40px,5vw,64px)]">
            What I build with.
          </h2>
          <p className="font-sans text-[16px] text-text-muted max-w-[480px] mx-auto mt-4" style={{ lineHeight: 1.7 }}>
            RAG pipelines, agentic systems, and ML models with just enough distributed systems knowledge to be dangerous.
          </p>
        </div>

        {/* A4 — Tabs Row with underline indicator */}
        <div
          ref={tabsRef}
          className="flex flex-row gap-3 justify-start md:justify-center overflow-x-auto pb-4 mb-[48px] hide-scrollbar"
        >
          {SKILL_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleTabClick(cat.id)}
                className="relative whitespace-nowrap font-mono text-[11px] px-5 py-2.5 rounded-[40px] border transition-all duration-200 ease-in-out"
                style={{
                  backgroundColor: isActive ? `${cat.color}1A` : "rgba(255,255,255,0.03)",
                  borderColor: isActive ? `${cat.color}66` : "rgba(255,255,255,0.08)",
                  color: isActive ? cat.color : "rgba(240,238,248,0.6)",
                  boxShadow: isActive ? `0 0 16px ${cat.color}26` : "none",
                }}
              >
                {/* A4 — Icon with flash animation on active */}
                <span
                  className="inline-block mr-1.5 transition-transform duration-300"
                  style={{
                    transform: isActive ? "scale(1)" : "scale(1)",
                    animation: isActive && cat.id !== prevCategory ? "icon-flash 0.3s ease-out" : "none",
                  }}
                >
                  {cat.icon}
                </span>
                {cat.label}

                {/* A4 — Animated underline indicator */}
                {isActive && (
                  <span
                    className="absolute -bottom-[2px] left-[20%] right-[20%] h-[1px]"
                    style={{
                      backgroundColor: cat.color,
                      animation: "underline-expand 0.3s ease forwards",
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* A3 — Skill Cards Grid with clip-path transition */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          style={{
            transition: isTransitioning
              ? "opacity 150ms ease-in, clip-path 150ms ease-in"
              : "opacity 250ms ease-out, clip-path 250ms ease-out",
            opacity: isTransitioning ? 0 : 1,
            clipPath: isTransitioning ? "inset(-40px -40px 100% -40px)" : "inset(-40px -40px -40px -40px)",
          }}
        >
          {activeData.skills.map((skill, index) => {
            const proficiency = getProficiencyLabel(skill.level);
            const profColor = proficiency.color === "CATEGORY" ? activeData.color : proficiency.color;

            return (
              <div
                key={skill.name}
                data-anim="skill-card"
                className="about-card-glass glass-panel p-[20px] md:p-[24px] rounded-[10px] relative overflow-hidden flex flex-col gap-3 group border border-white/5 transition-all duration-200 shadow-[0_24px_80px_rgba(0,0,0,0.4),_0_0_0_1px_rgba(255,255,255,0.05)_inset] skill-card-hover"
                style={{
                  "--hover-border": `${activeData.color}4D`,
                  "--hover-shadow": `${activeData.color}14`,
                } as React.CSSProperties}
              >
                {/* A6 — Category icon corner (replaces invisible dot) */}
                <span
                  className="absolute top-4 right-4 text-[18px] opacity-[0.12] transition-all duration-300 group-hover:opacity-30 group-hover:scale-110 group-hover:rotate-[15deg]"
                  style={{ color: activeData.color }}
                >
                  {activeData.icon}
                </span>

                {/* Top Row with A2 proficiency label */}
                <div className="flex justify-between items-center pr-4">
                  <span className="font-mono text-[13px] text-text-primary flex items-center gap-2">
                    {skill.Icon && <skill.Icon className="text-[14px] opacity-70" />}
                    {skill.name}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span
                      className="font-mono text-[9px] uppercase tracking-[0.15em]"
                      style={{ color: profColor }}
                    >
                      {proficiency.label}
                    </span>
                    <span className="font-mono text-[9px] opacity-30 text-[#F0EEF8]">
                      ({skill.level}%)
                    </span>
                  </span>
                </div>

                {/* A1 — HUD Progress Bar */}
                <div className="h-[4px] w-full rounded-[2px] overflow-visible mt-1" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
                  <div
                    className="h-full rounded-[2px] relative"
                    style={{
                      width: `${animatedLevels[skill.name] || 0}%`,
                      background: `repeating-linear-gradient(
                        90deg,
                        ${activeData.color} 0px,
                        ${activeData.color} 12px,
                        ${activeData.color}CC 12px,
                        ${activeData.color}CC 14px
                      )`,
                      transition: `width 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.05}s`,
                    }}
                  >
                    {/* A1 — Scanning leading edge dot */}
                    <span
                      className="absolute right-0 top-[-1px] w-[4px] h-[6px] rounded-[2px]"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.8)",
                        boxShadow: `0 0 8px ${activeData.color}`,
                        transition: `opacity 0.3s ease ${index * 0.05 + 0.4}s`,
                        opacity: (animatedLevels[skill.name] || 0) > 0 ? 1 : 0,
                      }}
                    />
                  </div>
                </div>

                <style jsx>{`
                  .skill-card-hover:hover {
                    border-color: var(--hover-border) !important;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 32px var(--hover-shadow), 0 0 0 1px rgba(255,255,255,0.05) inset;
                  }
                  @keyframes icon-flash {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.3); }
                    100% { transform: scale(1); }
                  }
                  @keyframes underline-expand {
                    from { transform: scaleX(0); }
                    to { transform: scaleX(1); }
                  }
                `}</style>
              </div>
            );
          })}
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

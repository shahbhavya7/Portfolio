"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import NeuralMeshCanvas from "@/components/three/NeuralMeshCanvas";

/* ── Tag Data ────────────────────────────────────────────────── */
const TAGS = ["LLM Systems", "RAG", "NLP Research", "Gen AI", "Open Source"];

/* ── Hero Section ────────────────────────────────────────────── */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  /* ── GSAP Entry Animation ──────────────────────────────────── */
  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.6 },
        delay: 0.3,
      });

      tl.from("[data-anim='eyebrow']", { y: 20, opacity: 0 })
        .from("[data-anim='name']", { y: 20, opacity: 0 }, "-=0.5")
        .from("[data-anim='descriptor']", { y: 20, opacity: 0 }, "-=0.5")
        .from("[data-anim='ctas']", { y: 20, opacity: 0 }, "-=0.5");

      // Tag pills flip-in with stagger (after CTAs)
      gsap.fromTo("[data-anim='tag-pill']",
        { rotateX: -90, opacity: 0 },
        {
          rotateX: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: "back.out(1.5)",
          delay: 1.5,
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, []);

  /* ── Scroll indicator fade out ─────────────────────────────── */
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollIndicatorRef.current) return;
      const opacity = Math.max(0, 1 - window.scrollY / 200);
      scrollIndicatorRef.current.style.opacity = String(opacity);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen overflow-hidden w-[100vw]"
    >
      {/* ── 3D Background (z-0) ──────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <NeuralMeshCanvas />
      </div>

      {/* ── Radial Gradient Overlay (z-1) ────────────────────── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 60% 50%, rgba(110,58,250,0.15) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 85% 80%, rgba(110,58,250,0.08) 0%, transparent 70%),
            linear-gradient(to bottom, transparent 60%, #050508 100%)
          `,
        }}
      />

      {/* ── Foreground Content (z-2) ─────────────────────────── */}
      <div className="relative z-[2] w-full flex items-center justify-center min-h-screen pt-[100px]">
        <div
          ref={cardRef}
          className="glass-panel hero-card mx-auto"
          style={{
            padding: "48px 40px",
            width: "640px",
            maxWidth: "calc(100vw - 48px)",
          }}
        >
          {/* Eyebrow */}
          <p
            data-anim="eyebrow"
            className="text-mono uppercase mb-5"
            style={{ fontSize: 10, letterSpacing: "0.25em", color: "rgba(0, 212, 255, 0.8)" }}
          >
            AI ENGINEER
            <span style={{ color: "#00D4FF", margin: "0 6px" }}>/</span>
            RESEARCH
            <span style={{ color: "#00D4FF", margin: "0 6px" }}>/</span>
            BUILDER
          </p>

          {/* Name */}
          <h1
            data-anim="name"
            className="text-display hero-name"
            style={{
              fontWeight: 800,
              fontSize: "clamp(52px, 6vw, 84px)",
              lineHeight: 1.05,
            }}
          >
            Bhavya Shah
          </h1>

          {/* Descriptor */}
          <p
            data-anim="descriptor"
            style={{
              fontSize: 16,
              color: "rgba(160, 150, 190, 0.75)",
              fontWeight: 400,
              marginTop: 16,
              lineHeight: 1.7,
              maxWidth: 480,
            }}
          >
            Building intelligent systems at the intersection of language,
            reasoning, and scale.
          </p>

          {/* Tags */}
          <div
            data-anim="tags"
            className="flex flex-wrap gap-2"
            style={{ marginTop: 24, perspective: "600px" }}
          >
            {TAGS.map((tag) => (
              <span
                key={tag}
                data-anim="tag-pill"
                className="text-mono hero-tag"
                style={{ opacity: 0 }}
              >
                <span className="hero-tag-prefix">{"// "}</span>
                {tag.toUpperCase()}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div
            data-anim="ctas"
            className="flex gap-3 items-center flex-wrap"
            style={{ marginTop: 32 }}
          >
            <a
              href="#projects"
              className="hero-btn-primary text-display"
            >
              VIEW PROJECTS
            </a>
            <a
              href="#research"
              className="hero-btn-secondary text-mono"
            >
              <span className="hero-btn-arrow">→</span> READ RESEARCH
            </a>
          </div>
        </div>
      </div>

      {/* ── Scroll Indicator (z-2) ───────────────────────────── */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 z-[2] -translate-x-1/2 flex flex-col items-center gap-3 transition-opacity duration-300"
      >
        <div className="scroll-track">
          <div className="scroll-travel-dot" />
        </div>
        <span
          className="text-mono uppercase"
          style={{ fontSize: 8, color: "rgba(255,255,255,0.2)", letterSpacing: "0.3em" }}
        >
          SCROLL
        </span>
      </div>
    </section>
  );
}

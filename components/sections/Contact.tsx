"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Toggle this to true when you are open to new opportunities
const IS_OPEN_TO_WORK = false;

const CONTACT_CARDS = [
  {
    id: "email",
    href: "mailto:bhavyshah.work@gmail.com",
    icon: "@",
    label: "EMAIL",
    value: "bhavyshah.work@gmail.com",
    color: "#00D4FF",
    sublabel: "Preferred channel",
    fontFamily: "var(--font-jetbrains-mono)",
  },
  {
    id: "github",
    href: "https://github.com/shahbhavya7",
    icon: "⌥",
    label: "GITHUB",
    value: "shahbhavya7",
    color: "#A0FF6F",
    sublabel: "Code + projects",
    fontFamily: "var(--font-jetbrains-mono)",
  },
  {
    id: "linkedin",
    href: "https://linkedin.com/in/bhavyashahbs",
    icon: "in",
    label: "LINKEDIN",
    value: "bhavyashah",
    color: "#6E3AFA",
    sublabel: "Professional network",
    fontFamily: "var(--font-syne)", // "in" looks better in Syne or sans
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

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
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "cubic-bezier(0.4, 0, 0.2, 1)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Contact cards stagger
      gsap.fromTo("[data-anim='contact-card']",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: "cubic-bezier(0.4, 0, 0.2, 1)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

      // Availability badge
      gsap.fromTo(badgeRef.current,
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          delay: 0.5,
          ease: "back.out(1.5)",
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
      id="contact"
      ref={sectionRef}
      className="relative min-h-[80vh] py-[120px] overflow-hidden"
    >
      {/* Background Dot Matrix (Inverted) */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(110,58,250,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      
      {/* Large Ambient Glow */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          bottom: "-200px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "400px",
          background: "radial-gradient(ellipse, rgba(110,58,250,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[960px] mx-auto px-6 md:px-[48px] text-center">
        {/* Header Block */}
        <div ref={headerRef} className="mb-[64px]">
          <h3 className="font-mono text-[10px] text-plasma uppercase tracking-[0.2em] mb-4">
            006 / CONTACT
          </h3>
          
          <h2 className="font-syne font-extrabold text-[#F0EEF8] leading-[1.05] mt-4 text-[clamp(28px,9vw,80px)] md:text-[clamp(44px,6vw,80px)]">
            Let&apos;s build<br />
            <span
              style={{
                background: "linear-gradient(135deg, #00D4FF, #6E3AFA)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              something real.
            </span>
          </h2>
          
          <p className="font-sans text-[17px] mt-[24px] mx-auto max-w-[520px]" style={{ color: "rgba(160,150,190,0.7)", lineHeight: 1.8 }}>
            Open to research collaborations, Gen AI internships, and ambitious projects. 
            If you are building something at the frontier, I want to hear about it.
          </p>
        </div>

        {/* Contact Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[720px] mx-auto mt-[56px]">
          {CONTACT_CARDS.map((card) => (
            <a
              key={card.id}
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              data-anim="contact-card"
              className="about-card-glass glass-panel p-[28px_24px] rounded-[12px] flex flex-col items-center gap-3 transition-all duration-250 ease-out border border-white/5 no-underline hover:translate-y-[-4px]"
              style={{
                "--hover-border": `rgba(${hexToRgb(card.color)}, 0.3)`,
                "--hover-shadow": `rgba(${hexToRgb(card.color)}, 0.08)`,
                "--hover-glow": `rgba(${hexToRgb(card.color)}, 0.1)`,
              } as React.CSSProperties}
            >
              <div 
                className="w-[48px] h-[48px] rounded-[10px] flex items-center justify-center text-[24px] font-bold transition-all duration-250 contact-icon-wrapper"
                style={{
                  fontFamily: card.fontFamily,
                  color: card.color,
                  backgroundColor: `rgba(${hexToRgb(card.color)}, 0.08)`,
                  border: `1px solid rgba(${hexToRgb(card.color)}, 0.2)`,
                  "--icon-hover-bg": `rgba(${hexToRgb(card.color)}, 0.14)`,
                  "--icon-hover-shadow": `rgba(${hexToRgb(card.color)}, 0.2)`,
                } as React.CSSProperties}
              >
                {card.icon}
              </div>

              <div className="flex flex-col items-center mt-1">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: "rgba(160,150,190,0.5)" }}>
                  {card.label}
                </span>
                <span className="font-mono text-[12px] text-[#F0EEF8] break-all mt-1">
                  {card.value}
                </span>
                <span className="font-mono text-[9px] mt-1.5" style={{ color: card.color, opacity: 0.6 }}>
                  {card.sublabel}
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Availability Badge */}
        {IS_OPEN_TO_WORK && (
          <div ref={badgeRef} className="mt-[48px]">
            <div className="inline-flex items-center gap-[10px] p-[10px_20px] rounded-[100px]" style={{ background: "rgba(160,255,111,0.06)", border: "1px solid rgba(160,255,111,0.2)" }}>
              <span className="w-[6px] h-[6px] rounded-full bg-[#A0FF6F] flex-shrink-0 animate-[avail-pulse_2s_ease_infinite]" style={{ boxShadow: "0 0 8px rgba(160,255,111,0.5)" }} />
              <span className="font-mono text-[12px] text-[#A0FF6F] tracking-[0.05em]">
                Available for opportunities
              </span>
            </div>
          </div>
        )}

      </div>

      <style jsx>{`
        .glass-panel:hover {
          border-color: var(--hover-border) !important;
          box-shadow: 0 16px 48px var(--hover-shadow), 0 0 0 1px var(--hover-glow) inset;
        }
        .glass-panel:hover .contact-icon-wrapper {
          background-color: var(--icon-hover-bg) !important;
          box-shadow: 0 0 20px var(--icon-hover-shadow);
        }
        @keyframes avail-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.6); }
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

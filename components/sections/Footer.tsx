"use client";

import React from "react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Research", href: "#research" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const SOCIAL_LINKS = [
  { label: "GH", href: "https://github.com/shahbhavya7" },
  { label: "IN", href: "https://linkedin.com/in/bhavyashah" },
  { label: "@", href: "mailto:bhavyshah.work@gmail.com" },
];

export default function Footer() {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative pt-[48px] pb-[32px] border-t border-white/5 overflow-hidden bg-void z-10">
      {/* Top glowing divider line */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.3) 30%, rgba(110,58,250,0.3) 70%, transparent 100%)"
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-[48px]">
        
        {/* ROW 1 — Main footer row */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-[32px] gap-6 text-center md:text-left">
          
          {/* LEFT — Brand mark */}
          <div className="flex items-center justify-center md:justify-start gap-3">
            <span 
              className="font-syne font-extrabold text-[20px]"
              style={{
                background: "linear-gradient(135deg, #00D4FF, #6E3AFA)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              BS
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.1em]" style={{ color: "rgba(160,150,190,0.3)" }}>
              Neural Gravity
            </span>
          </div>

          {/* CENTER — Nav links */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-[24px]">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="font-mono text-[10px] uppercase tracking-[0.1em] transition-colors duration-200"
                style={{ color: "rgba(160,150,190,0.4)" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#F0EEF8"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(160,150,190,0.4)"; }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* RIGHT — Social icons row */}
          <div className="flex justify-center md:justify-end gap-[16px]">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] transition-colors duration-200"
                style={{ color: "rgba(160,150,190,0.4)" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#00D4FF"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(160,150,190,0.4)"; }}
              >
                {social.label}
              </a>
            ))}
          </div>

        </div>

        {/* ROW 2 — Divider */}
        <div className="w-full h-[1px] bg-white/[0.04] mb-[24px]" />

        {/* ROW 3 — Copyright + build info row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-center md:text-left">
          
          {/* LEFT */}
          <div className="font-mono text-[10px] tracking-[0.05em]" style={{ color: "rgba(160,150,190,0.25)" }}>
            © 2026 Bhavya Shah. Built with Next.js, Three.js, and too much caffeine.
          </div>

          {/* RIGHT */}
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 font-mono text-[10px]">
            <span style={{ color: "rgba(160,150,190,0.2)" }}>
              Designed in the void. Deployed on Vercel.
            </span>
            
            <div className="flex items-center gap-[6px]">
              <span className="w-[3px] h-[3px] rounded-full bg-[#A0FF6F]" />
              <span className="text-[9px]" style={{ color: "rgba(160,150,190,0.2)" }}>
                v1.0.0
              </span>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}

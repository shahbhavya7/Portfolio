"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).__lenis) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).__lenis.scrollTo(0, { duration: 1.6 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="fixed z-40 flex items-center justify-center transition-all duration-300"
      style={{
        bottom: "32px",
        right: "32px",
        width: "40px",
        height: "40px",
        borderRadius: "8px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(0,212,255,0.2)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(8px)",
        pointerEvents: isVisible ? "all" : "none",
        cursor: "pointer",
      }}
      aria-label="Back to top"
    >
      <span
        style={{
          width: "8px",
          height: "8px",
          borderTop: "1.5px solid #00D4FF",
          borderRight: "1.5px solid #00D4FF",
          transform: "rotate(-45deg) translate(1px, 1px)",
        }}
      />
      <style jsx>{`
        button:hover {
          background: rgba(0,212,255,0.08) !important;
          border-color: rgba(0,212,255,0.4) !important;
          box-shadow: 0 0 20px rgba(0,212,255,0.15) !important;
        }
      `}</style>
    </button>
  );
}

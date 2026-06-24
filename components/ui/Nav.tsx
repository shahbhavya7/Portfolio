"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollPosition } from "@/lib/hooks/useScrollPosition";
import { useActiveSection } from "@/lib/hooks/useActiveSection";

const navItems = ["About", "Skills", "Projects", "Research", "Experience", "Contact"];

export default function Nav() {
  const scrollY = useScrollPosition();
  const activeSection = useActiveSection();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isScrolled = scrollY > 80;

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    const lenis = window.__lenis;
    if (lenis) {
      lenis.scrollTo(`#${sectionId}`, {
        offset: -80,
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  // Drawer Animation Variants
  const drawerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.25,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  } as const;

  const linkVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
      },
    },
    exit: {
      y: 20,
      opacity: 0,
      transition: { duration: 0.2 },
    },
  } as const;

  return (
    <>
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <motion.nav
          initial={{ y: -12, opacity: 0, filter: "blur(8px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{
            duration: 0.9,
            delay: 1.4,
            ease: [0.4, 0, 0.2, 1],
          }}
          className={`pointer-events-auto flex items-center gap-2 rounded-full w-fit whitespace-nowrap backdrop-blur-3xl saturate-[180%] transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            isScrolled
              ? "py-2 px-4 bg-void/85 border border-flux/25 shadow-[0_8px_40px_rgba(0,0,0,0.6),_0_0_0_1px_rgba(255,255,255,0.05)_inset]"
              : "py-2.5 px-5 bg-[#050508]/60 border border-flux/15 shadow-[0_8px_32px_rgba(0,0,0,0.4),_0_0_0_1px_rgba(255,255,255,0.05)_inset]"
          }`}
        >
        {/* Left Logo */}
        <div className="flex items-center">
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "hero")}
            className="font-syne text-[13px] font-extrabold bg-gradient-to-r from-flux to-plasma bg-clip-text text-transparent mr-2 select-none"
          >
            BS
          </a>
          <span className="w-[1px] h-4 bg-white/10 mr-2" />
        </div>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => {
            const sectionId = item.toLowerCase();
            const isActive = activeSection === sectionId;

            return (
              <a
                key={item}
                href={`#${sectionId}`}
                onClick={(e) => handleNavClick(e, sectionId)}
                className={`relative font-mono text-[11px] tracking-widest uppercase py-[7px] px-[14px] rounded-full transition-all duration-200 flex items-center gap-1.5 border border-transparent ${
                  isActive
                    ? "text-[#00D4FF]"
                    : "text-[#F0EEF8]/50 hover:text-[#00D4FF] hover:bg-flux/5"
                }`}
              >
                {isActive && (
                  <span className="w-1 h-1 rounded-full bg-[#00D4FF] nav-dot-pulse" />
                )}
                {item}
                {isActive && (
                  <motion.div
                    layoutId="active-nav-indicator"
                    className="absolute -bottom-[1px] left-[14px] right-[14px] h-[2px] bg-[#00D4FF] rounded-full"
                    style={{ boxShadow: "0 0 10px rgba(0,212,255,0.6)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>



        {/* Mobile Hamburger (Only visible < 768px) */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="flex flex-col justify-center gap-[4px] p-1.5 md:hidden cursor-pointer outline-none group"
          aria-label="Toggle Menu"
        >
          <div className="w-[18px] h-[1.5px] bg-[#00D4FF] transition-all duration-300 group-hover:scale-x-110" />
          <div className="w-[18px] h-[1.5px] bg-[#00D4FF] transition-all duration-300 group-hover:scale-x-90" />
          <div className="w-[18px] h-[1.5px] bg-[#00D4FF] transition-all duration-300 group-hover:scale-x-110" />
        </button>
        </motion.nav>
      </div>

      {/* Mobile Menu Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[999] bg-void/97 backdrop-blur-[40px] flex flex-col justify-between p-8"
          >
            {/* Close Button Top Right */}
            <div className="flex justify-end">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[32px] font-extralight text-white/40 hover:text-white/80 transition-colors p-2 leading-none cursor-pointer select-none"
                aria-label="Close Menu"
              >
                &times;
              </button>
            </div>

            {/* Stacked Vertical Menu Links */}
            <div className="flex flex-col items-center justify-center gap-6 my-auto">
              {navItems.map((item) => {
                const sectionId = item.toLowerCase();
                const isActive = activeSection === sectionId;

                return (
                  <motion.div key={item} variants={linkVariants}>
                    <a
                      href={`#${sectionId}`}
                      onClick={(e) => handleNavClick(e, sectionId)}
                      className={`font-syne text-[32px] font-bold transition-colors ${
                        isActive
                          ? "text-[#00D4FF]"
                          : "text-[#F0EEF8] hover:text-[#00D4FF]"
                      }`}
                    >
                      {item}
                    </a>
                  </motion.div>
                );
              })}
            </div>


          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

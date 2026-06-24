import { useEffect, useState } from "react";

export function useActiveSection(): string {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const sectionIds = ["hero", "about", "skills", "projects", "research", "experience", "contact"];
    let observer: IntersectionObserver;

    const initObserver = () => {
      const elements = sectionIds
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null);

      if (elements.length < sectionIds.length) {
        // Elements not mounted yet, try again shortly
        setTimeout(initObserver, 100);
        return;
      }

      const observerOptions = {
        root: null,
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      };

      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      }, observerOptions);

      elements.forEach((el) => observer.observe(el));
    };

    initObserver();

    const handleScroll = () => {
      if (window.scrollY < 80) {
        setActiveSection("");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return activeSection;
}

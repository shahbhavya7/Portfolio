import { useEffect, useState } from "react";

export function useActiveSection(): string {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const sectionIds = ["about", "skills", "projects", "research", "experience", "contact"];
    
    // We observe elements when they exist
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observerOptions = {
      root: null,
      rootMargin: "-10% 0px -60% 0px",
      threshold: 0.3,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    elements.forEach((el) => observer.observe(el));

    // Reset when at the very top (hero section)
    const handleScroll = () => {
      if (window.scrollY < 80) {
        setActiveSection("");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return activeSection;
}

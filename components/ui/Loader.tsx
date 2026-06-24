"use client";

import { useEffect, useState } from "react";

export default function Loader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [status, setStatus] = useState("INITIALIZING");

  useEffect(() => {
    const statuses = ["INITIALIZING", "LOADING ASSETS", "RENDERING", "READY"];
    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      if (idx < statuses.length) {
        setStatus(statuses[idx]);
      }
    }, 400);

    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 1800);

    const unmountTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2400);

    return () => {
      clearInterval(interval);
      clearTimeout(exitTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6"
      style={{
        background: "#050508",
        opacity: isExiting ? 0 : 1,
        transition: "opacity 0.6s ease-out",
        pointerEvents: isExiting ? "none" : "all",
      }}
    >
      <span
        className="font-syne font-extrabold text-[48px]"
        style={{
          background: "linear-gradient(135deg, #00D4FF, #6E3AFA)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        BS
      </span>

      <div
        className="w-[120px] h-[1px] overflow-hidden rounded-[1px]"
        style={{ background: "rgba(255,255,255,0.06)" }}
      >
        <div
          className="h-full"
          style={{
            background: "linear-gradient(90deg, #00D4FF, #6E3AFA)",
            animation: "load-fill 1.2s ease forwards",
          }}
        />
      </div>

      <span
        className="font-mono text-[10px] uppercase tracking-[0.2em]"
        style={{ color: "rgba(160,150,190,0.3)" }}
      >
        {status}
      </span>

      <style jsx>{`
        @keyframes load-fill {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}

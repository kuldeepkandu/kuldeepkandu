"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

export const useTextShuffleHover = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll<HTMLElement>(".shuffleText");
    const ctx = gsap.context(() => {}); // GSAP context for global cleanup

    items.forEach((item) => {
      const originalText = item.textContent || "";
      if (!originalText) return;

      // Split and wrap each char in a span for per-char hover
      item.innerHTML = "";
      const charSpans = originalText.split("").map((char, index) => {
        const span = document.createElement("span");
        span.className = "shuffle-char inline-block"; // Inline-block for positioning
        span.dataset.original = char;
        span.dataset.index = index.toString();
        span.textContent = char; // Initial display
        span.style.position = "relative"; // For potential overlays
        return span;
      });
      charSpans.forEach((span) => item.appendChild(span));

      // Now attach per-char listeners
      const spans = item.querySelectorAll<HTMLElement>(".shuffle-char");
      spans.forEach((span) => {
        const originalChar = span.dataset.original || "";
        let interval: number | null = null;
        let cycleCount = 0;
        const maxCycles = 4; // Number of random chars before reveal (adjust for speed)

        const shuffleChar = () => {
          if (cycleCount < maxCycles) {
            // Cycle random char
            span.textContent = CHARS[Math.floor(Math.random() * CHARS.length)];
            cycleCount++;
          } else {
            // Reveal original
            span.textContent = originalChar;
            if (interval) clearInterval(interval);
            interval = null;
          }
        };

        const onEnter = () => {
          cycleCount = 0;
          if (interval) clearInterval(interval);
          interval = window.setInterval(shuffleChar, 30); // ~30ms per cycle, total ~120ms for 4 cycles
        };

        const onLeave = () => {
          gsap.to(span, { opacity: 0.6, duration: 0.1 });
          gsap.to(span, { opacity: 1, duration: 0.3, delay: 0.1 });
          if (interval) {
            clearInterval(interval);
            interval = null;
            span.textContent = originalChar; // Ensure reset on leave
          }
        };

        span.addEventListener("mouseenter", onEnter);
        span.addEventListener("mouseleave", onLeave);

        // Cleanup for this span
        ctx.add(() => {
          span.removeEventListener("mouseenter", onEnter);
          span.removeEventListener("mouseleave", onLeave);
          if (interval) clearInterval(interval);
        });
      });
    });

    // Global cleanup
    return () => ctx.revert();
  }, []);

  return { containerRef };
};
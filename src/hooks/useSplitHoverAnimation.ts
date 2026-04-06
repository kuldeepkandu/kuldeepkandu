'use client'
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const useSplitHoverAnimation = (
  type: "letter" | "word" = "letter",
  stagger = 0.05
) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll<HTMLElement>(".hoverTextSplit");

    items.forEach((item) => {
      const text = item.textContent || "";
      const parts = type === "letter" ? text.split("") : text.split(" ");

      // Add perspective for 3D effect
      item.style.display = "inline-block";
      item.style.perspective = "600px";

      // Convert text to spans
      item.innerHTML = "";
      parts.forEach((p) => {
        const span = document.createElement("span");
        span.textContent = type === "word" ? p + " " : p;
        span.style.display = "inline-block";
        span.style.transform = "translateZ(0px)";
        span.style.opacity = "1";
        item.appendChild(span);
      });

      const spans = item.querySelectorAll("span");

      const onEnter = () => {
        gsap.to(spans, {
          z: -60,               
          opacity: 0,
          rotateX: 90,          
          duration: 0.25,
          stagger,
          ease: "power2.in",
          onComplete: () => {
            gsap.to(spans, {
              z: 0,
              opacity: 1,
              rotateX: 0,
              duration: 0.35,
              stagger,
              ease: "power2.out",
            });
          },
        });
      };

      const onLeave = () => {
        gsap.to(spans, {
          z: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.3,
          stagger,
          ease: "power2.out",
        });
      };

      item.addEventListener("mouseenter", onEnter);
      item.addEventListener("mouseleave", onLeave);

      return () => {
        item.removeEventListener("mouseenter", onEnter);
        item.removeEventListener("mouseleave", onLeave);
      };
    });
  }, [type, stagger]);

  return { containerRef };
};
